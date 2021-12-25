import {
	render,
	screen,
	waitFor,
} from '@testing-library/react'

import App from '../pages/_app'
import Page from '../pages/index'
import userEvent from '@testing-library/user-event'

it('should render correctly', async () => {
	// Snapshot test
	const { container } = render(<App Component={Page} />)
	expect(container).toMatchSnapshot()

	//============================================================

	// Arrange
	const todoText = 'Test Todo Item'
	const list = screen.getByRole('list')
	const textbox = screen.getByRole('textbox', { name: 'Enter New Todo' })
	const btnAdd = screen.getByRole('button', { name: 'Add' })

	// Assert - Before
	expect(list.children.length).toEqual(0)

	// Action
	userEvent.type(textbox, todoText)
	userEvent.click(btnAdd)

	// Assert - After
	await waitFor(() => {
		// Expect textbox to be cleared
		expect(textbox.textContent).toEqual('')

		// Expect 1 item in TodoList
		expect(list.children.length).toEqual(1)
		expect(list.children[0]).toHaveTextContent(todoText)
	})

	//============================================================

	// Arrange
	const checkbox = screen.getByRole('checkbox', 'Complete Todo')
	const listItem = screen.getByRole('listitemtext', todoText)

	// Assert - Before
	expect(checkbox).not.toBeChecked()
	expect(listItem).toHaveStyle('text-decoration: none')

	// Action #1
	userEvent.click(checkbox)

	// Assert #1
	await waitFor(() => {
		expect(checkbox).toBeChecked()
		expect(listItem).toHaveStyle('text-decoration: line-through')
	})

	// Action #2
	userEvent.click(checkbox)

	// Assert #2
	await waitFor(() => {
		expect(checkbox).not.toBeChecked()
		expect(listItem).toHaveStyle('text-decoration: none')
	})

	//============================================================

	// Arrange
	const btnDelete = screen.getByRole('button', { name: 'Delete' })

	// Action
	userEvent.click(btnDelete)

	// Assert
	await waitFor(() => {
		expect(list.children.length).toEqual(0)
	})

	//============================================================
})