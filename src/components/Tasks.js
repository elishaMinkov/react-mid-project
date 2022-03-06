import React, { useEffect, useState } from 'react';
import Task from './Task';

const Tasks = (props) => {
  let [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(props.tasks);
  }, [props.tasks]);

  const handleCompleted = (id) => {
    //todo: currently add new task, need to update
    let taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex > -1) {
      let tasksCopy = [...tasks];
      tasksCopy[taskIndex].completed = true;
      setTasks(tasksCopy);
      props.update(tasksCopy);
    }
  };

  return (
    <div>
      Title
    <div className='split-ver spaceAround'>
      {tasks.length > 0 &&
        tasks.map((task, index) => {
          return <Task key={index} task={task} mark={handleCompleted} />;
        })}
    </div>
    </div>
  );
};

export default Tasks;
