import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router'
import gql from 'graphql-tag'

import query from '../queries/fetchSongs'

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`

class SongList extends Component {
  onClick(id) {
    this.props
      .mutate({
        variables: { id }
      })
      .then(() => this.props.data.refetch())
  }

  renderSongs() {
    return this.props.data.songs.map(({ id, title }) => (
      <li key={id} className="collection-item">
        <Link to={`/songs/${id}`}>{title}</Link>
        <i className="material-icons" onClick={() => this.onClick(id)}>
          delete
        </i>
      </li>
    ))
  }

  render() {
    if (this.props.data.loading) return <div>Loading...</div>
    return (
      <div>
        <ul className="collection">{this.renderSongs()}</ul>
        <Link to="/songs/new" className="btn-floating btn-largered right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    )
  }
}

export default graphql(mutation)(graphql(query)(SongList))
