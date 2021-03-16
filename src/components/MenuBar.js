import React, { useState , useEffect, useContext } from 'react'
import { Icon, Menu } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

import './MenuBar.css'
import { AuthContext } from '../utils/context'

function MenuBar() {

  const pathname = window.location.pathname
  const path = pathname === '/' ? 'home' : pathname.substr(1)
 
  const context = useContext(AuthContext)
  //console.log(context)
  const [activeItem , setActiveItem] = useState(path)
  const [show,setShow] = useState(false)

  function handleItemClick(e, { name }) {
        return setActiveItem(name)
    }

  useEffect(() => {
    window.addEventListener('scroll' , () => {
        if(window.scrollY > 20){
            setShow(true)
        }
        else{
            setShow(false)
        }
    })

    return () => {
        window.removeEventListener('scroll',() => () => {
            if(window.scrollY > 20){
                setShow(true)
            }
            else{
                setShow(false)
            }
        })
    }
}, [])

    return (
        <Menu pointing secondary size = 'large' className = {`${show ? 'menubar_background' : 'menubar_transparent'}`}>
         <Menu.Menu position = 'left'>
          {context.user ?
           (<Menu.Item
            name={context.user.username}
            active
            onClick={handleItemClick}
            as = {Link}
            to = '/'
          >
              {context.user.displayPicURL ? (<img style = {{borderRadius : '50%' , height: '20px' , width : '20px' , marginRight : '10px'}} src={context.user.displayPicURL} alt="" />):(<Icon name = 'user' /> )}{context.user.username}
          </Menu.Item>)
          :
          (<Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as = {Link}
            to = '/'
          >
              <Icon name = 'home' /> Home
          </Menu.Item>)
          }
          </Menu.Menu>
          
            {context.user ? 
            (<Menu.Menu position='right'>
                <Menu.Item
             name='logout'
             onClick={context.logout}
            >
                <Icon name = 'log out'/> Logout
            </Menu.Item>
           </Menu.Menu> 
            )
            :
            (<Menu.Menu position='right'>
                <Menu.Item
             name='login'
             active={activeItem === 'login'}
             onClick={handleItemClick}
             as = {Link}
             to = '/login'
            >
                <Icon name = 'user'/> Login
            </Menu.Item>
            <Menu.Item
             name = 'register'
             active = {activeItem === 'register'}
             onClick = {handleItemClick}
             as = {Link}
             to ='/register'
            >
            <Icon name = 'registered outline'/> Register
            </Menu.Item>
            </Menu.Menu>)}
          
        </Menu>

    )
  }

  export default MenuBar
