/*eslint-disable*/
import { React, useState, useRef } from 'react'
import api from '../../../api'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText, CToaster,
  CRow, CToast, CToastBody, CToastClose, CFormSelect
} from '@coreui/react-pro'
import { CiLock, CiUser, CiSun, CiLocationArrow1, CiLocationOn, CiHospital1 } from 'react-icons/ci'
import { useRouter } from 'next/router'
import ToastError from '../../../components/ToastError'

function Login() {
  const router = useRouter()
  const [loginId, setLoginId] = useState('')
  const [password, setPassword] = useState('')
  const [location, setLocation] = useState('')
  const [hospital, setHospital] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedHospital, setSelectedHospital] = useState('')
  const [toast, addToast] = useState(0)
  const toaster = useRef()
  const [show, setShow] = useState(false)

  const showText = (e) => {
    if (show === false) {
      setShow(true)

    } else if (show === true) {
      setShow(false)
    }
  }

  const fetchUserLocationData= async(user_id)=>{
    let { data, status, statusText } = await api.get('/api/user/location', {
      params: { user_id: user_id}
  });
 
  if (status === 200) {
      let response = data.message;
      if (data.status === true) {
          let values = data.payload.data;
          setLocation(values);
      } else {
          // let toastFailMsg = (<ToastError response={response} />);
          //  addToast(toastFailMsg);
          console.log("err")
      }
  } else {
      let response = data.message;
      let toastFailMsg = (<ToastError response={response} />);
      addToast(toastFailMsg);
  }
  }


  const fetchUserWorkingHospitalData= async(user_id)=>{
    let { data, status, statusText } = await api.get('/api/user/workinghospital', {
      params: { user_id: user_id}
  });
 
  if (status === 200) {
      let response = data.message;
      if (data.status === true) {
          let values = data.payload.data;
          setHospital(values);
      } else {
          // let toastFailMsg = (<ToastError response={response} />);
          //  addToast(toastFailMsg);
          console.log("err")
      }
  } else {
      let response = data.message;
      let toastFailMsg = (<ToastError response={response} />);
      addToast(toastFailMsg);
  }
  }

  const submitViaEnterButton =(e)=>{
    if(e.type==='keypress'){
      if(e.which === 13) {
        e.preventDefault();
         onSubmit()
        return false;
      }
    } else{
      return 
    }
    
  }
  const userOnchange=(e)=>{
    let user = e.target.value
    setLoginId(user)
    fetchUserLocationData(user)
    fetchUserWorkingHospitalData(user)
  }
  const locationChange=(e)=>{
    let p = e.target.value
    setSelectedLocation(p)

  }
  const hospitalChange=(e)=>{
    let p = e.target.value
    setSelectedHospital(p)

  }

  const onSubmit = (e) => {
    let loginForm = document.getElementById('LoginForm');
    let formData = new FormData(loginForm);
    let json = JSON.stringify(Object.fromEntries(formData));
    api.post('/api/login', json).then(({ data, status, statusText }) => {
      console.log(data)
      if (status === 200) {
        let response = (data.message);
        if (data.status === true) {
          let toastSuccessMsg = (
            <CToast autohide={true} delay={2000} visible={true} color="success" className="text-white align-items-center">
              <div className="d-flex">
                <CToastBody>{response}</CToastBody>
                <CToastClose className="me-2 m-auto" white />
              </div>
            </CToast>);
          addToast(toastSuccessMsg);
          setTimeout(()=>{router.push('/dashboard')}, 3000);
        } else {
          let toastFailMsg = (
            <CToast autohide={true}  delay={2000} visible={true} color="danger" className="text-white align-items-center">
              <div className="d-flex">
                <CToastBody>{response}</CToastBody>
                <CToastClose className="me-2 m-auto" white />
              </div>
            </CToast>);
        addToast(toastFailMsg);
        }
      } else {
        let response = (data.message);
        let toastFailMsg = (
          <CToast autohide={true}  delay={2000} visible={true} color="danger" className="text-white align-items-center">
            <div className="d-flex">
              <CToastBody>{response}</CToastBody>
              <CToastClose className="me-2 m-auto" white />
            </div>
          </CToast>);
        addToast(toastFailMsg);
      }
    })
  }

  return (
    <>
      <CToaster ref={toaster} push={toast} className='toaster toast-container p-3 position-fixed top-0 start-50 translate-middle-x' />
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center m-0 p-0">
        <CContainer>
          <CRow className="justify-content-center m-0 p-0">
            <CCol md={5}>
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm id='LoginForm' >
                      <h1>Login</h1>
                      <p className="text-medium-emphasis">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CiUser />
                        </CInputGroupText>
                        <CFormInput name="user_name" placeholder="Username" value={loginId} onChange={userOnchange} />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText onClick={showText}>
                          {show ? <CiSun /> : <CiLock />}
                        </CInputGroupText>
                        <CFormInput
                          name="password"
                          type={show ? "text" : "password"}
                          placeholder="Password"
                          value={password} onChange={e => setPassword(e.target.value)}
                          valid={false} required
                          onKeyPress={(e)=>submitViaEnterButton(e)}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText onClick={showText}>
                          {show ? <CiSun /> : <CiHospital1 />}
                        </CInputGroupText>
                        <CFormSelect
                        aria-label="Default select example"
            value={selectedHospital}
            onChange={hospitalChange}
            name='working_hospital'
            
          >{hospital == "" && 
          <option value='' disabled selected>
              Hospital
            </option>
          }
            {hospital && 
            hospital.map((hospital) => (
              <option key={hospital.working_hospital} value={hospital.working_hospital}>
                {hospital.working_hospital}
              </option>
            ))
          }
          </CFormSelect>
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText onClick={showText}>
                          {show ? <CiSun /> : <CiLocationOn />}
                        </CInputGroupText>
                        <CFormSelect
                        aria-label="Default select example"
            value={selectedLocation}
            onChange={locationChange}
            name='location'
            
          >{location == "" && 
          <option value='' disabled selected>
              Location
            </option>
          }
            {location && 
            location.map((location) => (
              <option key={location.location_code} value={location.location_code}>
                {location.location_name}
              </option>
            ))
          }
          </CFormSelect>
                      </CInputGroup>
                      
                      <CRow>
                        <CCol xs={6}>
                          <CButton color="primary" onClick={e => onSubmit(e.target.value)} className="px-4">Login</CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  )
}

export default Login
