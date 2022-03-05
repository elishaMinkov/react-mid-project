import React, { useEffect, useState } from 'react';
import '../style.css';

const MainUser = (props) => {
  let [user, setUser] = useState({});
  let [name, setName] = useState('');
  let [email, setEmail] = useState('');
  let [street, setStreet] = useState('');
  let [city, setCity] = useState('');
  let [zipCode, setZipcode] = useState('');

  let [isBorderRed, setIsBorderRed] = useState(true);
  let [isSideInMyUse, setIsSideInMyUse] = useState(false);
  let [isOtherDataOpened, setIsOtherDataOpened] = useState(false);

  useEffect(() => {
    setIsSideInMyUse(!!props.isSideInUse[user.id]);
  }, [props.isSideInUse]);

  useEffect(() => {
    console.log('get new user', props.user.id);
    setUser(props.user);
    setName(props.user.name);
    setEmail(props.user.email);
    setStreet(props.user.address?.street);
    setCity(props.user.address?.city);
    setZipcode(props.user.address?.zipcode);

    if (props.user.tasks) {
      let unCompleted = props.user.tasks.filter(
        (item) => item.completed === false
      );
      unCompleted.length > 0 ? setIsBorderRed(true) : setIsBorderRed(false);
    }
  }, [props.user]);

  const updateSide = () => {
    let obj = {};
    obj[user.id] = true;
    props.getRightSide(obj);
  };

  const updateUser = () => {
    let copyUser = { ...user };
    copyUser.name = name;
    copyUser.email = email;
    !copyUser.address && (copyUser.address = {})
    copyUser.address.street = street;
    copyUser.address.city = city;
    copyUser.address.zipcode = zipCode;
    console.log(copyUser);
    props.update(copyUser);
  };

  const handleDelete = () => {
    props.delete(user.id);
  };

  return (
    <div className={`${isBorderRed ? 'borderRed' : 'borderGreen'} spaceAround`}>
      <span onClick={updateSide}>ID: </span>
      {user.id}
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
      <input
        type='button'
        value='Other Data'
        onMouseOver={() => setIsOtherDataOpened(true)}
        onClick={() => isOtherDataOpened && setIsOtherDataOpened(false)}
      />
      {isOtherDataOpened && (
        <div className='borderBlack2 background-gray'>
          <span>Street: </span>{' '}
          <input
            className='background-gray'
            type='text'
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
          <br />
          <span>city: </span>{' '}
          <input
            className='background-gray'
            value={city}
            type='text'
            onChange={(e) => setCity(e.target.value)}
          />
          <br />
          <span>Zip Code: </span>{' '}
          <input
            className='background-gray'
            value={zipCode}
            type='text'
            onChange={(e) => setZipcode(e.target.value)}
          />
          <br />
        </div>
      )}
      {isSideInMyUse && (
        <div className='split right'>todos posts {user.id} </div>
      )}
      {'                                  '}
      <input
        type='button'
        value='Update'
        className='background-yellow'
        onClick={updateUser}
      />
      <input
        type='button'
        value='Delete'
        className='background-yellow'
        onClick={handleDelete}
      />
    </div>
  );
};

export default MainUser;
