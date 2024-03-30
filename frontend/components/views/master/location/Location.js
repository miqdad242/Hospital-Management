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
import {IoMdArrowRoundBack} from "react-icons/io";
import ToastError from '../../../components/ToastError';
import ToastSuccess from '../../../components/ToastSuccess';
import Select from '../../../components/Select';
import DataGrid from '../../../components/DataGrid';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { values } from 'lodash';


const Location = () => {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false)
    const [location, setLocation] = useState({});
    const [toast, addToast] = useState(0)
    
    const formHeader = useRef();
    const toaster = useRef();
    
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get('id');
   

    useEffect(()=>{
        if(id === null){
            // 
        }else{
            fetchLocation(id)
        }
    },[])

   
    const onSubmit = async() =>{
        const formElement = document.querySelector("#FormHeader");
        if (formElement.checkValidity() === true) {
            let form  =  location
            if(form.company_code == null || form.company_code == '' ){
                // POST (Create a New record) !!
                let { data, status, statusText } = await api.post(`/api/location`,form)
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
                let { data, status, statusText } = await api.post(`/api/location`,form)
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

    const locationDirect = () => {
        navigate('/master/location');
      }
    //🟢
    const loadField = (obj)=>{
        let data = {};
        data.location_code            =   obj.location_code;
        data.location_name            =   obj.location_name?.trimEnd();
        data.company_code             =   obj.company_code;
        data.printer_properties       =   obj.printer_properties;
        data.invoicing                =   obj.invoicing
        setLocation(data)
      }
    //🟢
    const fetchLocation = async(id) => {
        if(id === null){
            // 
        }else {
            id  = id.trim()
                let { data, status, statusText } = await api.get(`/api/location/${id}`)
            if (status === 200) {
                let response = (data.message);
                if (data.status === true) {
                    let Obj = data.payload.data
                    setLocation(Obj);
                    loadField(Obj);
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
    //🟢
    
    return (
        <>
            <CToaster ref={toaster} push={toast} className='toaster toast-container p-3 position-fixed top-0 start-50 translate-middle-x' />
            <CCard className='m-4'>
                <CCardHeader className='pt-1 pb-1'>
                    <CRow className="align-items-center">
                        <CCol md={1} className='fs-2 d-flex h-100 ps-4'> 
                            <IoMdArrowRoundBack style={{ fontSize: '24px', cursor:'pointer' }} onClick= {()=>{window.history.back();}}/>
                        </CCol>
                        <CCol md={7}>
                            <CFormLabel className="col-form-label fs-4">Location</CFormLabel>
                        </CCol>
                        <CCol md={4} className='text-end'>
                            <CButton type="button" className="col-md-3 col-form-label fs-6" color="success" variant='outline' onClick={() => { onSubmit() }} >{id ===null ? 'Add':'Update'}</CButton>
                        </CCol>
                    </CRow>
                </CCardHeader>
                <CCardBody className='p-5'>
                    <CForm ref={formHeader} id="FormHeader" className='needs-validation' noValidate validated={validated}>
                        <CRow>
                            <CCol md={4}>
                                <CRow className="mb-3">
                                    <CCol md={3} className='col-form-label'>
                                        <CFormLabel >Code</CFormLabel>
                                    </CCol>
                                    <CCol md={8}>
                                        <CFormInput inline="true" readOnly
                                            type="text"
                                            name="location_code"
                                            value={location.location_code}
                                            onChange={({ target }) => { let p = { ...location }; p["location_code"] = (target.value); setLocation(p); }}
                                        />
                                    </CCol>
                                </CRow>
                                <CRow className="mb-3">
                                    <CCol md={3} className=' col-form-label'>
                                        <CFormLabel >Location</CFormLabel>
                                    </CCol>
                                    <CCol md={8}>
                                        <CFormInput inline="true"
                                            type="text"
                                            name="location_name"
                                            value={location.location_name}
                                            onChange={({ target }) => { let p = { ...location }; p["location_name"] = (target.value.trimStart()); setLocation(p); }}
                                            required
                                            feedbackInvalid="Location Name Is Required."
                                        />
                                    </CCol>
                                </CRow>
                                <CRow className="mb-3 align-items-center">
                                    <CCol md={3} className=' col-form-label'>
                                        <CFormLabel >Invoicing</CFormLabel>
                                    </CCol>
                                    <CCol md={8} className='h-100'>
                                        <CFormCheck
                                            name="invoicing" className='mt-0'
                                            checked={location.invoicing}
                                            onChange={({ target }) => { let p = { ...location }; p["invoicing"] = (target.checked); setLocation(p); }}
                                        />
                                    </CCol>
                                </CRow>
                            </CCol>
                            <CCol>
                                <CRow className="mb-3">
                                    <CCol md={2} className=' col-form-label'>
                                        <CFormLabel >Printer Properties</CFormLabel>
                                    </CCol>
                                    <CCol md={10}>
                                        <CFormTextarea 
                                            type="text"
                                            name="printer_properties" 
                                            style={{fontFamily: 'var(--cui-font-monospace)'}}
                                            rows={6}
                                            value={location.printer_properties}
                                            onChange={({ target }) => { let p = { ...location }; p["printer_properties"] = (target.value); setLocation(p); }}
                                            required
                                            feedbackInvalid="Printer Properties are Required."
                                        />
                                    </CCol>
                                </CRow>
                            </CCol>
                        </CRow>
                    </CForm>
                </CCardBody>
            </CCard>
        </>
    )
}


export default Location