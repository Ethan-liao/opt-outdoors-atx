import React from 'react';
import PublicNavigation from './PublicNavigation';

class NotFound extends React.Component {
  render() {
    return (
      <div>
        <PublicNavigation></PublicNavigation>
        <h4 className="text-center py-3">Page Not Found</h4>
      </div>
    )
  }
}

export default NotFound;
