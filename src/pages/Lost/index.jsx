import React, { Component } from "react";
import ItemInfo from "../../components/ItemInfo";



class Lost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identity: "失物",
    };
  }
  render() {
    return (
      <div>
        <ItemInfo identity={this.state.identity} />
      </div>
    );
  }
}

export default Lost;
