import React, { useState } from 'react'
import {Button, Form} from 'semantic-ui-react'
import gql from 'graphql-tag'
import {useMutation } from '@apollo/react-hooks'

const PostForm = (props) => {

    const [values , setValues] = useState({
        body : ''
    })

    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        onError(error){
            console.log(error)
            window.location.replace('/404')
        },
        update(proxy, result) {
          const data = proxy.readQuery({
            query: FETCH_POSTS_QUERY
          });
          data.getPosts = [result.data.createPost, ...data.getPosts];
          //console.log('RESULT' ,result)
          proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
          values.body = '';
          props.setRefetch(true)
          //window.location.replace('/')
        } ,
        
      })

    function handleChange(event){
         setValues({body : event.target.value})
    }

    function handleSubmit(event){
        event.preventDefault()
        createPost()
    }

    return (
        <div>
        <Form onSubmit = {handleSubmit}>
            <h2 style ={{fontFamily : 'Satisfy'}}>Create a Post:</h2>
            <Form.Field>
                <Form.Input error = {error ? true : false} placeholder = 'Hi World' name = 'body' onChange = {handleChange} value = {values.body} />
                <Button type = 'submit' color = 'teal'>Submit</Button>
            </Form.Field>
        </Form>
        {error && (
            <div className = 'ui error message' style = {{marginBottom : '20px'}}>
                <ul className = 'list'>
                    <li>{error.graphQLErrors[0].message}</li>
                </ul>
            </div>
        )}
        </div>
    )
}
const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      displayPicURL
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`
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
export default PostForm
