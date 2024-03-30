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


const Company = () => {
    const navigate = useNavigate();
    const [toast, addToast] = useState(0)
    const [companyHeader, setCompanyHeader] = useState({});
    const [validated, setValidated] = useState(false)
    /*const [company,setCompany] = useState([]);
    const [keywordFormData, setKeywordFormData] = useState({});
    const [addKeywordModal, showAddKeywordModal] = useState(false);*/

    const formHeader = useRef();
    const toaster = useRef();

    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get('id');


    useEffect(()=>{
        if(id === null){
            // 
        }else{
            fetchProfile(id)
        }
    },[])

    // const reset = ()
    const onSubmit = async() =>{
        const formElement = document.querySelector("#FormHeader");
        if (formElement.checkValidity() === true) {
            let form  =  companyHeader
            if(form.company_code == null || form.company_code == '' ){
                // POST (Create a New record) !!
                let { data, status, statusText } = await api.post(`/api/company`,form)
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
                let { data, status, statusText } = await api.post(`/api/company`,form)
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
        navigate('/master/company');
      }

    const loadField = (obj)=>{
        let data = {};
        for(let i = 0; i < obj.length; i++){
            data.company_code            =   obj[i].company_code;
            data.company_name            =   obj[i].company_name;
            data.address                 =   obj[i].address;
            data.company_prefix          =   obj[i].company_prefix?.trimEnd();
            data.email                   =   obj[i].email;
            data.fax                     =   obj[i].fax;
            data.telephone               =   obj[i].telephone;
            data.url                     =   obj[i].url;
            data.vat_no                  =   obj[i].vat_no;
            data.vat_percentage          =   obj[i].vat_percentage;
            data.vat_registed_address    =   obj[i].vat_registed_address;
            data.vat_registed_name       =   obj[i].vat_registed_name;
            data.barcode_printer         =   obj[i].barcode_printer?.trim();
        }
        setCompanyHeader(data)
      }
     
    const fetchProfile = async(id) => {
        if(id === null){
            // 
        }else {
            id  = id.trim()
                let { data, status, statusText } = await api.get(`/api/company/${id}`)
            if (status === 200) {
                let response = (data.message);
                if (data.status === true) {
                    let companyObj = data.payload.data
                    loadField(companyObj);
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

    return (
        <>
            <CToaster ref={toaster} push={toast} className='toaster toast-container p-3 position-fixed top-0 start-50 translate-middle-x' />
            {/*<CModal visible={false} onClose={() => showAddKeywordModal(false)}>
                <CModalHeader>
                    <CModalTitle>Add Company Profile</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm id="AddKeywordForm">
                        <CRow className="mb-3">
                            <CFormLabel htmlFor="name" className="col-auto col-form-label">Keyword</CFormLabel>
                            <CCol sm={4}>
                                <CFormInput inline="true"
                                    type="text"
                                    name="keyword"
                                    placeholder="keyword" />
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CFormLabel htmlFor="name" className="col-auto col-form-label">Default</CFormLabel>
                            <CCol sm={4} className='mt-3'>
                                <CFormCheck name="default" onChange={({ target }) => { let p = { ...keywordFormData }; p["default"] = (target.value); setKeywordFormData(p); }} />
                            </CCol>
                        </CRow>

                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => showAddKeywordModal(false)}>
                        Close
                    </CButton>
                    <CButton color="success" onClick={e => { onSubmitAddKeyword(e.target.value); }}>Add Keyword</CButton>
                </CModalFooter>
            </CModal>*/}

            <CCard className='m-4'>
                <CCardHeader className='pt-1 pb-1'>
                    <CRow className='align-items-center'>
                        <CCol md={1} className='fs-2 d-flex h-100 ps-4'> 
                            <IoMdArrowRoundBack style={{ fontSize: '24px', cursor:'pointer' }} onClick= {()=>{window.history.back();}}/>
                        </CCol>
                        <CCol md={7}>
                            <CFormLabel className="col-form-label fs-4">Company</CFormLabel>
                        </CCol>
                        <CCol md={4} className='text-end pe-5'>
                            <CButton type="button" className="col-md-3 col-form-label fs-6" color="success" variant='outline' onClick={() => { onSubmit() }} >{id ===null ? 'Add':'Update'}</CButton>
                        </CCol>
                    </CRow>
                </CCardHeader>
                <CCardBody style={{padding:'2rem'}}>
                    <CForm ref={formHeader} id="FormHeader" className='needs-validation' noValidate validated={validated}>
                        <CRow className="mb-3">
                            <CCol md={3}>
                                <CFormInput inline="true" readOnly label="Company Code"
                                    type="text"
                                    name="company_code"
                                    value={companyHeader.company_code}
                                    onChange={({ target }) => { let p = { ...companyHeader }; p["company_code"] = (target.value); setCompanyHeader(p); }}
                                />
                            </CCol>
                            <CCol md={3}>
                                <CFormInput inline="true" label="Company Name"
                                    type="text"
                                    name="company_name"
                                    value={companyHeader.company_name}
                                    onChange={({ target }) => { let p = { ...companyHeader }; p["company_name"] = (target.value.trimStart()); setCompanyHeader(p); }}
                                    required
                                    feedbackInvalid="Company Name Is Required."
                                />
                            </CCol>
                            <CCol md={6}>
                                <CFormInput inline="true"
                                    type="text" label="Company Prefix"
                                    name="company_prefix"
                                    value={companyHeader.company_prefix}
                                    onChange={({ target }) => { let p = { ...companyHeader }; p["company_prefix"] = (target.value.trimEnd().toUpperCase()); setCompanyHeader(p); }}
                                    required
                                    feedbackInvalid="Company Prefix Is Required."
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CCol md={3}>
                                <CFormTextarea inline="true"
                                    type="text" label="Address"
                                    name="address"
                                    value={companyHeader.address}
                                    onChange={({ target }) => { let p = { ...companyHeader }; p["address"] = (target.value.trimStart()); setCompanyHeader(p); }}
                                    required
                                    feedbackInvalid="Company Address Is Required."
                                />
                            </CCol>
                            <CCol md="3">
                                <CFormInput inline="true" label="Telephone"
                                    type="text"
                                    name="telephone"
                                    value={companyHeader.telephone}
                                    onChange={({ target }) => { let p = { ...companyHeader }; p["telephone"] = (target.value.replace(/\D/g, '')); setCompanyHeader(p); }}
                                    required
                                    minLength={10}
                                    maxLength={10}
                                    feedbackInvalid="Valid Telephone No Is Required."
                                />
                            </CCol>
                            <CCol md="3">
                                <CFormInput inline="true" label="Fax"
                                    type="text"
                                    name="fax"
                                    value={companyHeader.fax}
                                    onChange={({ target }) => { let p = { ...companyHeader }; p["fax"] = (target.value.replace(/\D/g, '')); setCompanyHeader(p); }}
                                    minLength={10}
                                    maxLength={10}
                                    feedbackInvalid="Valid Fax No Is Required."
                                />
                            </CCol>
                                <CCol md="3">
                                    <CFormInput inline="true" label="URL"
                                    type="text"
                                    name="url"
                                    value={companyHeader.url}
                                    onChange={({ target }) => { let p = { ...companyHeader }; p["url"] = (target.value); setCompanyHeader(p); }}
                                />
                                </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CCol md="3">
                                <CFormInput inline="true" label="Email"
                                    type="email"
                                    name="email"
                                    value={companyHeader.email}
                                    onChange={({ target }) => { let p = { ...companyHeader }; p["email"] = (target.value.replace(/\s/g, '')); setCompanyHeader(p); }}
                                    required
                                    feedbackInvalid="Valid Email Is Required."
                                />
                            </CCol>
                            
                            <CCol md="3">
                                <CFormInput inline="true" label="Vat No"
                                    type="text"
                                    name="vat_no"
                                    value={companyHeader.vat_no}
                                    onChange={({ target }) => { let p = { ...companyHeader }; p["vat_no"] = (target.value); setCompanyHeader(p); }}
                                />
                            </CCol>
                            <CCol md={3}>
                                <CFormInput inline="true" label="Vat Registed Name"
                                    type="text"
                                    name="vat_registed_name"
                                    value={companyHeader.vat_registed_name}
                                    onChange={({ target }) => { let p = { ...companyHeader }; p["vat_registed_name"] = (target.value); setCompanyHeader(p); }}
                                />
                            </CCol>
                            <CCol md={3}>
                                <CFormInput inline="true" label="Vat Registed Address"
                                    type="text"
                                    name="vat_registed_address"
                                    value={companyHeader.vat_registed_address}
                                    onChange={({ target }) => { let p = { ...companyHeader }; p["vat_registed_address"] = (target.value); setCompanyHeader(p); }}
                                />
                            </CCol>
                           

                        </CRow>
                        <CRow className="mb-3">
                            
                            <CCol md={3}>
                                <CFormInput inline="true" label="Vat (%)"
                                    type="text"
                                    name="vat_percentage"
                                    value={companyHeader.vat_percentage}
                                    onChange={({ target }) => { let p = { ...companyHeader }; p["vat_percentage"] = (target.value.replace(/[^\d.]/g, '')); setCompanyHeader(p); }}
                                    onBlur={(prevCompanyHeader) => ({...prevCompanyHeader,vat_percentage: parseFloat(prevCompanyHeader.vat_percentage)})}
                                />
                            </CCol>
                            
                            <CCol md={3}>
                                <CFormInput inline="true" label="Barcode Printer Name"
                                    type="text"
                                    name="barcode_printer"
                                    value={companyHeader.barcode_printer}
                                    onChange={({ target }) => { let p = { ...companyHeader }; p["barcode_printer"] = (target.value); setCompanyHeader(p); }}
                                />
                            </CCol>
                        </CRow>
                    </CForm>
                </CCardBody>
            </CCard>
        </>
    )
}

export default Company;