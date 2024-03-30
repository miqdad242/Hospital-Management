import React, { useState, useRef, useEffect } from 'react'
import DataEditor, {
    GridCell,
    GridCellKind,
    GridColumn,
    NumberCell,
    Theme
} from "@glideapps/glide-data-grid";
import {
    GrNewWindow
} from 'react-icons/gr'
import { BsPlusCircle } from "react-icons/bs";
import api from "../../../api";
import {
    CRow,
    CCol,
    CFormCheck,
    CForm,
    CFormInput,
    CFormLabel,
    CCard,
    CCardBody, CFormSelect, CFormSwitch,
    CToast, CInputGroup, CInputGroupText,
    CToastBody,
    CButton,
    CCardHeader,
    CToastClose,
    CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter,
    CToaster,
    CFormTextarea,
    CNav, CNavLink, CNavItem, CTabContent, CTabPane
} from '@coreui/react-pro'
import ToastError from '../../../components/ToastError';
import ToastSuccess from '../../../components/ToastSuccess';
import Select from '../../../components/Select';
import DataGrid from '../../../components/DataGrid';
import { useSearchParams } from 'react-router-dom';
// import {IoMdArrowRoundBack,IoArrowBackCircleOutline} from "react-icons/io5";
import {IoMdArrowRoundBack} from "react-icons/io";
import { useNavigate } from "react-router-dom";

import { size } from 'lodash';


