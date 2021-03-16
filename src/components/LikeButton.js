import React, { useEffect, useState } from 'react'
import { Button, Icon, Label, Popup } from 'semantic-ui-react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import './LikeButton.css'

const LikeButton = (props) => {

    //console.log(props.user , props.likes , props.likeCount)

    const [liked , setLiked] = useState(false)

    useEffect(() => {
        if(props.user && props.likes.find(like => like.username === props.user.username)){
            setLiked(true)
        }
        else{
            setLiked(false)
        }
    } , [props.user , props.likes])

    const [likePost] = useMutation(LIKE_POST_MUTATION , {
        variables : {postId : props.id} ,
        onError(e){
            //console.log('Error' , e.message)
            window.location.replace('/404')
        }
    })

    return (
    <Popup content = {liked ? 'Unlike Post':'Like Post'} trigger = {<Button as='div' labelPosition='right'>
    {liked ? 
    (<Button color = 'violet' onClick = {() => {likePost()}}>
      <Icon name='heart' />
    </Button>) :
    (
    <Button basic color = 'violet' onClick = {() => {likePost()}}>
    <Icon name='heart' />
    </Button>
    )}
    <Label as='a' color='violet' basic pointing='left'>
      {props.likeCount}
    </Label>
  </Button>}/>
)
}

const LIKE_POST_MUTATION = gql`
mutation likePost($postId: ID!){
    likePost(postId : $postId){
        id
        likes{
            id
            username
        }
        likeCount
    }
}
`

export default LikeButton
