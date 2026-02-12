'use client'
import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client'
import {GraphQLWsLink} from "@apollo/client/link/subscriptions"
import { OperationTypeNode, Kind } from 'graphql';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from "graphql-ws";
import { nhost } from '../lib/nhost';
import { setContext } from '@apollo/client/link/context' 

 

  const authLink = setContext(async (_, { headers }) => {
  
    const session = nhost.auth.getSession()
    const token = nhost.auth.getAccessToken()
    const userId = nhost.auth.getUser()

    return {
      headers: {
        ...headers,
        'Authorization': token ? `Bearer ${token}` : '',
        'x-hasura-user-id': userId || '',               
        'x-hasura-role': 'user',
      }
    }
})

 const httpLink = createHttpLink({
    uri: nhost.graphql.httpUrl,

  });

  const wsLink = new GraphQLWsLink(
    createClient({
      url: nhost.graphql.wsUrl,
      
      retryAttempts: 5,
      shouldRetry: (err)=>{
        console.log("Web socket error: " , err)
        return true
      },
      connectionAckWaitTimeout: 5000,
      on: {
        connected: ()=>console.log("Connected websocket"),
        error: ()=> console.log("Error connecting websocket"),
        closed: (event)=> console.log("Socket closed" , event)
      },
      // connectionParams: ()=>{
      //   return {
      //     headers: {
      //       'x-hasura-user-id': userId || '', 
      //     }
      //   }
      // }
      // keepAlive: 10000,
      // lazy:false
      
    })
  )

  const splitLink = ApolloLink.split(
    ({query})=>{
      const definition = getMainDefinition(query)
      return definition.kind === Kind.OPERATION_DEFINITION && 
      definition.operation === OperationTypeNode.SUBSCRIPTION;
  }, wsLink, 
  authLink.concat(httpLink))

export function makeClient() {

  return new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  })
}

