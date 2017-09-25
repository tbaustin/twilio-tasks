import React, { Component } from 'react';

import { Task, Categories, Account } from '../containers';

class Home extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm-2">
          <Categories />
        </div>
        <div className="col-sm-8">
          <Task />
        </div>
        <div className="col-sm-2">
          <Account />
        </div>
      </div>
    );
  }
}

export default Home;
