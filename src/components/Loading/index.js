import React from 'react';

class Loading extends React.Component {
  render(){
    return(
      <i className="fa fa-circle-o-notch fa-spin" style={{color: "#167AFF"}} />
    );
  }
}

export default Loading
