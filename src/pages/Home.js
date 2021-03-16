import React, { useContext, useEffect, useState } from 'react'
import {useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Grid, Transition } from 'semantic-ui-react'

import loader from '../assets/globe.gif'
import PostCard from '../components/PostCard.js'
import MenuBar from '../components/MenuBar'
import { AuthContext } from '../utils/context'
import PostForm from '../components/PostForm.js'
import './Home.css'

const Home = () => {

        const context = useContext(AuthContext)

        const {loading , data , refetch } = useQuery(FETCH_POSTS_QUERY , {
            onError(err){
                window.location.replace('/404')
            }
        })
        const [refetching , setRefetch] =useState(false)

        //console.log(data.getPosts)
        useEffect(() => {
           refetch()

           return setRefetch(false)
        } , [refetching , refetch])
    return (
        <div className = 'home'>
        <MenuBar/>
        <Grid columns={3} style = {{minHeight : '100vh'}}>
            <Grid.Row className = 'page_title'>
                Recent Posts
            </Grid.Row>
            <Grid.Row>
                {context.user && (
                    <Grid.Column>
                        <PostForm setRefetch = {setRefetch} />
                    </Grid.Column>
                )}
                {loading ? (<img style = {{objectFit : 'contain' , width : '100px'}} src = {loader} alt ='Loding ...'/>) :(
                    <Transition.Group animation = 'slide right'>
                    {data.getPosts && data.getPosts.map(post => (
                        <Grid.Column key = {post.id} style = {{marginBottom : '20px'}}>
                        <PostCard post = {post} setRefetch = {setRefetch}/>
                        </Grid.Column>
                    ))}
                    </Transition.Group>
                )}
            </Grid.Row>
        </Grid>
        </div>
    )
}

const FETCH_POSTS_QUERY = gql`
{
    getPosts{
    id
    body 
    createdAt 
    username 
    displayPicURL
    likeCount
    likes{
        username
    }
    commentCount
    comments{
        id 
        username 
        createdAt 
        body
    }
    }
}
`

export default Home

