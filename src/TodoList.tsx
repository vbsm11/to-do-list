import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType, TaskStateType} from './App';
// rsc + tab

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    todoListID: string,
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (todoListID: string, title: string) => void
    removeTask: (todoListID: string, taskID: string) => void
    changeTodoListFilter: (todoListID: string, filter:FilterValuesType) => void
    changeTaskStatus: (todoListID: string, taskID: string, isDone: boolean) => void
    removeTodolist: (todoListID: string) => void
}
const TodoList = (props: TodoListPropsType) => {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false);

    const tasksJSX = props.tasks.length? props.tasks.map(t => {
        const removeTask = () => props.removeTask(props.todoListID, t.id);

        const onChangeTaskStatus = (e:ChangeEvent<HTMLInputElement> ) => {
            props.changeTaskStatus(props.todoListID, t.id, e.currentTarget.checked)
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
            props.addTask(props.todoListID, trimmedTitle)
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

    const onAllClickHandler = () => {
        props.changeTodoListFilter(props.todoListID,"all")
    }

    const onActiveClickHandler = () => {
        props.changeTodoListFilter(props.todoListID,"active")
    }

    const onCompletedClickHandler = () => {
        props.changeTodoListFilter(props.todoListID,"completed")
    }

    const removeTodolist = () => {
        props.removeTodolist(props.todoListID);
    }

    return (
        <div>
            <h3>
                {props.title}
                <button onClick={removeTodolist}>X</button>
            </h3>

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
                    onClick={onAllClickHandler}
                >All</button>
                <button
                    className={props.filter === 'active' ? 'active' : ''}
                    onClick={onActiveClickHandler}
                >Active</button>
                <button
                    className={props.filter === 'completed' ? 'active' : ''}
                    onClick={onCompletedClickHandler}
                >Completed</button>
            </div>
        </div>
    );
}

export default TodoList;