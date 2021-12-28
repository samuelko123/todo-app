import {
	render,
	screen,
	waitFor,
	cleanup,
} from '@testing-library/react'
import { within } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'

import { Wrapper } from '../../pages/_app'
import Page from '../../pages/index'

describe('Home Page', () => {
	beforeEach(async () => {
		jest.resetModules()
		localStorage.clear()

		const { store } = require('../../app/store')
		render(
			<Wrapper store={store}>
				<Page />
			</Wrapper>
		)
	})

	it('should render correctly', async () => {
		// Assert
		const textbox = screen.getByRole('textbox', { name: 'Enter New Todo' })
		expect(textbox).toHaveFocus()

		const btnAdd = screen.getByRole('button', { name: 'Add' })
		expect(btnAdd).toBeDisabled()

		const list = screen.getByRole('list')
		expect(list.children.length).toEqual(0)

		expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
	})

	it('should enable "Add" button when typing', async () => {
		// Arrange
		const textbox = screen.getByRole('textbox', { name: 'Enter New Todo' })
		const btnAdd = screen.getByRole('button', { name: 'Add' })
		const todoText = 'Test Todo Item'

		// Action
		userEvent.type(textbox, todoText)

		// Assert - After
		await waitFor(() => {
			expect(btnAdd).not.toBeDisabled()
		})
	})

	it('should add item to list when clicking "Add" button', async () => {
		// Arrange
		const textbox = screen.getByRole('textbox', { name: 'Enter New Todo' })
		const btnAdd = screen.getByRole('button', { name: 'Add' })
		const list = screen.getByRole('list')
		const todoText = 'Test Todo Item'

		// Action
		userEvent.type(textbox, todoText)
		await waitFor(() => {
			expect(btnAdd).not.toBeDisabled()
		})

		userEvent.click(btnAdd)
		await waitFor(() => {
			expect(textbox.textContent).toEqual('')
		})

		// Assert
		await waitFor(() => {
			expect(list.children.length).toEqual(1)
			expect(list.children[0]).toHaveTextContent(todoText)
			expect(textbox.textContent).toEqual('')
		})
	})

	it('should remove item from list when clicking "Delete" button in dialog', async () => {
		// Arrange
		const textbox = screen.getByRole('textbox', { name: 'Enter New Todo' })
		const btnAdd = screen.getByRole('button', { name: 'Add' })
		const list = screen.getByRole('list')

		const data = ['Test1', 'Test2']
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

		const deleteBtn = screen.getAllByRole('button', { name: 'Delete' })[0]
		userEvent.click(deleteBtn)
		await waitFor(() => {
			expect(screen.getByRole('dialog')).toHaveTextContent('Delete')
		})
		const deleteDialog = screen.getByRole('dialog')
		const confirmBtn = within(deleteDialog).getByRole('button', { name: 'Delete' })

		// Action
		userEvent.click(confirmBtn)

		// Assert
		await waitFor(() => {
			expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
			expect(list.children.length).toEqual(1)
		})
	})


	it('should filter correctly', async () => {
		let checkboxes
		let listbox
		let option

		// Arrange
		const textbox = screen.getByRole('textbox')
		const btnAdd = screen.getByRole('button', { name: 'Add' })
		const btnFilter = screen.getByRole('button', { name: 'Filter' })
		const list = screen.getByRole('list')

		const data = ['Test1', 'Test2', 'Test3', 'Test4', 'Test5']
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

		checkboxes = screen.getAllByRole('checkbox')
		userEvent.click(checkboxes[0])
		userEvent.click(checkboxes[2])
		userEvent.click(checkboxes[4])

		/* Status - All */

		// Action
		userEvent.click(btnFilter)
		listbox = screen.getByRole('listbox')
		option = within(listbox).getByText(/All/i)
		act(() => {
			userEvent.click(option)
		})

		// Assert
		await waitFor(() => {
			expect(list.children.length).toEqual(5)
			expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
		})

		/* Status - Active */

		// Action
		userEvent.click(btnFilter)
		listbox = screen.getByRole('listbox')
		option = within(listbox).getByText(/Active/i)
		act(() => {
			userEvent.click(option)
		})

		// Assert
		await waitFor(() => {
			expect(list.children.length).toEqual(2)
		})

		checkboxes = screen.getAllByRole('checkbox')
		for (const checkbox of checkboxes) {
			expect(checkbox).not.toBeChecked()
		}

		/* Status - Completed */

		// Action
		userEvent.click(btnFilter)
		listbox = screen.getByRole('listbox')
		option = within(listbox).getByText(/Completed/i)
		act(() => {
			userEvent.click(option)
		})

		// Assert
		await waitFor(() => {
			expect(list.children.length).toEqual(3)
			expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
		})

		checkboxes = screen.getAllByRole('checkbox')
		for (const checkbox of checkboxes) {
			expect(checkbox).toBeChecked()
		}
	})
})