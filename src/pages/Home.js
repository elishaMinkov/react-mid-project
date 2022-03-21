import React, { useState, useEffect } from 'react';
import utils from '../utils';
import '../style.css';
import AddNewUser from '../components/AddNewUser';
import MainUser from './MainUser';
import { Grid } from '@mui/material';
import Tasks from '../components/Tasks';
import Posts from '../components/Posts';

const Home = () => {
  let [users, setUsers] = useState([]);
  let [index, setIndex] = useState(0);
  let [textForSearch, setTextForSearch] = useState('');
  let [usersForDisplay, setUsersForDisplay] = useState([]);
  let [rightSide, setRightSide] = useState({ home: false });

  useEffect(async () => {
    let users = await utils.getUsersFullData();
    setUsers(users);
    setIndex(users.length + 1);
  }, []);

  useEffect(() => {
    let filtredUsers = users.filter((item) => {
      return (
        item.name.includes(textForSearch) || item.email.includes(textForSearch)
      );
    });
    setUsersForDisplay(filtredUsers);
  }, [users, textForSearch]);

  const addNewUser = (user) => {
    setUsers([...users, user]);
    setIndex(index + 1);
    takeRightSide({ home: false });
  };
  const updateUser = (user) => {
    let copyUsers = users.map(
      (userToCheck) => (user.id === userToCheck.id && user) || userToCheck
    );
    setUsers(copyUsers);
  };
  const deleteUser = (id) => {
    let restUses = [...users].filter((item) => item.id !== id);
    setUsers(restUses);
  };

  const takeRightSide = (obj) => {
    Object.keys(rightSide).forEach((key) => (rightSide[key] = false));
    setRightSide({ ...rightSide, ...obj });
  };

  return (
    <div className='split left border-black'>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <span>Search </span>
          <input
            type='text'
            onChange={(e) => setTextForSearch(e.target.value)}
          />
          <input
            type='button'
            value='add'
            className='background-yellow'
            onClick={() => takeRightSide({ home: true })}
          />

          {usersForDisplay.length > 0 ? (
            usersForDisplay.map((user) => {
              return (
                <MainUser
                  key={user.id}
                  user={user}
                  isSideInUse={rightSide}
                  getRightSide={takeRightSide}
                  update={updateUser}
                  delete={deleteUser}
                />
              );
            })
          ) : (
            <h4>Loadind users list...</h4>
          )}
        </Grid>
        <Grid item xs={6}>
          {
            <>
              {
                <AddNewUser
                  id={index}
                  add={addNewUser}
                  cancel={() => takeRightSide({ home: false })}
                />
              } 
              {/* todo need to move data of tasks and posts state from child to parent  */}
              <div className='split right' style={{ border: '2px solid red' }}> 
                <Tasks tasks={null} id={2} updateTasks={null} />

                <Posts posts={null} id={2} updatePosts={null} />
              </div>
            </>
          }
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
