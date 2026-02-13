'use client'
import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink, Observable, split } from '@apollo/client'
import {GraphQLWsLink} from "@apollo/client/link/subscriptions"
import { OperationTypeNode, Kind } from 'graphql';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from "graphql-ws";
import { nhost } from '../lib/nhost';

const authLink = new ApolloLink((operation, forward) => {
  return new Observable(observer => {
    const setHeaders = async () => {
      try {
        const token = await nhost.auth.getAccessToken();
        const user = nhost.auth.getUser();
        
        operation.setContext(({ headers = {} }) => ({
          headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : '',
            'x-hasura-user-id': user?.id || '',
            'x-hasura-role': 'user',
          }
        }));
        
        forward(operation).subscribe(observer);
      } catch (error) {
        observer.error(error);
      }
    };
    
    setHeaders();
  });
});

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
      }
      
    })
  )

  const splitLink = split(
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

