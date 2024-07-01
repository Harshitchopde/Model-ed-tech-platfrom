import React from 'react'
import Template from '../components/core/Auth/Template'
import LoginForm from '../components/core/Auth/LoginForm'
import loginImage from "../assets/Images/login.webp"

const Login = () => {
  return (
    <div>
     <Template  formType={"Login"} img={loginImage}/>
    </div>
  )
}

export default Login
