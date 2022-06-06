import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
// rsc + tab

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    addTask: (title: string) => void
    removeTask: (taskID: string) => void
    changeTodoListFilter: (filter:FilterValuesType) => void
}
const TodoList = (props: TodoListPropsType) => {

    const [title, setTitle] = useState<string>("")

    const tasksJSX = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id);
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={removeTask}>X</button>
            </li>
        )
    })

    const addTask = () => {
        props.addTask(title)
        setTitle("");
    }

    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === "Enter" && addTask();
    }

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        // e.currentTarget - в данном случае input
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeSetTitle}
                    onKeyDown={onKeyDownAddTask}
                />
                <button onClick={addTask}>+</button>
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