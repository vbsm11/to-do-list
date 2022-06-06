import React from 'react';
import {FilterValuesType} from "./App";
// rsc + tab

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: number) => void
    changeTodoListFilter: (filter:FilterValuesType) => void
}
const TodoList = (props: TodoListPropsType) => {
    const tasksJSX = props.tasks.map(t => {
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={ () => props.removeTask(t.id) }>X</button>
            </li>
        )
    })
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <button onClick={ () => props.changeTodoListFilter("all")}>All</button>
                <button onClick={ () => props.changeTodoListFilter("active")}>Active</button>
                <button onClick={ () => props.changeTodoListFilter("completed")}>Completed</button>
            </div>
        </div>
    );
}

export default TodoList;