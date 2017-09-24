import React, { Component } from 'react';

import { Task, Categories } from '../containers';

class Home extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm-4">
          <Categories />
        </div>
        <div className="col-sm-8">
          <Task />
        </div>
      </div>
    );
  }
}

export default Home;
