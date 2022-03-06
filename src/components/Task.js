import React, { useState } from 'react';
import '../style.css';

const Task = (props) => {
 
  const handleClick = () => {
    props.mark(props.task.id);
  };

  return (
    <div className='border-purple spaceAround relative' >
      Title: {props.task.title}
      <br />
      Completed: {String(props.task.completed)}
      <input
        className='background-yellow right-button'
        type='button'
        value='Mark Completed'
        onClick={handleClick}
      />
    </div>
  );
};

export default Task;
