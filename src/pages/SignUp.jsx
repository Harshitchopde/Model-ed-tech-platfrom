import React from 'react'
import Template from '../components/core/Auth/Template'
import SignUpForm from '../components/core/Auth/SignUpForm'

const SignUp = () => {
  return (
    <div>
      <Template>
        {
          <SignUpForm/>
        }
      </Template>
    </div>
  )
}

export default SignUp
