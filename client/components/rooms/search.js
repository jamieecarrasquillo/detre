import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import './search.css'

/**
 * COMPONENT
 */
export class Search extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="search-results-container">
        <h4>Search Results</h4>

        <div className="search-results">
          <p>Search results will appear here.</p>
        </div>

        <Link to="/newroom">
          <button className="start-room-button"> + Start a room</button>
        </Link>
      </div>
    )
  }
}

const mapState = state => {
  return {}
}

const mapDispatch = dispatch => {
  return {}
}

export default connect(mapState, mapDispatch)(Search)
