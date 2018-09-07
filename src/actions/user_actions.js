import * as APIUtil from '../api/api';
export const RECEIVE_USERS = 'RECEIVE_USERS';

export const receiveUsers = users => {
  return {
    type: RECEIVE_USERS,
    users: users.results
  };
};

export const fetchAllUsers = () => dispatch => {
  return APIUtil.fetchUsers().then( users => {
    return dispatch(receiveUsers(users));
  });
};
