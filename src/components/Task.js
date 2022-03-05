import React, { useState } from 'react';
import '../style.css';

const Task = (props) => {
 
  const handleClick = () => {
    props.mark(props.task.id);
  };

  return (
    <div className='borderPurple spaceAround'>
      Title: {props.task.title}
      <br />
      Completed: {String(props.task.completed)}
      <input
        className='background-yellow'
        type='button'
        value='Mark Completed'
        onClick={handleClick}
      />
    </div>
  );
};

export default Task;