const Index = () => {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false)
    const [Doctor_Header, setHeader] = useState({})
    const [toast, addToast] = useState(0)
    const [doctorgroupCode, setdoctorgroupCode] = useState([]);
    const [selectOption, setSelectOption] = useState();
    const toaster = useRef();
    const formHeader = useRef();
    
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get('id');
      

    const onSubmit = async() =>{
        const formElement = document.querySelector("#FormHeader");
        if (formElement.checkValidity() === true) {
            let form  =  Doctor_Header
            if(form.area_code == null || form.area_code == '' ){
                // POST (Create a New record) !!
                let { data, status, statusText } = await api.post(`/api/doctor`,form)
                if (status === 200) {
                    let response = (data.message);
                    if (data.status === true) {
                        let toastFailMsg = (<ToastSuccess response={response} />);
                        addToast(toastFailMsg);
                        setTimeout(function(){
                            locationDirect()
                    }, 2000);
                    } else {
                        let toastFailMsg = (<ToastError response={response} />);
                        addToast(toastFailMsg);
                    }
                }else{
                    // 
                }
            }else{
                // PUT (Update a record) !!
                let { data, status, statusText } = await api.post(`/api/doctor`,form)
                if (status === 200) {
                    let response = (data.message);
                    if (data.status === true) {
                        let toastFailMsg = (<ToastSuccess response={response} />);
                        addToast(toastFailMsg);
                        setTimeout(function(){
                            locationDirect()
                    }, 2000);
                    } else {
                        let toastFailMsg = (<ToastError response={response} />);
                        addToast(toastFailMsg);
                    }
                }else{
                    // 
                }

            }   
        }
        setValidated(true)  
    }


    const fetchdoctorgroupCodes = async () => {
        try {
          const response = await api.get("api/doctor_groupes_name");
          console.log("hello world");
          console.log(response);
          const data = response.data.payload.data;
          console.log(data);
          setdoctorgroupCode(data);
        } catch (error) {
          console.error("Error fetching department codes:", error);
        }
      };




    const locationDirect = () => {
        navigate('/master/doctor');
      }
    const loadField = (obj)=>{
        let data = {}
        for(let i = 0; i < obj.length; i++){
            data.doctor_code    =   obj[i].doctor_code;
            data.doctor_name    =   obj[i].doctor_name;
            data.doctor_group_id =obj[i].doctor_group_id;
            data.address   =   obj[i].address;
            data.active  = obj[i].active;
            data.resident = obj[i].resident ;
            data.telephone=obj[i].telephone;
            data.mobile=obj[i].mobile;
            data.resident=obj[i].resident;
            data.doctor_nic=obj[i].doctor_nic;
            data.doctor_birthday=obj[i].doctor_birthday;

        }

        setHeader(data)
        
      }


      const fetchProfile = async(id) => {
        if(id === null){
            // 
        }else {
            id  = id.trim()
                let { data, status, statusText } = await api.get(`/api/getbyid/${id}`)
            if (status === 200) {
                let response = (data.message);
                if (data.status === true) {
                    let areaObj = data.payload.data
                    loadField(areaObj);
                } else {
                    let toastFailMsg = (<ToastError response={response} />);
                    addToast(toastFailMsg);
                }
            } else {
                let response = (data.message);
                let toastFailMsg = (<ToastSuccess response={response} />);
                addToast(toastFailMsg);
            }
        }
       
    }

    useEffect(()=>{
        if(id === null){
            fetchdoctorgroupCodes()
            // 
        }else{
            fetchProfile(id)
            fetchdoctorgroupCodes()
        }
    },[])


    return (
        <>
            <CToaster ref={toaster} push={toast} className='toaster toast-container p-3 position-fixed top-0 start-50 translate-middle-x' />
            <CCard className='m-4'>
                <CCardHeader className='pt-1 pb-1'>
                    <CRow className="align-items-center">
                        <CCol md={1} lg={1} className='fs-2 d-flex h-100 ps-4'> 
                            <IoMdArrowRoundBack style={{ fontSize: '24px', cursor:'pointer' }} onClick= {()=>{window.history.back();}}/>
                        </CCol>
                        <CCol md={7}> 
                            <CFormLabel className="col-form-label fs-4">Doctor</CFormLabel>
                        </CCol>
                        <CCol md={4} className='text-end pe-5'>
                            <CButton type="button" className="col-md-3 col-form-label fs-6" color="success" variant='outline' onClick={() => { onSubmit(); }} >{id ===null ? 'Add':'Update'}</CButton>
                        </CCol>
                    </CRow>
                </CCardHeader>
                <CCardBody style={{padding:'2rem'}}>
                    <CForm ref={formHeader} id="FormHeader" className='needs-validation' noValidate validated={validated}>
                        <CRow className="mb-3">
                            <CCol md={2} className=' col-form-label'>
                            <CFormLabel style={{ width: '220px' }} >Doctor code</CFormLabel>
                            </CCol>
                            <CCol md={3}> 
                                <CFormInput inline="true" readOnly 
                                    type="text"
                                    name="doctor_group_code"
                                    value={Doctor_Header.doctor_code}
                                    onChange={({ target }) => { let p = { ...Doctor_Header }; p["doctor_code"] = (target.value); setHeader(p); }}
                                />
                            </CCol>
                            </CRow>
                            <CRow className="mb-3">
                            <CCol md={2} className=' col-form-label'>
                            <CFormLabel style={{ width: '220px' }} >Doctor name</CFormLabel>
                            </CCol>
                            <CCol md={3}>
                                <CFormInput inline="true"
                                    type="text"
                                    name="doctor_group_name"
                                    value={Doctor_Header.doctor_name}
                                    required
                                    onChange={({ target }) => { let p = { ...Doctor_Header}; p["doctor_name"] = (target.value.trimStart()); setHeader(p); }}
                                    feedbackInvalid="Doctor Groupe Name Is Required."
                                />
                            </CCol>
                            </CRow>

                            <CRow className="mb-3">
                            <CCol md={2} className=' col-form-label'>
                            <CFormLabel style={{ width: '220px' }} >Address</CFormLabel>
                            </CCol>
                            <CCol md={3}>
                                <CFormInput inline="true"
                                    type="text"
                                    name="address"
                                    value={Doctor_Header.address}
                                    required
                                    onChange={({ target }) => { let p = { ...Doctor_Header}; p["address"] = (target.value.trimStart()); setHeader(p); }}
                                    feedbackInvalid="Doctor Groupe Name Is Required."
                                />
                            </CCol>
                            </CRow>

                            <CRow className="mb-3">
                            <CCol md={2} className=' col-form-label'>
                            <CFormLabel style={{ width: '220px' }} >Telephone Number</CFormLabel>
                            </CCol>
                            <CCol md={3}>
                                <CFormInput inline="true"
                                    type="text"
                                    name="telephone"
                                    value={Doctor_Header.telephone}
                                    required
                                    onChange={({ target }) => { let p = { ...Doctor_Header}; p["telephone"] = (target.value.trimStart()); setHeader(p); }}
                                    feedbackInvalid="Doctor Groupe Name Is Required."
                                />
                            </CCol>
                            </CRow>


                            <CRow className="mb-3">
                            <CCol md={2} className=' col-form-label'>
                            <CFormLabel style={{ width: '220px' }} >Mobile Number</CFormLabel>
                            </CCol>
                            <CCol md={3}>
                                <CFormInput inline="true"
                                    type="text"
                                    name="mobile"
                                    value={Doctor_Header.mobile}
                                    required
                                    onChange={({ target }) => { let p = { ...Doctor_Header}; p["mobile"] = (target.value.trimStart()); setHeader(p); }}
                                    feedbackInvalid="Doctor Groupe Name Is Required."
                                />
                            </CCol>
                            </CRow>




                            <CRow className="mb-3">
                            <CCol md={2} className=' col-form-label'>
                            <CFormLabel style={{ width: '220px' }} >Doctor NIC</CFormLabel>
                            </CCol>
                            <CCol md={3}>
                                <CFormInput inline="true"
                                    type="text"
                                    name="doctor_nic"
                                    value={Doctor_Header.doctor_nic}
                                    required
                                    onChange={({ target }) => { let p = { ...Doctor_Header}; p["doctor_nic"] = (target.value.trimStart()); setHeader(p); }}
                                    feedbackInvalid="Doctor Groupe Name Is Required."
                                />
                            </CCol>
                            </CRow>


                            <CRow className="mb-3">
                            <CCol md={2} className=' col-form-label'>
                            <CFormLabel style={{ width: '220px' }} >Doctor Birthday</CFormLabel>
                            </CCol>
                            <CCol md={3}>
                                <CFormInput inline="true"
                                    type="text"
                                    name="doctor_birthday"
                                    value={Doctor_Header.doctor_birthday}
                                    required
                                    onChange={({ target }) => { let p = { ...Doctor_Header}; p["doctor_birthday"] = (target.value.trimStart()); setHeader(p); }}
                                    feedbackInvalid="Doctor Groupe Name Is Required."
                                />
                            </CCol>
                            </CRow>

  <CRow className="mb-3">
  <CCol md={2} className="col-form-label">
    <CFormLabel style={{ width: '220px' }}>Active</CFormLabel>
  </CCol>
  <CCol md={3}>
    <div>
      <CFormSwitch size="xl"
        inline
        name="active"
        checked={Doctor_Header.active}
        // id="yes"
        // label="Yes"
        onChange={({target}) => {
          console.log(target);
          let p = { ...Doctor_Header };
          p["active"] =  target.checked;
          setHeader(p);
        }}
      />
    </div>
  </CCol>
</CRow>


<CRow className="mb-3">
  <CCol md={2} className="col-form-label">
    <CFormLabel style={{ width: '220px' }}>Resident</CFormLabel>
  </CCol>
  <CCol md={3}>
    <div>
      <CFormSwitch size="xl"
        inline
        name="resident"
        checked={Doctor_Header.resident}
        // id="yes"
        // label="Yes"
        onChange={({target}) => {
          console.log(target);
          let p = { ...Doctor_Header };
          p["resident"] =target.checked;
          setHeader(p);
        }}
      />
    </div>
  </CCol>
</CRow>


{/* <CRow className="mb-3">
  <CCol md={2} className="col-form-label">
    <CFormLabel style={{ width: '220px' }}>Resident</CFormLabel>
  </CCol>
  <CCol md={3}>
    <div>
      <CFormCheck
        inline
        type="radio"
        name="resident"
        id="yes"
        label="Yes"
        checked={Doctor_Header.resident === 'True'}
        onChange={() => {
          let p = { ...Doctor_Header };
          p["resident"] = 'True';
          setHeader(p);
        }}
      />
      <CFormCheck
        inline
        type="radio"
        name="resident"
        id="no"
        label="No"
        checked={Doctor_Header.resident === 'No'}
        onChange={() => {
          let p = { ...Doctor_Header };
          p["resident"] = 'No';
          setHeader(p);
        }}
      />
    </div>
  </CCol>
</CRow> */}


              <CRow>
              <CCol md={2} className=" col-form-label">
                <CFormLabel>Doctor Groupe Name</CFormLabel>
              </CCol>
              <CCol>
                <CFormSelect
                  inline={true}
                  required
                  name="department_id"
                  value={Doctor_Header.doctor_group_id}
                  onChange={({ target }) => {
                    let p = { ...Doctor_Header };
                    p["doctor_group_id"] = target.value.trimStart();
                    setHeader(p);
                  }}
                  feedbackInvalid="Department ID Is Required."
                >
                  <option value="">Select doctor groupe</option>
                  {doctorgroupCode.map((code) => (
                    <option
                      key={code.doctor_group_name}
                      value={code.doctor_group_code}
                    >
                      {code.doctor_group_name}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
            </CRow>
            </CForm>
            </CCardBody>
                </CCard>
        </>
        
    )
}

export default Index;