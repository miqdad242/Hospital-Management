import Head from 'next/head'
import { Provider } from 'react-redux'
import store from '../components/store'
import Page500 from '../components/views/auth/page500/Page500.js'

export default function Home() {
  return (
    <div >
      <Head>
        <title>HIS Systolic System</title>
        <meta name="description" content="HIS Systolic System" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
        <noscript>
        You need to enable JavaScript to run this app.
        </noscript>
        <Provider store={store}>
        <Page500 />
        </Provider>
      </main>

      <footer>
      </footer>
    </div>
  )
}
