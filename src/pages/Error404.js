import React from 'react'

const Error404 = () => {
    return (
        <div style = {{width : '100%' , height : '100vh' ,flexDirection:'column', display : 'flex' , justifyContent: 'center' , alignItems:'center' , backgroundColor:'rgb(33,33,33)'}}>
            <img src="https://bashooka.com/wp-content/uploads/2015/10/404-errrrr-page-19.jpg" alt="" />
            <a href = '/' style = {{padding: '20px' , border : '2px solid teal' , borderRadius:'5px' ,color:'white', backgroundColor : 'turquoise'}}>GO TO HOME</a>
        </div> 
    )
}

export default Error404
