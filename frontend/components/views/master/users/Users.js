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
    CNav, CNavLink, CNavItem, CTabContent, CTabPane, CImage, CBadge
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
import CIcon from '@coreui/icons-react';
import { cilX } from '@coreui/icons';


const Index = () => {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false)
    const [userHeader, setUserHeader] = useState({})
    const [previewImg, setPreviewImg] = useState({})
    const [toast, addToast] = useState(0)
    const [confirmPwd, setConfirmPwd] = useState("")
    const [cashierConfirmPwd, setCashierConfirmPwd] = useState("")
    const [cashier, setCashier] = useState(false)
    const [company, setCompany] = useState([])
    const [department, setDepartment] = useState([])
    
    const toaster = useRef();
    const formHeader = useRef();
    
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get('id');
      

    const onSubmit = async() =>{
        const formElement = document.querySelector("#FormHeader");
        if (formElement.checkValidity() === true) {
            let form  =  userHeader

            if(form.is_active == null || form.is_active == ''){
                form.is_active = true;
            }
            if(form.is_cashier == null || form.is_cashier == ''){
                form.is_cashier = false;
            }

            if(form.user_code == null || form.user_code == ''){
                // POST (Create a New record) !!
                let { data, status, statusText } = await api.post(`/api/user`,form, {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                    },
                });
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
                console.log(form);
                let { data, status, statusText } = await api.post(`/api/user`,form, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
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
        navigate('/master/user');
      }
    const loadField = (obj)=>{
        let data = {}
        for(let i = 0; i < obj.length; i++){
            data.user_code            =   obj[i].user_code?.trim();
            data.user_name            =   obj[i].user_name?.trim();
            data.login_id             =   obj[i].login_id?.trim();
            data.epfno                =   obj[i].epfno?.trim();
            data.company_code         =   obj[i].company_code?.trim();
            data.department_code      =   obj[i].department_code?.trim();
            data.signature            =   obj[i].signature?.trim();
            data.image                =   obj[i].image?.trim();
            data.address              =   obj[i].address?.trim();
            data.email                =   obj[i].email?.trim();
            data.mobile_no            =   obj[i].mobile_no?.trim();
            data.telephone_no         =   obj[i].telephone_no?.trim();
            data.is_active            =   obj[i].is_active || false;
            data.is_cashier           =   obj[i].is_cashier || false;
            data.password_hash        =   obj[i].password_hash?.trim();
            data.cashier_pwd_hash     =   obj[i].cashier_pwd_hash?.trim();
        }

        setUserHeader(data)
        setCashierConfirmPwd(data.cashier_pwd_hash)
        setConfirmPwd(data.password_hash)
        setCashier(data.is_cashier)
        
      }


    const fetchProfile = async(id) => {
        if(id === null){
            // 
        }else {
            id  = id.trim()
                let { data, status, statusText } = await api.get(`/api/user/${id}`)
            if (status === 200) {
                let response = (data.message);
                if (data.status === true) {
                    let unitObj = data.payload.data
                    loadField(unitObj);
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

    const fetchCompanies = async() => {
        let { data, status, statusText } = await api.get('/api/companylist')
        if (status === 200) {
            let response = (data.message);
            if (data.status === true) {
                let values = data.payload.data
                for (let index = 0; index < values.length; index++) {
                    const element = values[index];
                    element.label = element.company_name.trim();
                    element.value = element.company_code.trim();
                    values[index] = element;
                }
                values.unshift({company_code: '', company_name: 'Select a company', label: 'Select a company', value: ''});
                setCompany(values);
            } else {
                let toastFailMsg = (<ToastError response={response} />);
                addToast(toastFailMsg);
            }
        } else {
            let response = (data.message);
            let toastFailMsg = (<ToastError response={response} />);
            addToast(toastFailMsg);
        }
    }

    const fetchDepartments = async() => {
        let { data, status, statusText } = await api.get('/api/departmentlist')
        if (status === 200) {
            let response = (data.message);
            if (data.status === true) {
                let values = data.payload.data
                for (let index = 0; index < values.length; index++) {
                    const element = values[index];
                    element.label = element.department_name.trim();
                    element.value = element.department_code.trim();
                    values[index] = element;
                }
                values.unshift({department_code: '', department_name: 'Select a department', label: 'Select a department', value: ''});
                setDepartment(values);
            } else {
                let toastFailMsg = (<ToastError response={response} />);
                addToast(toastFailMsg);
            }
        } else {
            let response = (data.message);
            let toastFailMsg = (<ToastError response={response} />);
            addToast(toastFailMsg);
        }
    }

    // async function ImageToBase64(file){
    
    //     const reader = new FileReader();
    
    //     reader.readAsDataURL(file);
    
    //     const data = new Promise((resolve,reject)=>{
    //         reader.onload = ()=> resolve(reader.result)
    //         reader.onerror = err => reject(err)
    //     })
    
    //     return data
    // }

    const handleImageUpload = async(e) => {
        let p = { ...userHeader }; 
        p["image"] = (e.target.files[0]); 
        var base64Image = URL.createObjectURL(e.target.files[0])//await ImageToBase64(e.target.files[0])
        let img = { ...previewImg }; 
        img["image"] = (base64Image); 
        setPreviewImg(img)
        setUserHeader(p);
        console.log(base64Image);
    }
    const handleSignatureUpload = async(e) => {
        let p = { ...userHeader }; 
        p["signature"] = (e.target.files[0]); 
        var base64Image = URL.createObjectURL(e.target.files[0])//await ImageToBase64(e.target.files[0])
        let img = { ...previewImg }; 
        img["signature"] = (base64Image); 
        setPreviewImg(img)
        setUserHeader(p);
    }

    useEffect(()=>{
        fetchCompanies()
        fetchDepartments()
        if(id === null){
            // 
        }else{
            fetchProfile(id)
        }
    },[])


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
                            <CFormLabel className="col-form-label fs-4">User</CFormLabel>
                        </CCol>
                        <CCol md={4} className='text-end pe-5'>
                            <CButton type="button" className="col-md-3 col-form-label fs-6" color="success" variant='outline' onClick={() => { onSubmit(); }} >{id ===null ? 'Add':'Update'}</CButton>
                        </CCol>
                    </CRow>
                </CCardHeader>
                <CCardBody style={{padding:'2rem'}}>
                    <CForm ref={formHeader} id="FormHeader" className='needs-validation' noValidate validated={validated} encType="multipart/form-data">
                        <CRow className="mb-3">
                            <CCol>
                                <CRow>
                                    <CCol md={12} className='col-form-label'>
                                        <CFormLabel >User Code</CFormLabel>
                                    </CCol>
                                    <CCol md={11}> 
                                        <CFormInput inline="true" readOnly
                                            type="text"
                                            name="user_code"
                                            value={userHeader.user_code}
                                            onChange={({ target }) => { let p = { ...userHeader }; p["user_code"] = (target.value.trimStart()); setUserHeader(p); }}
                                        />
                                    </CCol>
                                </CRow>
                            </CCol>
                            <CCol>
                                <CRow>
                                    <CCol md={12} className='col-form-label'>
                                        <CFormLabel >Name</CFormLabel>
                                    </CCol>
                                    <CCol md={11}>
                                        <CFormInput inline="true"
                                            type="text"
                                            name="user_name"
                                            value={userHeader.user_name}
                                            required
                                            onChange={({ target }) => { let p = { ...userHeader }; p["user_name"] = (target.value.trimStart()); setUserHeader(p); }}
                                            feedbackInvalid="Name Is Required."
                                        />
                                    </CCol>
                                </CRow>
                            </CCol>
                            <CCol>
                                <CRow>
                                    <CCol md={12} className='col-form-label'>
                                        <CFormLabel >Login ID</CFormLabel>
                                    </CCol>
                                    <CCol md={11}>
                                        <CFormInput inline="true"
                                            type="text"
                                            name="login_id"
                                            value={userHeader.login_id}
                                            required
                                            onChange={({ target }) => { let p = { ...userHeader }; p["login_id"] = (target.value.trimStart()); setUserHeader(p); }}
                                            feedbackInvalid="Login ID Is Required."
                                        />
                                    </CCol>
                                </CRow>
                            </CCol>
                            <CCol>
                                <CRow>
                                    <CCol md={12} className='col-form-label'>
                                        <CFormLabel >EPF No</CFormLabel>
                                    </CCol>
                                    <CCol md={11}>
                                        <CFormInput inline="true"
                                            type="text"
                                            name="epfno"
                                            value={userHeader.epfno}
                                            onChange={({ target }) => { let p = { ...userHeader }; p["epfno"] = (target.value.trimStart()); setUserHeader(p); }}
                                        />
                                    </CCol>
                                </CRow>
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CCol>
                                <CRow>
                                    <CCol md={12} className='col-form-label'>
                                        <CFormLabel >Company</CFormLabel>
                                    </CCol>
                                    <CCol md={11}>
                                        <CFormSelect 
                                            name='company_code'  
                                            options={company}
                                            value={userHeader.company_code}
                                            onChange={(e) => { let p = { ...userHeader }; p["company_code"] = (e.target.value); setUserHeader(p); }}
                                            required
                                            feedbackInvalid="Company is required"
                                        />
                                    </CCol>
                                </CRow>
                            </CCol>
                            <CCol>
                                <CRow>
                                    <CCol md={12} className='col-form-label'>
                                        <CFormLabel >Department</CFormLabel>
                                    </CCol>
                                    <CCol md={11}>
                                        <CFormSelect 
                                            name='department_code'  
                                            options={department}
                                            value={userHeader.department_code}
                                            onChange={(e) => { let p = { ...userHeader }; p["department_code"] = (e.target.value); setUserHeader(p); }}
                                            required
                                            feedbackInvalid="Company is required"
                                        />
                                    </CCol>
                                </CRow>
                            </CCol>
                            <CCol>
                                <CRow>
                                    <CCol md={12} className='col-form-label'>
                                        <CFormLabel >Address</CFormLabel>
                                    </CCol>
                                    <CCol md={11}>
                                        <CFormTextarea inline="true"
                                            type="text"
                                            name="address"
                                            value={userHeader.address}
                                            onChange={({ target }) => { let p = { ...userHeader }; p["address"] = (target.value); setUserHeader(p); }}
                                        />
                                    </CCol>
                                </CRow>
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CCol>
                                <CRow>
                                    <CCol md={12} className='col-form-label'>
                                        <CFormLabel >Email</CFormLabel>
                                    </CCol>
                                    <CCol md={11}>
                                        <CFormInput inline="true"
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            value={userHeader.email}
                                            onChange={({ target }) => { let p = { ...userHeader }; p["email"] = (target.value.replace(/\s/g, '')); setUserHeader(p); }}
                                            required
                                            feedbackInvalid="Valid Email Is Required."
                                        />
                                    </CCol>
                                </CRow>
                            </CCol>
                            <CCol>
                                <CRow>
                                    <CCol md={12} className=' col-form-label'>
                                        <CFormLabel >Mobile</CFormLabel>
                                    </CCol>
                                    <CCol md={11}>
                                        <CFormInput inline="true"
                                            type="text"
                                            placeholder='Mobile Number'
                                            name="mobile_no"
                                            value={userHeader.mobile_no}
                                            onChange={({ target }) => { let p = { ...userHeader }; p["mobile_no"] = (target.value.replace(/\D/g, '')); setUserHeader(p); }}
                                            required
                                            minLength={10}
                                            maxLength={10}
                                            feedbackInvalid="Valid Mobile No Is Required."
                                        />
                                    </CCol>
                                </CRow>
                            </CCol>
                            <CCol>
                                <CRow>
                                    <CCol md={12} className='col-form-label'>
                                        <CFormLabel >Telephone</CFormLabel>
                                    </CCol>
                                    <CCol md={11}>
                                        <CFormInput inline="true"
                                            type="tel"
                                            placeholder='Telephone Number'
                                            name="telephone_no"
                                            value={userHeader.telephone_no}
                                            onChange={({ target }) => { let p = { ...userHeader }; p["telephone_no"] = (target.value.replace(/\D/g, '')); setUserHeader(p); }}
                                            minLength={10}
                                            maxLength={10}
                                            feedbackInvalid="Valid Telephone No Is Required."
                                        />
                                    </CCol>
                                </CRow>
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CCol>
                                <CRow>
                                    <CCol md={12} className='col-form-label'>
                                        <CFormLabel >Profile Image</CFormLabel>
                                    </CCol>
                                    <CCol md={11}>
                                    {
                                        userHeader.image? 
                                        <div className='userImages'>
                                            <CImage rounded thumbnail src={previewImg.image || (process.env.NEXT_PUBLIC_API_URL+userHeader.image) || "/assets/images/profileErrorImage.png"}  onError={ (e) => {e.target.src='/assets/images/profileErrorImage.png'}} style={{width:'100px', height:'100px'}} onClick={() => {let p = { ...userHeader }; p["image"] = (""); setUserHeader(p);}} />
                                        </div>
                                    :
                                        <CFormInput inline="true"
                                            type="file"
                                            name="image"
                                            accept="image/*"
                                            value={userHeader.image}
                                            onChange={handleImageUpload}
                                        />
                                    }
                                    </CCol>
                                </CRow>
                            </CCol>
                            <CCol>
                                <CRow>
                                    <CCol md={12} className=' col-form-label'>
                                        <CFormLabel >Signature</CFormLabel>
                                    </CCol>
                                    <CCol md={11}>
                                    {
                                        userHeader.signature? 
                                        <div className='userImages'>
                                            <CImage rounded thumbnail src={previewImg.signature || (process.env.NEXT_PUBLIC_API_URL+userHeader.signature) || "/assets/images/profileErrorImage.png"}  onError={ (e) => {e.target.src='/assets/images/profileErrorImage.png'}} style={{width:'200px', height:'100px'}} onClick={() => {let p = { ...userHeader }; p["signature"] = (""); setUserHeader(p);}} />
                                        </div>
                                    :
                                        <CFormInput inline="true"
                                            type="file"
                                            name="signature"
                                            accept="image/*"
                                            value={userHeader.signature}
                                            onChange={handleSignatureUpload}
                                        />
                                    }
                                    </CCol>
                                </CRow>
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CCol md={2}>
                                <CRow>
                                    <CCol md={12} className='col-form-label'>
                                        <CFormLabel >Active</CFormLabel>
                                    </CCol>
                                    <CCol md={11}>
                                        <CFormSwitch inline="true"
                                            name="is_active"
                                            defaultChecked={true}
                                            checked={userHeader.is_active}
                                            onChange={({ target }) => { let p = { ...userHeader }; p["is_active"] = (target.checked); setUserHeader(p); }}
                                        />
                                    </CCol>
                                </CRow>
                            </CCol>
                            <CCol>
                                <CRow>
                                    <CCol md={12} className='col-form-label'>
                                        <CFormLabel >Cashier</CFormLabel>
                                    </CCol>
                                    <CCol md={11}>
                                        <CFormSwitch inline="true"
                                            name="is_cashier"
                                            defaultChecked={false}
                                            checked={userHeader.is_cashier}
                                            onChange={({ target }) => { let p = { ...userHeader }; p["is_cashier"] = (target.checked); setUserHeader(p); }}
                                        />
                                    </CCol>
                                </CRow>
                            </CCol>
                        </CRow>
                        {userHeader.is_cashier ? 
                        <CRow className="mb-3">
                            <CCol>
                                <CRow>
                                    <CCol md={12} className='col-form-label'>
                                        <CFormLabel >Cashier Password</CFormLabel>
                                    </CCol>
                                    <CCol md={11}>
                                        <CFormInput inline="true"
                                            type="password"
                                            name="cashier_pwd_hash"
                                            value={userHeader.cashier_pwd_hash || (cashier ? '********': '')}
                                            onChange={({ target }) => { let p = { ...userHeader }; p["cashier_pwd_hash"] = (target.value); setUserHeader(p); }}
                                            minLength={8}
                                            required
                                            feedbackInvalid="Password With Atleast 8 Characters Is Required."
                                        />
                                    </CCol>
                                </CRow>
                            </CCol>
                            <CCol>
                                <CRow>
                                    <CCol md={12} className='col-form-label'>
                                        <CFormLabel >Confirm Cashier Password</CFormLabel>
                                    </CCol>
                                    <CCol md={11}>
                                        <CInputGroup>
                                            <CFormInput inline="true"
                                                type="password"
                                                name="cashierConfirmPwd"
                                                value={cashierConfirmPwd || (cashier ? '********': '')}
                                                onChange={({ target }) => { setCashierConfirmPwd(target.value); }}
                                                pattern={userHeader.cashier_pwd_hash===cashierConfirmPwd ? '.+' : '^$'}
                                                minLength={8}
                                                required
                                                feedbackInvalid="Valid Confirmation Password Is Required."
                                            />
                                        </CInputGroup>
                                    </CCol>
                                </CRow>
                            </CCol>
                        </CRow>
                        : ''}
                        <CRow className="mb-3">
                            <CCol>
                                <CRow>
                                    <CCol md={12} className='col-form-label'>
                                        <CFormLabel >Password</CFormLabel>
                                    </CCol>
                                    <CCol md={11}>
                                        <CFormInput inline="true"
                                            type="password"
                                            name="password_hash"
                                            value={userHeader.password_hash || (id ? '********' : '')}
                                            onChange={({ target }) => { let p = { ...userHeader }; p["password_hash"] = (target.value); setUserHeader(p); }}
                                            minLength={8}
                                            required
                                            feedbackInvalid="Password With Atleast 8 Characters Is Required."
                                        />
                                    </CCol>
                                </CRow>
                            </CCol>
                            <CCol>
                                <CRow>
                                    <CCol md={12} className='col-form-label'>
                                        <CFormLabel >Confirm Password</CFormLabel>
                                    </CCol>
                                    <CCol md={11}>
                                        <CInputGroup>
                                            <CFormInput inline="true"
                                                type="password"
                                                name="confirmPwd"
                                                value={confirmPwd || (id ? '********' : '')}
                                                onChange={({ target }) => { setConfirmPwd(target.value); }}
                                                pattern={userHeader.password_hash===confirmPwd ? '.+' : '^$'}
                                                minLength={8}
                                                required
                                                feedbackInvalid="Valid Confirmation Password Is Required."
                                            />
                                        </CInputGroup>
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

export default Index;