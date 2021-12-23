import {
    Button,
    TextField,
} from '.'

import { addTodo } from '../app/slices/todoSlice'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

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
            <TextField
                label='Enter Todo'
                {...register('new-todo')}
            />
            <Button
                type="submit"
            >
                Add
            </Button>
        </form>
    )
}