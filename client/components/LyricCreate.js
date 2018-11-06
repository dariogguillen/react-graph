import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const mutation = gql`
  mutation AddLyricToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      title
      lyrics {
        content
      }
    }
  }
`

class LyricCreate extends Component {
  constructor(props) {
    super(props)

    this.state = { content: '' }
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(e) {
    e.preventDefault()
    const { mutate, songId } = this.props
    const { content } = this.state

    mutate({
      variables: {
        songId,
        content
      }
    })
    this.setState({ content: '' })
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <label>Add a Lyric</label>
        <input
          value={this.state.content}
          onChange={e => this.setState({ content: e.target.value })}
          type="text"
        />
      </form>
    )
  }
}

export default graphql(mutation)(LyricCreate)
