import React from 'react'
import { useState, useEffect } from 'react'
import uuidv4 from 'uuid/v4'


//scream case syntax
const TASKS_STORAGE_KEY = 'TASKS_STORAGE_KEY'

const storeTasks = ({tasks, completedTasks})=>{
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify({tasks, completedTasks}))
}

const readStoredTasks = () =>{
    const taskMap = JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY))
    return taskMap ? taskMap : {tasks: [], completedTasks: []};
}

const Tasks = () => {
    

    const [ taskText, setTaskText ] = useState('');
    const storedTasks = readStoredTasks();
    const [ tasks, setTasks ] = useState(storedTasks.tasks);
    const [ completedTasks, setCompletedTasks ] = useState(storedTasks.completedTasks);

    useEffect(()=> {
        storeTasks({tasks, completedTasks});
    }, [tasks, completedTasks])

    const updateTaskText = event => {
        setTaskText(event.target.value)
    }
    
    const addTask = () => {
        setTasks([...tasks, {text: taskText, id: uuidv4()}]);
        setTaskText("");
    }

    //curried fn method of event handler fn

    const completeTask = completedTask => () => {
        setCompletedTasks([...completedTasks, completedTask])
        setTasks(tasks.filter(task =>  task.id !== completedTask.id ))
    }

    //curried fn method of event handler fn

    const deleteTask = taskToDelete => () => {
        setCompletedTasks(completedTasks.filter(task => task.id !== taskToDelete.id ))
    }

    return (
        <div>
            <h3>Tasks</h3>
            <div className="form">
                <input value={taskText} onChange={updateTaskText}/>
                <button onClick={addTask}>Add Task</button>
            </div>
            <br/>
            Todo List
            <div className="task-list">
                {tasks.map(task => (
                    <div key={task.id}>
                        {task.text}-{task.id}
                        <button onClick={completeTask(task)}>Completed</button>
                    </div>
                ))}
            </div>
            <div className="completed-list">
                {completedTasks.map(task => (
                    <div key={task.id}>
                        {task.text}- <span className="delete-span" onClick={deleteTask(task)}>X</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Tasks;