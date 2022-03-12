import React, { useEffect, useState } from 'react';
import AddNewTask from './AddNewTask';
import Task from './Task';

const Tasks = (props) => {
  let [tasks, setTasks] = useState([]);
  let [index, setIndex] = useState(1);
  let [id, setId] = useState(props.id);
  let [isAddNewTask, setIsAddNewTask] = useState(false);

  useEffect(() => {
    props.tasks && setTasks(props.tasks);
    props.tasks && setIndex(props.tasks.length + 1);
  }, [props.tasks]);

  const handleCompleted = (id) => {
    let taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex > -1) {
      let tasksCopy = [...tasks];
      tasksCopy[taskIndex].completed = true;
      props.updateTasks(tasksCopy);
    }
  };
  const addNewTask = (task) => {
    task.userId = id;
    let updatedTasks = [...tasks, task];
    props.updateTasks(updatedTasks);
    setIsAddNewTask(false);
  };

  return (
    <div className={"border-black height-50 padding-7"}>
      <div className='relative spaceAround'>
        <span>Todos – User {id} </span>
        {!isAddNewTask && (
          <input
            type='button'
            value='add'
            className='background-yellow right-button'
            onClick={() => setIsAddNewTask(true)}
          />
        )}
      </div>
      {isAddNewTask ? (
        <AddNewTask
          id={index}
          add={addNewTask}
          cancel={() => setIsAddNewTask(false)}
        />
      ) : (
        <div className='split-ver '>
          {tasks.length > 0 ?
            tasks.map((task, index) => {
              return <Task key={index} task={task} mark={handleCompleted} />;
            }):
            <span>No Tasks has been found...</span>}
        </div>
      )}
    </div>
  );
};

export default Tasks;
