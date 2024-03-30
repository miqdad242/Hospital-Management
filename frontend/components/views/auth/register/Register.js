/* eslint-disable */
import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,CFormLabel,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormTextarea,CProgress,
  CProgressBar
} from '@coreui/react-pro'
import { BsAsterisk} from 'react-icons/bs'
import {CiSun } from 'react-icons/ci'

function Register() {
  const [fullname, setFullname] = useState()
  const [department, setDepartment] = useState()
  const [password, setPassword] = useState()
  const [repassword, setReassword] = useState()
  const [mobile, setMobile] = useState()
  const [tell, setTell] = useState()
  const [mail, setMail] = useState()
  const [address, setAddress] = useState()
  const [logid, setLoginId] = useState()
  const [compare, setCompare] = useState(false)
  const [id, setId] = useState()

  const [showPassword, setshowPassword] = useState(false)
  const [showPrograss, setshowPrograss] = useState(false)

  const passwordCompare = () => {
    if (password === repassword) {
         setCompare(true)
    } else {
      setCompare(false)
    }
  }
  const readAndHide = () => {
    if (showPassword === false) {
      setshowPassword(true)
      
    } else if (showPassword === true) {
        setshowPassword(false)
    }
       
  }
  //
  return (
    <>
      <CContainer>
      <CRow>
        <CCol>
        <CRow className='m-1 p2'>
          {/* <CCard> */}
          {/* <CFormLabel htmlFor="staticEmail" className="m-1">CreateUser</CFormLabel> */}
            {/* <CCardBody className='pt-0 m-0'> */}
                <CCol lg={12} >
                        <div className='d-flex'>
                          <CCol md={2} className='m-0 p-0'>
                              <CFormLabel htmlFor="staticEmail" className="m-1">Fullname</CFormLabel>
                          </CCol> 
                          <CCol md={10} >
                              <CFormInput placeholder="Fullname"  size="sm"  value={fullname} onChange={e => setFullname(e.target.value)}/>
                          </CCol>
                        </div>
              
                        <div className='d-flex'>
                              <CCol md={2} className='m-0 p-0'>
                              <CFormLabel htmlFor="staticEmail" className="m-1">Username</CFormLabel>
                              </CCol> 
                              <CCol md={4} className='m-0 p-0'>
                              <CFormInput placeholder="Login Id" size="sm"  value={logid} onChange={e => setLoginId(e.target.value)}required maxLength={20}/>
                              </CCol>
                              <CCol md={2} className='m-0 pl-2'>
                              <CFormLabel htmlFor="staticEmail" className="m-1 pl-1">Mobile</CFormLabel>   
                              </CCol>
                              <CCol md={4} className='m-0 p-0'>
                              <CFormInput placeholder="Phone"  size="sm"  value={mobile} onChange={e => setMobile(e.target.value)} required maxLength={25} />
                              </CCol>
                        </div>
                     
                        <div className='d-flex'>
                          <CCol md={2}>
                          <CFormLabel htmlFor="staticEmail" className="m-1">E-Mail</CFormLabel>
                          </CCol>
                          <CCol md={4}>
                          <CFormInput type="mail" placeholder="E-Mail" size="sm" value={mail} onChange={e=>setMail(e.target.value)} />
                          </CCol>
                          <CCol md={2}>
                          <CFormLabel htmlFor="staticEmail" className="m-1">Telphone</CFormLabel>  
                          </CCol>
                          <CCol md={4}>
                          <CFormInput placeholder="Telphone" size="sm" value={tell} onChange={e => setTell(e.target.value)} required maxLength={25}/>
                          </CCol>
                        </div>

                        <div className='d-flex'>
                          <CCol md={2}>
                          <CFormLabel htmlFor="staticEmail" className="m-1">Address</CFormLabel>  
                          </CCol>
                          <CCol md={4}>      
                           <CFormTextarea  size="sm" value={address} onChange={e => setAddress(e.target.value)}/>
                          </CCol>
                          <CCol md={2}>
                          <CFormLabel htmlFor="staticEmail" className="m-1">Department</CFormLabel>  
                          </CCol>
                          <CCol md={4}>      
                          <CFormSelect size="sm" value={department} />
                          </CCol>
                        </div>

                        <div className='d-flex'>
                          <CCol md={2}>
                          <CFormLabel htmlFor="staticEmail" className="m-1">Password</CFormLabel>  
                          </CCol>
                          <CCol md={4}>  
                          <CInputGroup>   
                          <CFormInput type={showPassword ? "text":"password"} size="sm" placeholder="Password"  value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            maxLength={16}
                          />
                          { showPrograss ?
                          <CProgress className="mb-3">
                          <CProgressBar value={15} />
                          <CProgressBar color="success" value={30} />
                          <CProgressBar color="info" value={20} />
                        </CProgress> : <div></div>}
                        <CInputGroupText onClick={readAndHide}  color="success">{ showPassword ? <BsAsterisk/>:<CiSun/>}</CInputGroupText>
                        </CInputGroup> 
                          </CCol>
                          <CCol md={2}>
                          <CFormLabel htmlFor="staticEmail" className="m-1">Re Password</CFormLabel>  
                          </CCol>
                          <CCol md={4} > 
                          <CInputGroup className="has-validation d-flex">  

                          <CFormInput type={showPassword ? "text":"password"} size="sm" placeholder="Repeat password" value={repassword}
                            onChange={e => setReassword(e.target.value)} onClick={passwordCompare}
                            required
                            maxLength={16}/ >
                            <CInputGroupText onClick={readAndHide}  color="success">{ showPassword ? <BsAsterisk/>:<CiSun/>}</CInputGroupText>
                          </CInputGroup>
                          { showPrograss ?
                          <CProgress className="mb-3">
                            <CProgressBar value={15} />
                            <CProgressBar color="success" value={30} />
                            <CProgressBar color="info" value={20} />
                          </CProgress>:<div></div>}
                          </CCol>
                        </div>
                        <div className='d-flex m-2'>
                          <CCol md={4}> </CCol>
                          <CCol md={4}>
                            <CButton>Reset</CButton>  <CButton>{id ? 'Update':'Add'}</CButton> <CButton>Back</CButton>
                          </CCol>
                          <CCol md={4}></CCol>
                        </div>
                
                </CCol>   
        </CRow>
        
        </CCol>
      </CRow>
      </CContainer>
    </>
  )
}

export default Register
