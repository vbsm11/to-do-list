import React, {ChangeEvent} from 'react';
import App, {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
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
    changeTodoListTitle: ((todoListID: string, title: string) => void)
    changeTaskStatus: (todoListID: string, taskID: string, isDone: boolean) => void
    changeTaskTitle: (todoListID: string, taskID: string, title: string) => void
    removeTodolist: (todoListID: string) => void
}
const TodoList = (props: TodoListPropsType) => {

    const tasksJSX = props.tasks.length? props.tasks.map(t => {
        const removeTask = () => props.removeTask(props.todoListID, t.id);

        const onChangeTaskStatus = (e:ChangeEvent<HTMLInputElement> ) => {
            props.changeTaskStatus(props.todoListID, t.id, e.currentTarget.checked)
        }
        const onChangeTaskTitle = (title: string) => {
            props.changeTaskTitle(props.todoListID, t.id, title)
        }

        return (
            <li
                key={t.id}
                className={t.isDone ? 'isDone' : ''}
            >
                <input
                    onChange={onChangeTaskStatus}
                    type="checkbox"
                    checked={t.isDone}
                />
                <EditableSpan title={t.title} changeTitle={onChangeTaskTitle}/>
                <button onClick={removeTask}>X</button>
            </li>
        )
    }) :
        <span>No tasks</span>

    const addTask = (title: string) => {
        props.addTask(props.todoListID, title);
    }

    const createOnClickHandler = (filer: FilterValuesType): () => void => {
        const onClickHandler = () => {
            props.changeTodoListFilter(props.todoListID, filer);
        }
        return onClickHandler;
    }

    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(props.todoListID, title);
    }

    const removeTodolist = () => {
        props.removeTodolist(props.todoListID);
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <button onClick={removeTodolist}>X</button>
            </h3>

            <AddItemForm addItem={addTask} />
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? 'active' : ''}
                    onClick={createOnClickHandler('all')}
                >All</button>
                <button
                    className={props.filter === 'active' ? 'active' : ''}
                    onClick={createOnClickHandler('active')}
                >Active</button>
                <button
                    className={props.filter === 'completed' ? 'active' : ''}
                    onClick={createOnClickHandler('completed')}
                >Completed</button>
            </div>
        </div>
    );
}

export default TodoList;