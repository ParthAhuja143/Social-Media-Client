import React, { useContext, useState , useEffect } from 'react'
import {Card , Icon , Label , Image,Button, Popup} from 'semantic-ui-react'
import moment from 'moment'
import { Link } from 'react-router-dom'

import './PostCard.css'
import { AuthContext } from '../utils/context'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'

const PostCard = (props) => {

  //console.log(props)
  const context = useContext(AuthContext)
  const [comment , setComment] = useState(false)

  useEffect(() => {
    if(context.user && props.post.comments.find((comment) => comment.username === context.user.username)){
      setComment(true)
    }

      else{
        setComment(false)
      }
  } , [context.user , props.post.comments])

    return (
        <Card fluid className = {props.largeWidth ? `max_card` : null}>
        <Card.Content>
          {props.post.displayPicURL ? (<Image
            floated='right'
            size='mini'
            src = {props.post.displayPicURL}
            style = {{height : '40px' , width : '40px'}}
          />)
          :
          (<Image
            floated='right'
            size='mini'
            src = 'https://react.semantic-ui.com/images/avatar/large/molly.png'
            style = {{height : '40px' , width : '40px'}}
          />)}
          <Card.Header as = {Link} to = {`/user/${props.post.username}`}>{props.post.username}</Card.Header>
          <Card.Meta>{moment(props.post.createdAt).fromNow()}</Card.Meta>
          <Card.Description>
            <h3 style = {{fontFamily: 'Satisfy'}}>{props.post.body}</h3>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
        <LikeButton id = {props.post.id} likes = {props.post.likes} user = {context.user} likeCount = {props.post.likeCount} />  
    <Popup content = 'Comment on post' trigger = {<Button as = {Link} to  = {`/posts/${props.post.id}`} labelPosition='right'>
      <Button basic = {!comment} color='teal'>
        <Icon name='comments' />
      </Button>
      <Label as='div' basic color='teal' pointing='left'>
        {props.post.commentCount}
      </Label>
    </Button>}
    />
    {context.user && context.user.username === props.post.username && <DeleteButton setRefetch = {props.setRefetch} postId = {props.post.id} refetchUserPost = {props.refetchUserPost}/>}
        </Card.Content>
      </Card>
    )
}

export default PostCard
