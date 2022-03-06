import React, { useState, useEffect } from 'react';
import utils from '../utils';
import '../style.css';
import AddNewUser from '../components/AddNewUser';
import MainUser from './MainUser';

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
      <span>Search </span>
      <input type='text' onChange={(e) => setTextForSearch(e.target.value)} />
      <input
        type='button'
        value='add'
        className='background-yellow'
        onClick={() => takeRightSide({ home: true })}
      />
      {rightSide.home && (
        <AddNewUser
          id={index}
          add={addNewUser}
          cancel={() => takeRightSide({ home: false })}
        />
      )}
      {usersForDisplay.length > 0 &&
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
        })}
    </div>
  );
};

export default Home;
