import styled from 'styled-components'

import {
	useDispatch,
	useSelector,
} from 'react-redux'

import {
	deleteTodo,
	selectTodos,
	toggleTodo,
} from '../app/slices/todoSlice'

import {
	Checkbox,
	DeleteButton,
	List,
	ListItem,
} from '.'

export const TodoListItem = styled(ListItem)`
    display: grid;
    grid-template-columns: 2rem 1fr 4rem;
    column-gap: 1rem;
    align-items: center;
    justify-items: center;
`

export const TodoText = styled.div`
    word-wrap: break-word;
    word-break: break-all;
    max-width: 100%;
    justify-self: start;
    text-decoration: ${props => props.completed ? 'line-through' : 'none' };
`

export const TodoList = () => {
	const todos = useSelector(selectTodos)
	const dispatch = useDispatch()

	return (
		<List>
			{
				todos.map((todo, index) =>
					<TodoListItem key={index}>
						<Checkbox
							label={'Complete Todo'}
							onClick={() => dispatch(toggleTodo(index))}
						/>
						<TodoText completed={todo.completed}>
							{todo.name}
						</TodoText>
						<DeleteButton
							onClick={() => dispatch(deleteTodo(index))}
						>
                            Delete
						</DeleteButton>
					</TodoListItem>
				)
			}
		</List>
	)
}
