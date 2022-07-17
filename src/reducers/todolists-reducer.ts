import {FilterValuesType, TodoListType} from '../App';

type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST',
    id: string
}

type AddTodoListAT = {
    type: 'ADD-TODOLIST',
    title: string
    id: string
}

type ChangeTodolistTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}

type ChangeTodolistFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType
}


type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT

export const todolistsReducer = (todoLists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todoLists.filter(t => t.id !== action.id)
        case 'ADD-TODOLIST':
            const newTodoList: TodoListType = {
                id: action.id,
                title: action.title,
                filter: 'all'
            }
            return [...todoLists, newTodoList]
        case 'CHANGE-TODOLIST-TITLE':
            return todoLists.map(t => t.id === action.id ? {...t, title: action.title} : t);
        case 'CHANGE-TODOLIST-FILTER':
            return todoLists.map(t => t.id === action.id ? {...t, filter: action.filter} : t);
        default:
            return todoLists
    }
}

export const RemoveTodolistAC = (id: string): RemoveTodoListAT => ({
    type: 'REMOVE-TODOLIST',
    id: id
})

export const AddTodolistAc = (title: string, id: string): AddTodoListAT => ({
    type: 'ADD-TODOLIST',
    title,
    id
})

export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleAT => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    title
})

export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterAT => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
})