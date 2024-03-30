import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import api from '../api'
import LoadingSpinner from '../components/LoadingSpinner'
import { CContainer } from '@coreui/react-pro'

const DefaultLayout = () => {

  const [isLoading, setLoading] = React.useState(true);
  const [allow, setAllow] = React.useState(false);
  const router = useRouter();

  useEffect(() => {
    api.get('/api/validate').then(({ data, status, statusText }) => {
      setLoading(false);
      if (status === 200) {
        setAllow(true);
      } else {
        router.push('/login')
      }
    });
  }, []);

  if (isLoading) {
    return (<>
      <LoadingSpinner/></>)
  }

  if (allow) {
    return (
      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light ">
          <AppHeader />
          <div className="body flex-grow-1 p-0 m-0 ">
            <AppContent />
          </div>
          <AppFooter />
        </div>
      </div>
    )
  }
}

export default DefaultLayout
