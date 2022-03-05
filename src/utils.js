import axios from 'axios';

const getUsersFullData = async () => {
  let resUsers = await axios.get('https://jsonplaceholder.typicode.com/users/');
  let usersData = resUsers.data;

  let resTodos = await axios.get('https://jsonplaceholder.typicode.com/todos');
  let tasksData = resTodos.data;

  let resPosts = await axios.get('https://jsonplaceholder.typicode.com/posts');
  let postsData = resPosts.data;

  usersData.forEach((user) => {
    user.tasks = tasksData.filter((t) => t.userId === user.id);
    user.posts = postsData.filter((t) => t.userId === user.id);
  });

  return usersData;
};

export default { getUsersFullData };
