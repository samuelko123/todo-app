import {
    useDispatch,
    useSelector,
} from 'react-redux'

import {
    deleteTodo,
    selectTodos,
    toggleTodo,
} from '../app/slices/todoSlice'

import { Checkbox } from '.'

export const TodoList = () => {
    const todos = useSelector(selectTodos)
    const dispatch = useDispatch()

    return (
        <ul>
            {
                todos.map((todo, index) =>
                    <li key={index}>
                        <Checkbox
                            onClick={() => dispatch(toggleTodo(index))}
                        />
                        <span>
                            {todo.name}
                        </span>
                        <button
                            onClick={() => dispatch(deleteTodo(index))}
                        >
                            Delete
                        </button>
                    </li>
                )
            }
        </ul>
    )
}
