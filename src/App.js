import { useState} from 'react';
import Task from './Task';

let numberOfTasks = Number(localStorage.getItem("numberOfTasks"));

if(!numberOfTasks){
  numberOfTasks = 0;
  localStorage.setItem("numberOfTasks", numberOfTasks);
  localStorage.clear();
}

//loads previous tasks from local storage
let savedTasks = [];
for(let index = 0; index < numberOfTasks; index++){
  savedTasks.push(localStorage.getItem(`task_${index}`));
}

function App() {
  const [tasks, updateTasks] = useState(savedTasks);

  const handleNewTask = () => {
    numberOfTasks++;
    localStorage.setItem("numberOfTasks", numberOfTasks);
    localStorage.setItem(`task_${numberOfTasks-1}`, "");
    updateTasks(oldArray => [...oldArray, localStorage.getItem(`task_${numberOfTasks-1}`)]);
  }

  const handleDelete = indexOfDeletedTask =>{
    localStorage.removeItem(`task_${indexOfDeletedTask}`);

    updateTasks(tasks.filter((item, index) => index !== indexOfDeletedTask));

    for(let index = indexOfDeletedTask + 1; index < numberOfTasks; index++){
      let val = localStorage.getItem(`task_${index}`);
      localStorage.removeItem(`task_${index}`);
      localStorage.setItem(`task_${index-1}`, val);
    }

    numberOfTasks--;
    localStorage.setItem('numberOfTasks', numberOfTasks);
  }

  return (
    <div className="app">
      <h1>Task manager</h1>
      {tasks.map((task, index) => <Task key={index} index={index} text={task} onDelete={handleDelete}/>)}
      <button onClick={handleNewTask}>Add task</button>
    </div>
  );
}

export default App;
