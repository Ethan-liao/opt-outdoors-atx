import React from 'react';

class Comments extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <p>{this.props.details.content}</p>
        <p><small><i>Posted by: {this.props.details.first} {this.props.details.last}</i></small></p>
      </div>
    )
  }
}

export default Comments;
