import Head from 'next/head'
import dynamic from "next/dynamic";
import { Provider } from 'react-redux'
import store from '../components/store'
import Login  from '../components/views/auth/login/Login.js';

export default function Home({data}) {
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
        <Login />
        </Provider>
      </main>

      <footer>
      </footer>
    </div>
  )
}
export async function getServerSideProps() {
  let data = [];
  return { props: { data } };
}