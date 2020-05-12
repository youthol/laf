import React, { Component } from "react";
import ItemInfo from "../../components/ItemInfo";

class Found extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identity:"拾物"
    };
  }
  render() {
    return (
      <div>
        <ItemInfo identity={this.state.identity}/>
      </div>
    );
  }
}

export default Found;
