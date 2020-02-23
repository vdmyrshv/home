import React from 'react'
import { useState, useEffect, useReducer } from 'react'
import uuidv4 from 'uuid/v4'

const initialTasksState = {
    tasks: [],
    completedTasks: []
}

const TYPES = {
    ADD_TASK: 'ADD_TASK',
    COMPLETE_TASK: 'COMPLETE_TASK',
    DELETE_TASK: 'DELETE_TASK'
}

const tasksReducer = (state, action) => {
    console.log("state", state, "action", action)
    switch(action.type){
        case("ADD_TASK"):
            return {
                ...state,
                tasks:[...state.tasks, action.task] 
            }
        case("COMPLETE_TASK"):
            return{
                ...state,
                tasks: state.tasks.filter(task=>task.id !== action.completedTask.id),
                completedTasks:[...state.completedTasks, action.completedTask]
            }
        case("DELETE_TASK"):
            return{
                ...state,
                completedTasks: state.completedTasks.filter(task=>task.id !== action.taskToDelete.id)
            }
        default:
            return state;
    }
}


//scream case syntax
const TASKS_STORAGE_KEY = 'TASKS_STORAGE_KEY'

const storeTasks = ({tasks, completedTasks})=>{
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify({tasks, completedTasks}))
}

const readStoredTasks = () =>{
    const taskMap = JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY))
    return taskMap ? taskMap : initialTasksState;
}

const Tasks = () => {
    

    const [ taskText, setTaskText ] = useState('');
    const storedTasks = readStoredTasks();
    //const [ tasks, setTasks ] = useState(storedTasks.tasks);
    //const [ completedTasks, setCompletedTasks ] = useState(storedTasks.completedTasks);

    const [state, dispatch] = useReducer(tasksReducer, storedTasks);

    const {tasks, completedTasks} = state;

    useEffect(()=> {
        storeTasks({tasks, completedTasks});
    }, [tasks, completedTasks])

    const updateTaskText = event => {
        setTaskText(event.target.value)
    }
    
    const addTask = () => {
        dispatch({type: TYPES.ADD_TASK, task: {taskText, id: uuidv4() }})
        //setTasks([...tasks, {taskText, id: uuidv4()}]);
        setTaskText("");
    }

    //curried fn method of event handler fn

    const completeTask = completedTask => () => {
        dispatch({type: TYPES.COMPLETE_TASK, completedTask})
       // setCompletedTasks([...completedTasks, completedTask])
        //setTasks(tasks.filter(task =>  task.id !== completedTask.id ))
    }

    //curried fn method of event handler fn

    const deleteTask = taskToDelete => () => {
        dispatch({type: TYPES.DELETE_TASK, taskToDelete})
        //setCompletedTasks(completedTasks.filter(task => task.id !== taskToDelete.id ))
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
                {state.tasks.map(task => (
                    <div key={task.id}>
                        {task.taskText}-{task.id}
                        <button onClick={completeTask(task)}>Completed</button>
                    </div>
                ))}
            </div>
            <div className="completed-list">
                {state.completedTasks.map(task => (
                    <div key={task.id}>
                        {task.taskText}- <span className="delete-span" onClick={deleteTask(task)}>X</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Tasks;