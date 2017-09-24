import constants from '../constants';
import { APIManager } from '../utils';

const getRequest = (path, params, actionType) => {
  return dispatch =>
    APIManager.get(path, params)
      .then(response => {
        const payload = response.results || response.result;
        dispatch({
          type: actionType,
          payload: payload,
          params: params,
        });
      })
      .catch(err => {
        console.log(err);
      });
};

const postRequest = (path, params, actionType) => {
  return dispatch =>
    APIManager.post(path, params)
      .then(response => {
        const payload = response.results || response.result;
        dispatch({
          type: actionType,
          payload: payload,
          params: params,
        });
      })
      .catch(err => {
        console.log(err);
      });
};

export default {
  fetchTasks: params => {
    return dispatch => {
      return dispatch(
        getRequest('/api/task', params, constants.TASKS_RECEIVED),
      );
    };
  },

  createTask: params => {
    return dispatch => {
      return dispatch(postRequest('/api/task', params, constants.TASK_CREATED));
    };
  },

  selectCategory: category => {
    return {
      type: constants.CATEGORY_SELECTED,
      payload: category,
    };
  },
};
