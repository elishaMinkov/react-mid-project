import React, { useEffect, useState } from 'react';
import Posts from '../components/Posts';
import Tasks from '../components/Tasks';
import '../style.css';

const MainUser = (props) => {
  let [user, setUser] = useState({});
  let [name, setName] = useState('');
  let [email, setEmail] = useState('');
  let [street, setStreet] = useState('');
  let [city, setCity] = useState('');
  let [zipCode, setZipcode] = useState('');
  let [tasks, setTasks] = useState([]);
  let [posts, setPosts] = useState([]);

  let [isBorderRed, setIsBorderRed] = useState(true);
  let [isSideInMyUse, setIsSideInMyUse] = useState(false);
  let [isOtherDataOpened, setIsOtherDataOpened] = useState(false);

  useEffect(() => {
    setIsSideInMyUse(!!props.isSideInUse[user.id]);
  }, [props.isSideInUse]);

  useEffect(() => {
    setUser(props.user);
    setName(props.user.name);
    setEmail(props.user.email);
    setStreet(props.user.address?.street);
    setCity(props.user.address?.city);
    setZipcode(props.user.address?.zipcode);
    setTasks(props.user.tasks);
    setPosts(props.user.posts);
  }, [props.user]);

  useEffect(() => {
    if(tasks){
    let unCompleted = tasks.filter((item) => item.completed === false);
    unCompleted.length > 0 ? setIsBorderRed(true) : setIsBorderRed(false);
    }
  }, [tasks]);

  const updateSide = () => {
    let obj = {};
    obj[user.id] = !isSideInMyUse;
    props.getRightSide(obj);
  };

  const updateUser = () => {
    let copyUser = { ...user };
    copyUser.name = name;
    copyUser.email = email;
    !copyUser.address && (copyUser.address = {});
    copyUser.address.street = street;
    copyUser.address.city = city;
    copyUser.address.zipcode = zipCode;
    copyUser.tasks = tasks;
    copyUser.posts = posts;
    console.log(copyUser);
    props.update(copyUser);
  };

  const handleDelete = () => {
    props.delete(user.id);
  };

  const updateTasks = (tasks) => {
    setTasks(tasks);
  };

  const updatePosts = (posts) =>{
    setPosts(posts)
  }

  return (
    <div
      className={`${isBorderRed ? 'border-red' : 'border-green'} 
      ${isSideInMyUse && 'background-red'} spaceAround relative`}
    >
      <span onClick={updateSide} className='pointer'>
        ID: {user.id}{' '}
      </span>
      <br />
      <span>Name: </span>{' '}
      <input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <span>Email: </span>{' '}
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <br />
      <input
        className='background-gray'
        type='button'
        value='Other Data'
        onMouseOver={() => setIsOtherDataOpened(true)}
        onClick={() => isOtherDataOpened && setIsOtherDataOpened(false)}
      />
      {isOtherDataOpened && (
        <div className='border-black2 background-gray'>
          <span>Street: </span>{' '}
          <input
            type='text'
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
          <br />
          <span>city: </span>{' '}
          <input
            value={city}
            type='text'
            onChange={(e) => setCity(e.target.value)}
          />
          <br />
          <span>Zip Code: </span>{' '}
          <input
            value={zipCode}
            type='text'
            onChange={(e) => setZipcode(e.target.value)}
          />
          <br />
        </div>
      )}
      {isSideInMyUse && (
        <div className='split right'>
          <div>
            <Tasks tasks={tasks} id={user.id} updateTasks={updateTasks} />
          </div>
          <div>
            <Posts posts={posts} id ={user.id} updatePosts={updatePosts}/>
          </div>
        </div>
      )}
      {'                                  '}
      <div className='right-button'>
        <input
          type='button'
          value='Update'
          className='background-yellow '
          onClick={updateUser}
        />
        <input
          type='button'
          value='Delete'
          className='background-yellow '
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};

export default MainUser;
