'use client'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_NHOST_GRAPHQL_URL || '/api/graphql',
  // Add headers if needed
  headers: {
    // Your headers here
  },
});
export function makeClient() {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  })
}