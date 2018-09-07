import React from 'react';

export const UserIndexItem = ({ user }) => {
  return (
    <ul className='user-index-item'>
      <img src={user.picture.medium} alt=''></img>
      <h1>Name: {user.name.first}</h1>
      <h3>Gender: {user.gender[0].toUpperCase()}</h3>
      <h3>Age: {user.dob.age}</h3>
      <h3>Location: {user.location.city}, {user.location.state}</h3>
    </ul>
  );
};
