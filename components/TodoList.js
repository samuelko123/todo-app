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
	Button,
	Checkbox,
	List,
	ListItem,
} from './index'

const TodoListItem = styled(ListItem)`
    display: grid;
    grid-template-columns: 2rem 1fr 4rem;
    column-gap: 1rem;
    align-items: center;
    justify-items: center;
`

const TodoText = styled.span.attrs({ role: 'listitemtext' })`
    word-wrap: break-word;
    word-break: break-all;
    max-width: 100%;
    justify-self: start;
    text-decoration: ${props => props.completed ? 'line-through' : 'none'};
`

const DeleteButton = styled(Button)`
  background-color: ${props => props.theme.danger};
  border-color: ${props => props.theme.danger};
  color: ${props => props.theme.light};

  &:hover {
    background-color: ${props => props.theme.light};
    color: ${props => props.theme.danger};
  }
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
							onChange={() => dispatch(toggleTodo(index))}
							defaultChecked={todo.completed}
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
