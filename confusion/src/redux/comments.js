import * as ActionTypes from './ActionType';

export const Comments = (
  state = {
    errMess: null,
    comments: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        comments: action.payload,
      };
    case ActionTypes.COMMENTS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        comments: [],
      };
    case ActionTypes.ADD_COMMENT:
      var comment = action.payload;
      console.log('inside comments reducer, ', comment);
      return { ...state, comments: state.comments.concat(comment) };
    default:
      return state;
  }
};
