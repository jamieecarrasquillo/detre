import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {link} from 'react-router-dom'
import Toast from '../../public/toast'
import './edit-profile.css'
import {render} from 'enzyme'

/**
 * COMPONENT
 */
export class MyRooms extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <h1>In process of being built.</h1>
  }
}

const mapState = state => {
  return {}
}

const mapDispatch = dispatch => {
  return {}
}

export default connect(mapState, mapDispatch)(MyRooms)
