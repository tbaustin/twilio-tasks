import constants from '../constants';

const initialState = {
  user: null,
};

export default (state = initialState, action) => {
  let updated = Object.assign({}, state);

  switch (action.type) {
    case constants.PROFILE_CREATED:
      console.log('PROFILE_CREATED: ' + JSON.stringify(action.payload));

      return updated;

    default:
      return state;
  }
};
