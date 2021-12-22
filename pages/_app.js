import {
  persistor,
  store,
} from '../app/store'

import { Layout } from '../components'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'

const App = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout title='Todo App'>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  )
}

export default App