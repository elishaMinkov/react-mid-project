import React, { useEffect, useState } from 'react';
import Task from './Task';

const Tasks = (props) => {
  let [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(props.tasks);
  }, [props.tasks]);

  const handleCompleted = (id) => {
    //todo: currently add new task, need to update
    let tasksArray = tasks.filter((task) => task.id === id);
    if (tasksArray.length > 0) {
      let task = tasksArray[0];
      task.completed = true;
      let newTasks = [...tasks, task]
      setTasks(newTasks);
      props.update(newTasks);
    }
  };

  return (
    <div>
      {tasks.length > 0 &&
        tasks.map((task, index) => {
          return <Task key={index} task={task} mark={handleCompleted} />;
        })}
    </div>
  );
};

export default Tasks;
