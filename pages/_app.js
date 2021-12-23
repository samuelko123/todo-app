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
    background-color: ${props => props.theme.light};
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }
`

const theme = {
	primary: '#0d5257',
	light: '#f8f9fa',
	dark: '#215259',
	gray: '#808080',
	danger: '#dc3545',
	lightgray: 'rgba(0,0,0,0.125)',
}

const App = ({ Component, pageProps }) => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ThemeProvider theme={theme}>
					<Layout title='Todo App'>
						<GlobalStyle />
						<Component {...pageProps} />
					</Layout>
				</ThemeProvider>
			</PersistGate>
		</Provider>
	)
}

export default App