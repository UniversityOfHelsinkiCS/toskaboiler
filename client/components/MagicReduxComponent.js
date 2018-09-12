import React from 'react'
import { connect } from 'react-redux'
import { Button, List } from 'semantic-ui-react'

import { getPostFromApi, clearPosts } from '../util/redux/postReducer'

const MagicReduxView = ({ getPost, clearList, posts }) => {
  const handleGet = () => getPost(Math.floor(1 + Math.random() * 33))
  const handleClear = () => clearList()
  return (
    <div style={{ paddingTop: '1em' }}>
      <Button color="purple" onClick={handleGet}>
        Get stuff!!
      </Button>
      <Button color="orange" onClick={handleClear}>
        Remove everything
      </Button>
      <List>
        {posts.map(post => <List.Item key={post.id}>{post.body}</List.Item>)}
      </List>
    </div>
  )
}

const mapStateToProps = ({ posts }) => ({
  posts: posts.data.sort((a, b) => a.body.localeCompare(b.body)),
})

const mapDispatchToProps = dispatch => ({
  getPost: code => dispatch(getPostFromApi(code)),
  clearList: () => dispatch(clearPosts()),
})

export default connect(mapStateToProps, mapDispatchToProps)(MagicReduxView)
