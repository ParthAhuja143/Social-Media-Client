
import {useMutation} from '@apollo/react-hooks'
import React, { useContext, useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import gql from 'graphql-tag'

import loader from '../assets/globe.gif'
import './Register.css'
import MenuBar from '../components/MenuBar'
import { AuthContext } from '../utils/context'
const cloudinary = require('cloudinary/lib/cloudinary')
const Register = (props) => {

    const context = useContext(AuthContext)
    const [errors , setErrors] = useState({})
    const [values , setValues] = useState({
        username : '' , 
        password : '' ,
        email : '' ,
        confirmPassword : '' ,
        displayPicURL : ''
    })

    function handleChange(event){
       setValues({...values , [event.target.name]: event.target.value})
    }

    const REGISTER_USER = gql`
       mutation register(
            $username: String!
            $email: String!
            $password: String!
            $confirmPassword: String!
            $displayPicURL: String!
    ){
        register(registerInput: {username:$username email:$email password:$password confirmPassword:$confirmPassword displayPicURL:$displayPicURL}){
            id 
            email
            username
            createdAt
            token
            displayPicURL
        }
    }
`

    const [addUser , {loading}] = useMutation(REGISTER_USER , {
        update(proxy , result){
            //console.log(proxy) Meta data
            //console.log(result) //Returns values
            context.login(result.data.register)  // When we register .. we trigger login function with payload = userData so user changes from null to userObject
            props.history.push('/')
        },
        onError(errors){
            //console.log(errors.graphQLErrors[0])
            setErrors(errors?.graphQLErrors[0]?.extensions?.exception?.errors )
        },
        variables:values
    })

 function handleSubmit(event){
       event.preventDefault()

       //console.log(values)
       if(previewSource) {
        uploadFile(previewSource).then((result) => 
        {values.displayPicURL = result
         //console.log(result)
         addUser()
        })
       }else{
           addUser()
       }
        
    }

    const [previewSource , setPreviewSource] = useState('')
    const [fileInputState] = useState('')
    const handleFileInputChange = (event) => {
        const file = event.target.files[0]
        previewFile(file)
    }
    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }

    const uploadFile = async (base64EncodedFile) => {
        //console.log(base64EncodedFile)
        try {

            cloudinary.config({
                cloud_name : 'dx26jwl31' , 
                api_key : '658131229295366' , 
                api_secret : 'JL-_y7NGbyIbUfkhoKrVWF2WxEs'
             })

             const uploadedResponse = await cloudinary.uploader.upload(base64EncodedFile)
             return uploadedResponse.url
        } catch (error) {
            console.log(error)
            window.location.replace('/404')
        }
    }

    return (
        <div>
            <MenuBar/>
        <div className = 'register'>
        {loading ? (<img src = {loader} alt = 'Loading ... ' />) :(<Form noValidate onSubmit = {handleSubmit} >
          <h1 className = 'register_Header'>Register</h1>
          <div className = 'previewImg_div'>
          {previewSource ?(<img className = 'previewImg' src = {previewSource} alt = ''/>) : (<img className = 'previewImg'  src = 'https://react.semantic-ui.com/images/avatar/large/molly.png' alt = ''/>)  }
          </div>
          <Form.Input type = 'text' error = {errors?.username} label = 'Username' placeholder = 'Username' name = 'username' value ={values.username} onChange = {handleChange}/>
          <Form.Input type = 'email' error = {errors?.email } label = 'Email' placeholder = 'Email' name = 'email' value ={values.email} onChange = {handleChange}/>
          <Form.Input type = 'password' error = {errors?.password} label = 'Password' placeholder = 'Password' name = 'password' value ={values.password} onChange = {handleChange}/>
          <Form.Input type = 'password' error = {errors?.confirmPassword} label = 'Confirm Password' placeholder = 'Confirm Password' name = 'confirmPassword' value ={values.confirmPassword} onChange = {handleChange}/>
          <Form.Input className = 'displayPic' label = 'Display Picture(optional)' type="file" name = 'image' onChange = {handleFileInputChange} value ={fileInputState} />
          <Button type = 'submit' disabled = {loading} color = 'teal' animate = 'vertical' >{loading ? 'Registering..' : 'Register'}</Button><a href = '/login' className = 'registerToLoginLink'>Already have an Account? Login Here.</a>
        </Form>)}
        {Object.keys(errors).length > 0 && (<div className = 'ui error message'>
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

export default Register
