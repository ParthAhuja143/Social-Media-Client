import React from 'react'
import gql from 'graphql-tag'
import { Button, Icon, Popup } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'



const DeleteButton = (props) => {

    //console.log(props , 'PROPSSSSS')

    const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION , {
        onError(error){
            
          window.location.replace('/404')
        } ,
        variables : {
            postId:props.postId ,
            commentId:props.commentId
        }
    })

    const [deletePost] = useMutation(DELETE_POST_MUTATION , {
        update(proxy , result){
           
           //only passed in postcard
           if(props?.setRefetch){
              props.setRefetch(true)
           }
           //only passed in singlepost
           if(props?.redirect){
              props.redirect()
           }

           if(props.refetchUserPost){
             
           }
        } ,
        variables : {
            postId : props.postId
        }
    })

    return ( 
        <>    
            <Popup content = {props.commentId ? 'Delete Comment' : 'Delete Post'} trigger = {<Button floated = 'right' as = 'div' color = 'red' onClick = {props.commentId ? deleteComment : deletePost} >
               <Icon name = 'trash' style = {{margin : '0'}}/>  
            </Button>} />
            {/* <Confirm open = {confirmOpen} onConfirm = {props.commentId ? console.log('deleteComment') : console.log('deletePost') } onCancel= {() => setConfirmOpen(false)} /> */}
       </>
    )
}

const DELETE_POST_MUTATION = gql`
mutation deletePost($postId:ID!){
    deletePost(postId:$postId)
}
`

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`

export default DeleteButton
