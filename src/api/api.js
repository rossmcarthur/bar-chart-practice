export const fetchUsers = () => {
  return fetch('https://randomuser.me/api/?results=25').then(data => {
    return data.json();
  });
};
