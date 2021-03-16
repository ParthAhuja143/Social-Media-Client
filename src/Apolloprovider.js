import React from 'react'
import App from './App'
import ApolloClient from 'apollo-client'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {createHttpLink} from 'apollo-link-http'
import {ApolloProvider} from '@apollo/react-hooks'
import {setContext} from 'apollo-link-context'

const httpLink = createHttpLink({
    uri : 'http://localhost:5000'
})

//To send the authorization in the header (jwtToken)
const authLink = setContext(() => {
    const token = localStorage.getItem('jwtToken')
    return{
        headers : {
            authorization: token ? `Bearer ${token}` : ''
        }
    }
})

//Authorization header needs to go before http link 
const client = new ApolloClient({
    link : authLink.concat(httpLink),
    cache : new InMemoryCache()
})

const Apolloprovider = () => {
    return (
        <ApolloProvider client = {client}>
            <App/>
        </ApolloProvider>
    )
}

export default Apolloprovider
