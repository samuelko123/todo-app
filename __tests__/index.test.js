import {
	render,
	screen,
	waitFor,
} from '@testing-library/react'
import {within} from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import App from '../pages/_app'
import Page from '../pages/index'

it('should render correctly', async () => {

	//============================================================
	
	// Arrange
	render(<App Component={Page} />)

	// Assert
	const textbox = screen.getByRole('textbox', { name: 'Enter New Todo' })
	expect(textbox).toHaveFocus()

	//============================================================

	// Arrange
	const todoText = 'Test Todo Item'
	const btnAdd = screen.getByRole('button', { name: 'Add' })

	// Assert - Before
	
	expect(btnAdd).toBeDisabled()

	// Action
	userEvent.type(textbox, todoText)

	// Assert - After
	await waitFor(() => {
		expect(btnAdd).not.toBeDisabled()
	})

	//============================================================

	// Arrange
	const list = screen.getByRole('list')

	// Assert - Before
	expect(list.children.length).toEqual(0)

	// Action
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
	const listItem = screen.getByText(todoText)

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
	const deleteBtn = screen.getByRole('button', { name: 'Delete' })

	// Assert - Before
	expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

	// Action
	userEvent.click(deleteBtn)

	// Assert - After
	await waitFor(() => {
		expect(screen.getByRole('dialog')).toHaveTextContent('Delete')
	})

	//============================================================

	// Arrange
	const deleteDialog01 = screen.getByRole('dialog')
	const cancelBtn = within(deleteDialog01).getByRole('button', { name: 'Cancel' })

	// Assert - Before
	expect(list.children.length).toEqual(1)

	// Action
	userEvent.click(cancelBtn)

	// Assert - After
	await waitFor(() => {
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
		expect(list.children.length).toEqual(1)
	})

	//============================================================

	// Arrange
	userEvent.click(deleteBtn)
	await waitFor(() => {
		expect(screen.getByRole('dialog')).toHaveTextContent('Delete')
	})
	const deleteDialog02 = screen.getByRole('dialog')
	const confirmBtn = within(deleteDialog02).getByRole('button', { name: 'Delete' })

	// Assert - Before
	expect(list.children.length).toEqual(1)

	// Action
	userEvent.click(confirmBtn)

	// Assert - After
	await waitFor(() => {
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
		expect(list.children.length).toEqual(0)
	})

	//============================================================
})