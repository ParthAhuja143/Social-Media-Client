
import {useMutation} from '@apollo/react-hooks'
import React, { useContext, useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import gql from 'graphql-tag'
import loader from '../assets/globe.gif'

import './Login.css'
import MenuBar from '../components/MenuBar'
import { AuthContext } from '../utils/context'

const Login = (props) => {

    const context = useContext(AuthContext)
    const [errors , setErrors] = useState({})
    const [values , setValues] = useState({
        username : '' , 
        password : '' ,
    })

    function handleChange(event){
       setValues({...values , [event.target.name]: event.target.value})
    }

    const LOGIN_USER = gql`
       mutation login(
            $username: String!
            $password: String!
    ){
        login(username:$username password:$password){
            id 
            email
            username
            createdAt
            displayPicURL
            token
        }
    }
`

    const [loginUser , {loading}] = useMutation(LOGIN_USER , {
        update(proxy , result){
            //console.log(proxy) Meta data
            //console.log(result) Returns values
            context.login(result.data.login)
            props.history.push('/')
        },
        onError(errors){
           // console.log(errors.graphQLErrors[0].extensions.exception.errors)
            setErrors(errors.graphQLErrors[0].extensions.exception.errors)
        },
        variables:values
    })

    function handleSubmit(event){
       event.preventDefault()
       loginUser()
    }

    return (
        <div>
            <MenuBar/>
        <div className = 'login' style ={{padding : '100px'}}>
        {loading ? (<img src = {loader} alt ='Loading...' />):(<Form noValidate onSubmit = {handleSubmit} >
          <h1 className = 'loginHeader'>Login</h1>
          <Form.Input type = 'text' error = {errors.username} label = 'Username' placeholder = 'Username' name = 'username' value ={values.username} onChange = {handleChange}/>
          <Form.Input type = 'password' error = {errors.password} label = 'Password' placeholder = 'Password' name = 'password' value ={values.password} onChange = {handleChange}/>
          <Button className = 'loginButton' type = 'submit' animate = 'vertical' >Login</Button><a href = '/register' className = 'loginToRegisterLink'>Don't have an account ? Create one here.</a>
        </Form>)}
        {Object.keys(errors).length > 0 && !loading && (<div className = 'ui error message'>
            <ul className = 'list'>
                {Object.values(errors).map(value => (
                    <li key = {value}>{value}</li>
                ))}
            </ul>
        </div>)}
        </div>
        </div>
    )
}

export default Login

