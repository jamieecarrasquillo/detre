import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Link} from 'react-router-dom'
import GoogleButton from 'react-google-button'
import './login.css'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} name={name} className="non-logged">
        <h1>Detré</h1>
        <input
          name="email"
          type="text"
          placeholder="Email"
          className="placeholder-color"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="placeholder-color"
        />
        <button type="submit" className="auth-btn">
          {displayName}
        </button>

        <Link to="/signup" className="link">
          New? Click Here.
        </Link>

        <div className="login-divider">
          <div className="divider" />
          <div className="or-divider">or</div>
          <div className="divider" />
        </div>
        <a href="/auth/google" className="google-btn">
          <GoogleButton type="light" label={`${displayName} With Google`} />
        </a>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
