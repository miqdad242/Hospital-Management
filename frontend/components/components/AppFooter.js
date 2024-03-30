import React from 'react'
import { CFooter } from '@coreui/react-pro'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="https://www.21ccare.com" target="_blank" rel="noopener noreferrer">
        Systolic
        </a>
        <span className="ms-1">&copy; 2022 Systolic.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://www.21ccare.com" target="_blank" rel="noopener noreferrer">
          Systolic
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
