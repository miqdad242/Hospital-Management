// import App from 'next/app'
// import "@select-search.css";
import '../styles/scss/style.scss';
import "@fortawesome/fontawesome-free/css/all.min.css"
import '@glideapps/glide-data-grid/dist/index.css';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import "@toast-ui/editor/dist/toastui-editor.css";
function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
  }
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // MyApp.getInitialProps = async (appContext) => {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);
  //
  //   return { ...appProps }
  // }
  
  export default MyApp