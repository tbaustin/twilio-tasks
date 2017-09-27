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

        return payload;
      })
      .catch(err => {
        throw err;
      });
};

const postRequest = (path, params, actionType) => {
  return dispatch =>
    APIManager.post(path, params)
      .then(response => {
        const payload = response.results || response.result || response.user;
        dispatch({
          type: actionType,
          payload: payload,
          params: params,
        });

        return payload;
      })
      .catch(err => {
        throw err;
      });
};

export default {
  register: credentials => {
    return dispatch => {
      return dispatch(
        postRequest(
          '/account/register',
          credentials,
          constants.PROFILE_CREATED,
        ),
      );
    };
  },

  login: credentials => {
    return dispatch => {
      return dispatch(
        postRequest('/account/login', credentials, constants.USER_LOGIN),
      );
    };
  },

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
