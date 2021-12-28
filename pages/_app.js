import {
	persistor,
	store,
} from '../app/store'

import { Layout } from '../components'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'

import {
	ThemeProvider,
	createGlobalStyle,
} from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    padding: 0;
    margin: 0;
    background-color: ${props => props.theme.background};
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }
`

const theme = {
	brand: '#0d5257',
	background: '#eeeeee',
	btnText: '#eeeeee',
	cancel: '#808080',
	delete: '#bb0000',
	hover: 'rgba(0,0,0,0.2)',
	border: 'rgba(0,0,0,0.25)',
}

export const Wrapper = (props) => {
	const {
		store,
		children,
	} = props

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ThemeProvider theme={theme}>
					<Layout title='Todo App'>
						<GlobalStyle />
						{children}
					</Layout>
				</ThemeProvider>
			</PersistGate>
		</Provider>
	)
}

const App = ({
	Component,
	pageProps,
}) => {
	return (
		<Wrapper store={store}>
			<Component {...pageProps} />
		</Wrapper>
	)
}

export default App