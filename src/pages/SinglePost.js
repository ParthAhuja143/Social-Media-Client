import React, { useContext, useState } from 'react'
import gql from 'graphql-tag'
import { useMutation, useQuery } from '@apollo/react-hooks'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Card,Form,Grid } from 'semantic-ui-react'

import loader from '../assets/globe.gif'
import LikeButton from '../components/LikeButton'
import { AuthContext } from '../utils/context'
import DeleteButton from '../components/DeleteButton'
import MenuBar from '../components/MenuBar.js'
import './SinglePost.css'



const SinglePost = (props) => {

    const postId = props.match.params.postId
     
    const [comment , setComment] = useState('')
    const context = useContext(AuthContext)

    const {loading , data} = useQuery(FETCH_POST_QUERY , {
    variables : {
        postId : postId
    } , 
    onError : (error) => {
      console.log(error)
      window.location.replace('/404')
    }
})

   const [createComment] = useMutation(CREATE_COMMENT_MUTATION , {
     update(){
        setComment('')
     } , 
     variables : {
       postId : postId , 
       body : comment
     },
     onError(err){
      window.location.replace('/404')
     }
   })

  function redirect(){
    window.location.replace('/')
  }

    return (
        <div className = 'singlePost'>
            {loading ? 
            (<div style = {{height : '100vh', width : '100%' , display : 'flex' , justifyContent: 'center' , alignItems : 'center'}}>
              <img src = {loader} alt = 'Loading ...' />
            </div>)
        :
        (<Grid>
          <MenuBar />
  
                
                <img style = {{borderRadius : '50%', width : '200px ' , height : '200px ' , margin : '0 !important'}} src = {data?.getPost.displayPicURL ? `${data.getPost.displayPicURL}`:'https://react.semantic-ui.com/images/avatar/large/molly.png'} alt = 'Avatar' />
                
                {loading ? (<img src = {loader} alt = 'Loading ...'/>) :(<Grid.Column width = {10} >
                    <Card fluid>
                    <Card.Content>
                        <Card.Header>{data?.getPost.username}</Card.Header>
                        <Card.Meta>{moment(data?.getPost.createdAt).fromNow()}</Card.Meta>
                        <Card.Description><h3 style = {{fontFamily : 'Satisfy'}}>{data?.getPost.body}</h3></Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <LikeButton user = {context.user} id = {data?.getPost.id} likes = {data?.getPost.likes} likeCount = {data?.getPost.likeCount}/>
                        {context.user && context.user.username === data?.getPost.username && <DeleteButton redirect = {redirect} postId = {data?.getPost.id}/>}
                    </Card.Content>
                    </Card>
                    {context.user && (
                      
                        <Form>
                          <div style = {{display : 'flex' , justifyContent : 'space-between' }}>
                          <div className = 'ui acton input ' style = {{display : 'flex' , flex : '0.9'}}>
                            <input type = 'text' placeholder = 'Leave a Comment...' name = 'comment' value = {comment} onChange ={(e) => setComment(e.target.value)} />
                          </div>
                          <button type = 'submit' className = 'ui button teal' disabled = {comment.trim() === ''} onClick = {createComment}>Comment</button>
                          </div>
                        </Form>
                      
                    )}
                    {data?.getPost.comments.map((comment) => (
                      
                      <Card fluid key = {comment.id}>
                        <Card.Content>
                          {context.user && context.user.username === comment.username && (
                            <DeleteButton postId = {data.getPost.id} commentId = {comment.id} />
                          ) }
                          <Card.Header as = {Link} to = {`/user/${comment.username}`}>{comment.username}</Card.Header>
                          <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                          <Card.Description style = {{fontFamily : 'Satisfy' , fontWeight : 'bold'}}>{comment.body}</Card.Description>
                        </Card.Content>
                      </Card>
                    ))}
                </Grid.Column>)}

        </Grid>)    
        }
        </div>
    )
}

const CREATE_COMMENT_MUTATION = gql`
  mutation($postId : ID!  $body : String!){
    createComment(postId : $postId  body : $body){
      id
      comments{
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      displayPicURL
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`

export default SinglePost
