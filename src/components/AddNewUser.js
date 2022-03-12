import React, { useState } from 'react';
import '../style.css';

const AddNewUser = (props) => {
  let [addName, setAddName] = useState('');
  let [addEmail, setAddEmail] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    props.add({ id: props.id, name: addName, email: addEmail });
  };

  return (
    <div className='split right'>
      <form onSubmit={handleAdd}>
        <label>Name: </label>
        <input
          className='spaceAround'
          type='text'
          name='name'
          required
          value={addName}
          onChange={(e) => setAddName(e.target.value)}
        />
        <br />
        <label>Email: </label>
        <input
          className='spaceAround'
          type='email'
          name='email'
          required
          value={addEmail}
          onChange={(e) => setAddEmail(e.target.value)}
        />
        <br />
        <br />
        <input
          type='submit'
          value='Add'
          className='background-yellow spaceAround'
        />
        <input
          type='button'
          value='Cancel'
          onClick={props.cancel}
          className='background-yellow spaceAround'
        />
      </form>
      <br />
      <br />
    </div>
  );
};

export default AddNewUser;
