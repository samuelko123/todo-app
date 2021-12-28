import {
	render,
	screen,
	waitFor,
} from '@testing-library/react'
import { within } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import App from '../pages/_app'
import Page from '../pages/index'
import { act } from 'react-dom/test-utils'

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

	// Action
	userEvent.click(cancelBtn)

	// Assert
	await waitFor(() => {
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
	})

	//============================================================

	// Arrange
	userEvent.click(deleteBtn)
	await waitFor(() => {
		expect(screen.getByRole('dialog')).toHaveTextContent('Delete')
	})
	const deleteDialog02 = screen.getByRole('dialog')
	const closeBtn = within(deleteDialog02).getByLabelText('Close')

	// Action
	userEvent.click(closeBtn)

	// Assert
	await waitFor(() => {
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
	})

	//============================================================

	// Arrange
	userEvent.click(deleteBtn)
	await waitFor(() => {
		expect(screen.getByRole('dialog')).toHaveTextContent('Delete')
	})
	const deleteDialog03 = screen.getByRole('dialog')
	const confirmBtn = within(deleteDialog03).getByRole('button', { name: 'Delete' })

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


it('should filter correctly', async () => {

	// Arrange
	const data = ['Test1', 'Test2', 'Test3', 'Test4', 'Test5']

	render(<App Component={Page} />)
	const textbox = screen.getByRole('textbox')
	const btnAdd = screen.getByRole('button', { name: 'Add' })
	const btnFilter = screen.getByRole('button', { name: 'Filter' })

	for (const text of data) {
		userEvent.type(textbox, text)
		await waitFor(() => {
			expect(btnAdd).not.toBeDisabled()
		})

		userEvent.click(btnAdd)
		await waitFor(() => {
			expect(textbox.textContent).toEqual('')
		})
	}

	const list = screen.getByRole('list')
	// Assert
	await waitFor(() => {
		expect(list.children.length).toEqual(5)
	})

	//============================================================

	// Action
	let checkboxes = screen.getAllByRole('checkbox')
	userEvent.click(checkboxes[0])
	userEvent.click(checkboxes[2])
	userEvent.click(checkboxes[4])

	// Assert
	await waitFor(() => {
		expect(list.children.length).toEqual(2)
	})

	checkboxes = screen.getAllByRole('checkbox')
	for(const checkbox of checkboxes){
		expect(checkbox).not.toBeChecked()
	}

	//============================================================

	// Action
	userEvent.click(btnFilter)
	const listbox01 = screen.getByRole('listbox')
	const option01 = within(listbox01).getByText(/All/i)
	act(() => {
		userEvent.click(option01)
	})

	// Assert
	await waitFor(() => {
		expect(list.children.length).toEqual(5)
		expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
	})

	//============================================================

	// Action
	userEvent.click(btnFilter)
	const listbox02 = screen.getByRole('listbox')
	const option02 = within(listbox02).getByText(/Completed/i)
	act(() => {
		userEvent.click(option02)
	})

	// Assert
	await waitFor(() => {
		expect(list.children.length).toEqual(3)
		expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
	})

	checkboxes = screen.getAllByRole('checkbox')
	for(const checkbox of checkboxes){
		expect(checkbox).toBeChecked()
	}
})