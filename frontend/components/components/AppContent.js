import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
// routes config
import routes from '../routes'
import LoadingSpinner from './LoadingSpinner'
import { CContainer } from '@coreui/react-pro'

const AppContent = () => {
  return (
    <div style={{backgroundColor:'white'}}>
<CContainer fluid style={{ margin: 0 ,padding: 0,  width:'auto'  }} >
      <Suspense fallback={<LoadingSpinner/>}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
    </div>
    
  )
}

export default React.memo(AppContent)
