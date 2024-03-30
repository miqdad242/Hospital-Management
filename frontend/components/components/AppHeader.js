import React from 'react'
import { useLocation } from 'react-router-dom'
import routes from '../routes'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react-pro'
import { BiMenu } from 'react-icons/bi'

import { AppHeaderDropdown } from './header/index'
import { useEffect } from 'react'
import { useState } from 'react'

const AppHeader = () => {
  const dispatch = useDispatch()
  const location = useLocation();
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const [path,setPath] = useState();
  const headerStyle = {
    minHeight: "2rem",
  };
  useEffect(()=>{
    let p = location.pathname
    let t = routes.find((x)=> x.path === p)
    if(t !== undefined){
    let q = t.name
    setPath(q)
    }
  },[location])
  return (
    <CHeader position="sticky" className="p-0 m-0" style={headerStyle}>
      <CContainer  fluid>
        <CHeaderToggler
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <BiMenu/>
        </CHeaderToggler>
        <CHeaderNav className="d-none d-sm-flex me-auto p-0 m-0">
          <CNavItem>
            <CNavLink>
              {path}
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        
        <CHeaderNav>
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
