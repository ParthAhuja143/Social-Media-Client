import React from 'react'
import gql from 'graphql-tag'
import {useQuery} from '@apollo/react-hooks'
import moment from 'moment'

import loader from '../assets/globe.gif'
import MenuBar from '../components/MenuBar'
import './User.css'
import { Grid, Icon } from 'semantic-ui-react'
import PostCard from '../components/PostCard'

const User = (props) => {

    const username = props.match.params.username

    const {loading : loadingUser , data} = useQuery(FETCH_USER_QUERY , {
        variables : {username : username},
        onError(err){
            window.location.replace('/404')
        }
    })

    const {data : postData , loading : loadingPost , refetch : refetchUserPost} = useQuery(FETCH_USERPOSTS_QUERY , {
        variables : {username : username},
        onError(err){
            window.location.replace('/404')
        }
    })

    //console.log(data)
    //console.log(postData)

    return (
        <div className = 'user'>
            <MenuBar />
            <div style = {{paddingTop : '50px' , display : 'flex' , justifyContent:'center' , alignItems:'center' , minHeight : '100vh'}}>
            {loadingUser ? (<img src = {loader} alt = 'Loading ... ' />) :(<div>
            <div className = 'user_info'>
                <div className = 'user_image'>
                    <img style = {{height : '300px' , width : '300px' , borderRadius: '50%'}} src = {data?.getUser.displayPicURL ? `${data?.getUser.displayPicURL}`:'https://react.semantic-ui.com/images/avatar/large/molly.png'} alt = 'Avatar' />
                </div>
                <div className = 'user_details'>
                    <div className = 'user_username'>{data.getUser.username}</div>
                    <div className = 'user_email'><Icon name = 'mail'/>{data.getUser.email}</div>
                    <div className = 'user_createdAt'><Icon name = 'info'/>{data.getUser.username} has been a member since {moment(data.getUser.createdAt).format('MMMM, YYYY')}</div>
                </div>
                </div>
                <div style = {{ display : 'flex' , justifyContent:'center' , alignItems:'center'}}>
                {loadingPost ? (<img src = {loader} alt = 'Loading ... ' style = {{paddingTop:'100px'}} />) :(<Grid>
                {postData.getPostsBySingleUser && postData.getPostsBySingleUser.map(userPost => (
                        <Grid.Row style = {{padding : '20px 20px !important' , marginBottom : '20px' , width : '1000px'}} key = {userPost.id}>
                        <PostCard post = {userPost} refetchUserPost = {refetchUserPost} largeWidth = {true} />
                        </Grid.Row>
                    ))}
                </Grid>)}
                </div>
            </div>)}
            </div>
        </div>
    )
}

const FETCH_USER_QUERY = gql`
query($username: String!) {
   getUser(username: $username) {
       id
       username
       email
       displayPicURL
       createdAt
   }
}
`

const FETCH_USERPOSTS_QUERY = gql`
query($username : String!){
getPostsBySingleUser(username: $username){
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


export default User 
