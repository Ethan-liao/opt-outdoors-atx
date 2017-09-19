import React from 'react';

class Comments extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <p>{this.props.details.content}</p>
        <p>Posted by: {this.props.details.user_id}</p>
      </div>
    )
  }
}

export default Comments;
