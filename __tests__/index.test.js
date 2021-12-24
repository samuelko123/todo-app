import {
	render,
	screen,
} from '@testing-library/react'

import App from '../pages/_app'
import Page from '../pages/index'

it('should render', async () => {
	const {container} = render(<App Component={Page} />)
	expect(container).toMatchSnapshot()
	// const header = screen.getByRole('header')
	// const main = screen.getByRole('main')
	// const textField = screen.getByRole('textbox', { name: 'Enter New Todo' })
	// const button = screen.getByRole('button', { name: 'Add' })

	// expect(header).toBeInTheDocument()
	// expect(main).toBeInTheDocument()
	// expect(textField).toBeInTheDocument()
	// expect(button).toBeInTheDocument()
})