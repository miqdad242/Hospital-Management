import React, { Component, Suspense } from 'react'
import { BrowserRouter , Route, Routes,Navigate } from 'react-router-dom'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
const Login = React.lazy(() => import('./views/auth/login/Login'))


class App extends Component {
  render() {
    return (
      <BrowserRouter >
        <Suspense fallback={loading}>
          <Routes>
            <Route path="/" name="Home" element= {<Navigate replace to="/dashboard"/>} />
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route path="/*" name="Dashboard" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    )
  }
}

export default App
