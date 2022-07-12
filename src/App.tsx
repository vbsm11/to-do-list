import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';


// CRUD
// create
// read
// update
// delete

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [todoListID: string]: Array<TaskType>
}

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
    // BLL:
    const todoListID1 = v1();
    const todoListID2 = v1();

    const [todoLists, setTodolists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS/TS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
        ],
        [todoListID2]: [
            {id: v1(), title: 'Meat', isDone: true},
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Bread', isDone: false},
            {id: v1(), title: 'Cheese', isDone: true}
        ]
    });


    const removeTask = (todoListID: string, taskID: string) => {
        const copyTasks = {...tasks};
        copyTasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID);
        setTasks(copyTasks);
    }

    const addTask = (todoListID: string, title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const copyTasks = {...tasks};
        copyTasks[todoListID] = [newTask, ...tasks[todoListID]];
        setTasks(copyTasks);
    }

    const changeTaskStatus = (todoListID: string, taskID: string, isDone: boolean) => {
        const copyTasks = {...tasks};
        copyTasks[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, isDone: isDone} : t);
        setTasks(copyTasks);
    }
    const changeTaskTitle = (todoListID: string, taskID: string, title: string) => {
        const copyTasks = {...tasks};
        copyTasks[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, title: title} : t);
        setTasks(copyTasks);
    }

    const changeTodoListFilter = (todoListID: string, filter: FilterValuesType) => {
        setTodolists(todoLists.map(t => t.id === todoListID ? {...t, filter: filter} : t));
    }

    const changeTodoListTitle = (todoListID: string, title: string) => {
        setTodolists(todoLists.map(t => t.id === todoListID ? {...t, title: title} : t));
    }

    const removeTodolist = (todoListID: string) => {
        setTodolists(todoLists.filter(t => t.id !== todoListID));
        const copyTasks = {...tasks};
        delete copyTasks[todoListID];
        setTasks(copyTasks);
    }

    const addTodolist = (title: string) => {
        const newTodoListID = v1();
        const newTodoList: TodoListType = {
            id: newTodoListID,
            title: title,
            filter: 'all'
        }
        setTodolists([newTodoList, ...todoLists]);
        setTasks({...tasks, [newTodoListID]: []});
    }

    // UI:

    const todolistsComponents = todoLists.map(tl => {

        let tasksForRender = tasks;
        if (tl.filter === 'active') {
            tasksForRender = {...tasks, [tl.id]: tasks[tl.id].filter(t => t.isDone === false)};
        }
        if (tl.filter === 'completed') {
            tasksForRender = {...tasks, [tl.id]: tasks[tl.id].filter(t => t.isDone === true)};
        }

        return (
            <Grid item>
                <Paper style={{padding: '20px'}}>
                    <TodoList
                        key={tl.id}
                        todoListID={tl.id}
                        title={tl.title}
                        tasks={tasksForRender[tl.id]}
                        addTask={addTask}
                        removeTask={removeTask}
                        changeTaskTitle={changeTaskTitle}
                        changeTaskStatus={changeTaskStatus}
                        removeTodolist={removeTodolist}
                        changeTodoListTitle={changeTodoListTitle}
                        changeTodoListFilter={changeTodoListFilter}
                        filter={tl.filter}
                    />
                </Paper>
            </Grid>
        )
    })


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit" variant={'outlined'}>
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px 0'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={2}>
                    {todolistsComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
