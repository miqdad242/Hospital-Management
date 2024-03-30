import Head from 'next/head'
import { Provider } from 'react-redux'
import dynamic from 'next/dynamic'
import store from '../components/store'
const App = dynamic(
  () => {
    return import("../components/App.js");
  },{
    ssr: false,
  }
);

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
        <App />
        </Provider>
      </main>
      <footer>
      </footer>
    </div>
  )
}
