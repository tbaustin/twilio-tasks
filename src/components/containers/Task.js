import React, { Component } from 'react';
import { connect } from 'react-redux';

import { APIManager } from '../../utils';
import { CreateTask } from '../view';
import actions from '../../actions';

class Task extends Component {
  constructor() {
    super();
    this.getTasks = this.getTasks.bind(this);
  }

  getTasks() {
    if (this.props.tasks[this.props.tasks.selectedCategory] !== undefined) {
      return;
    }

    this.props
      .fetchTasks({ category: this.props.tasks.selectedCategory })
      .then(results => {
        //   console.log('Next step after fetchTasks');
      })
      .catch(err => {
        alert(err);
      });
  }

  componentDidMount() {
    this.getTasks();
  }

  componentDidUpdate() {
    this.getTasks();
  }

  createTask(task) {
    this.props
      .createTask(task)
      .then(result => {})
      .catch(err => {
        alert(err);
      });
  }

  render() {
    return (
      <div>
        <h2>Tasks</h2>
        <ol>
          {this.props.tasks[this.props.tasks.selectedCategory] == null
            ? null
            : this.props.tasks[this.props.tasks.selectedCategory].map(task => {
                return (
                  <li key={task.id}>
                    {task.title}, {task.category}
                  </li>
                );
              })}
        </ol>

        <h3>Create A Task</h3>
        <CreateTask onSubmit={this.createTask.bind(this)} />
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    tasks: state.task,
  };
};

const dispatchToProps = dispatch => {
  return {
    fetchTasks: params => dispatch(actions.fetchTasks(params)),
    createTask: params => dispatch(actions.createTask(params)),
  };
};

export default connect(stateToProps, dispatchToProps)(Task);
