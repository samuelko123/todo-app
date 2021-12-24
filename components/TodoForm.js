import styled from 'styled-components'

import {
	Button,
	TextField,
} from './index'

import { addTodo } from '../app/slices/todoSlice'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const TodoFormRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 4rem;
    column-gap: 1rem;
    padding: 0.25rem 0.5rem;
`

export const TodoForm = () => {
	const dispatch = useDispatch()

	const {
		handleSubmit,
		register,
		reset,
		setFocus,
	} = useForm()

	const onSubmit = data => {
		dispatch(addTodo(
			{
				name: data['new-todo'],
				completed: false,
			}
		))

		reset()
	}

	useEffect(() => {
		setFocus('new-todo')
	}, [setFocus])

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<TodoFormRow>
				<TextField
					placeholder='Enter New Todo'
					label='Enter New Todo'
					{...register('new-todo')}
				/>
				<Button
					type="submit"
				>
                    Add
				</Button>
			</TodoFormRow>
		</form>
	)
}