import {
	TodoFilter,
	TodoForm,
	TodoList,
} from '../components'

const Page = () => {
	return (
		<>
			<TodoForm />
			<TodoFilter />
			<TodoList />
		</>
	)
}

export default Page