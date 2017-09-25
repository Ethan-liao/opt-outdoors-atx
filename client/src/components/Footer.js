import React from 'react';

class Footer extends React.Component {
  render() {
    const footerStyle = {
      backgroundColor: "#E0E0E0",
      height: "60px",
      lineHeight: "60px"
    }
    return (
      <footer style={footerStyle}>
        <div className="footer">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <p className="text-center text-muted">&copy; Copyright 2017 - Opt Outdoors ATX.  All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer;
