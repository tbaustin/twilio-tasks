import constants from '../constants';

const initialState = {
  selectedCategory: 'delivery',
  categories: ['delivery', 'dog walking', 'house cleaning'],
};

export default (state = initialState, action) => {
  let updated = Object.assign({}, state);

  switch (action.type) {
    case constants.TASKS_RECEIVED:
      const keys = Object.keys(action.params);
      keys.map(key => {
        const value = action.params[key];
        updated[value] = action.payload;
      });
      // updated['all'] = action.payload;

      return updated;

    case constants.TASK_CREATED:
      const { category } = action.params;
      let currentTasks = updated[category] ? [...updated[category]] : [];
      currentTasks.unshift(action.payload);
      updated[category] = currentTasks;
      return updated;

    case constants.CATEGORY_SELECTED:
      updated['selectedCategory'] = action.payload;

      return updated;

    default:
      return state;
  }
};
