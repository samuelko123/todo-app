import styled from 'styled-components'

import {
	shallowEqual,
	useDispatch,
	useSelector,
} from 'react-redux'

import {
	deleteTodo,
	toggleTodo,
} from '../app/slices/todoSlice'

import { STATUS_FILTER } from '../app/constants'

import {
	Checkbox,
	DeleteDialog,
	List,
	ListItem,
} from './index'

const StyledListItem = styled(ListItem)`
    display: grid;
    grid-template-columns: 2rem 1fr 4rem;
    column-gap: 1rem;
    align-items: center;
    justify-items: center;
`

const TodoText = styled.span`
    word-wrap: break-word;
    word-break: break-all;
    max-width: 100%;
    justify-self: start;
    text-decoration: ${props => props.completed ? 'line-through' : 'none'};
`

const TodoListItem = (props) => {
	const { id } = props
	const dispatch = useDispatch()

	const item = useSelector(state => {
		return state.todos.find(todo => todo.id === id)
	})

	return (
		<StyledListItem>
			<Checkbox
				label={'Complete Todo'}
				onChange={() => dispatch(toggleTodo(item.id))}
				checked={item.completed}
			/>
			<TodoText completed={item.completed}>
				{item.name}
			</TodoText>
			<DeleteDialog
				itemName={item.name}
				onConfirm={() => dispatch(deleteTodo(item.id))}
			/>
		</StyledListItem>
	)
}

export const TodoList = () => {
	const todoIds = useSelector(state => {
		switch (state.filter.status) {
		case STATUS_FILTER.ALL:
			return state.todos
				.map(todo => todo.id)
		case STATUS_FILTER.ACTIVE:
			return state.todos
				.filter(todo => !todo.completed)
				.map(todo => todo.id)
		case STATUS_FILTER.COMPLETED:
			return state.todos
				.filter(todo => todo.completed)
				.map(todo => todo.id)
		}
	}, shallowEqual)

	return (
		<div>
			<span>
				No. of items: {todoIds.length}
			</span>
			<List>
				{
					todoIds.map(id =>
						<TodoListItem
							key={id}
							id={id}
						/>
					)
				}
			</List>
		</div>
	)
}
