import {
	render,
} from '@testing-library/react'

import App from '../pages/_app'
import Page from '../pages/index'

it('should render', async () => {
	const {container} = render(<App Component={Page} />)
	expect(container).toMatchSnapshot()
})