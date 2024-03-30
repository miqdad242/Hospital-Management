import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Provider } from 'react-redux'
import store from '../components/store'
import {useRouter} from 'next/router';
import routes from '../components/routes';

const  App  = dynamic(
  () => {
    return import("../components/App.js");
  },{
    ssr: false,
  }
);
const  Page404  = dynamic(
  () => {
    return import("../components/views/auth/page404/Page404");
  },{
    ssr: false,
  }
);
export default function Home() {
  const router = useRouter()
  let haspath = routes.map(x=>x.path).includes(router.asPath.split('?')[0])
  return (
    <div>
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
         {haspath ? <App /> : <Page404/>} 
         </Provider>
      </main>

      <footer>
      </footer>
    </div>
  )
}
