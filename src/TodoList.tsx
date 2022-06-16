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
    filter: FilterValuesType
    addTask: (title: string) => void
    removeTask: (taskID: string) => void
    changeTodoListFilter: (filter:FilterValuesType) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
}
const TodoList = (props: TodoListPropsType) => {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false);

    const tasksJSX = props.tasks.length? props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id);

        const onChangeTaskStatus = (e:ChangeEvent<HTMLInputElement> ) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked)
        }

        return (
            <li key={t.id}>
                <input
                    onChange={onChangeTaskStatus}
                    type="checkbox"
                    checked={t.isDone}
                />
                <span className={t.isDone ? 'isDone' : ''}>{t.title}</span>
                <button onClick={removeTask}>X</button>
            </li>
        )
    }) :
        <span>No tasks</span>

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle)
        } else {
            setError(true)
        }

        setTitle("");
    }

    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === "Enter" && addTask();
    }

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
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
                    className={ error? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {error && <div style={{color: "red"}}>Title is required</div>}
            </div>
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? 'active' : ''}
                    onClick={ () => props.changeTodoListFilter("all")}
                >All</button>
                <button
                    className={props.filter === 'active' ? 'active' : ''}
                    onClick={ () => props.changeTodoListFilter("active")}
                >Active</button>
                <button
                    className={props.filter === 'completed' ? 'active' : ''}
                    onClick={ () => props.changeTodoListFilter("completed")}
                >Completed</button>
            </div>
        </div>
    );
}

export default TodoList;