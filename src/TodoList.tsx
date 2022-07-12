import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete, HighlightOff} from '@material-ui/icons';
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
                <Checkbox size={'small'} color={'primary'} onChange={onChangeTaskStatus} checked={t.isDone} />
                <EditableSpan title={t.title} changeTitle={onChangeTaskTitle}/>
                <IconButton onClick={removeTask} size={'small'} color={'secondary'}>
                    <HighlightOff fontSize={'small'}/>
                </IconButton>
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
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>

            <AddItemForm addItem={addTask} />
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <Button
                    size={'small'}
                    variant={'contained'}
                    color={props.filter === 'all' ? 'primary': 'default'}
                    disableElevation
                    onClick={createOnClickHandler('all')}
                >All
                </Button>
                <Button
                    size={'small'}
                    variant={'contained'}
                    color={props.filter === 'active' ? 'primary': 'default'}
                    disableElevation
                    onClick={createOnClickHandler('active')}
                >Active
                </Button>
                <Button
                    size={'small'}
                    variant={'contained'}
                    color={props.filter === 'completed' ? 'primary': 'default'}
                    disableElevation
                    onClick={createOnClickHandler('completed')}
                >Completed
                </Button>
            </div>
        </div>
    );
}

export default TodoList;