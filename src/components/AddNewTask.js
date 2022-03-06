import React, { useState } from 'react';

const AddNewTask = (props) => {
  let [title, setTitle] = useState('');

  const handleAdd = () => {
    let task = { completed: false };
    task.id = props.id;
    task.title = title;
    props.add(task);
  };

  return (
    <div>
      Title: <input type='text' onChange={(e) => setTitle(e.target.value)} />
      <br />
      <br />
      <div>
        <input
          type='button'
          value='cancel'
          onClick={() => props.cancel()}
          className='background-yellow'
        />
        <input
          type='button'
          value='Add'
          onClick={handleAdd}
          className='background-yellow'
        />
      </div>
    </div>
  );
};

export default AddNewTask;
