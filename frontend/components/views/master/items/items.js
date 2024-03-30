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
import { useFetcher, useSearchParams } from 'react-router-dom';
// import {IoMdArrowRoundBack,IoArrowBackCircleOutline} from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import { size } from 'lodash';


const Index = () => {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false)
    const [itemHeader, setItemHeader] = useState({})
    const [toast, addToast] = useState(0)

    const toaster = useRef();
    const formHeader = useRef();

    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get('id');
    const [stockCategoryCode, setStockCategoryCode] = useState([]);

    const onSubmit = async () => {
        const formElement = document.querySelector("#FormHeader");
        if (formElement.checkValidity() === true) {
            let form = itemHeader
            console.log("item", form)
            if (form.item_code == null || form.item_code == '') {
                // POST (Create a New record) !!
                let { data, status, statusText } = await api.post(`/api/item`, form)
                if (status === 200) {
                    let response = (data.message);
                    if (data.status === true) {
                        let toastFailMsg = (<ToastSuccess response={response} />);
                        addToast(toastFailMsg);
                        setTimeout(function () {
                            locationDirect()
                        }, 2000);
                    } else {
                        let toastFailMsg = (<ToastError response={response} />);
                        addToast(toastFailMsg);
                    }
                } else {
                    // 
                }
            } else {
                // PUT (Update a record) !!
                let { data, status, statusText } = await api.post(`/api/item`, form)
                if (status === 200) {
                    let response = (data.message);
                    if (data.status === true) {
                        let toastFailMsg = (<ToastSuccess response={response} />);
                        addToast(toastFailMsg);
                        setTimeout(function () {
                            locationDirect()
                        }, 2000);
                    } else {
                        let toastFailMsg = (<ToastError response={response} />);
                        addToast(toastFailMsg);
                    }
                } else {
                    // 
                }

            }
        }
        setValidated(true)
    }


    const fetchStockCategoryCodes = async () => {
        try {
            const response = await api.get("/api/item/stockCategoryDetails");
            //console.log("hello world");
            console.log(response);
            const data = response.data.payload.data;
            console.log("cat",data);
            setStockCategoryCode(data);
            //   console.log(label);
        } catch (error) {
            console.error("Error fetching stock category codes:", error);
        }
    };

    const locationDirect = () => {
        navigate('/master/items');
    }
    const loadField = (obj) => {
        let data = {}
        for (let i = 0; i < obj.length; i++) {
            data.item_code = obj[i].item_code;
            data.item_name = obj[i].item_name;
            data.stock_category_code = obj[i].stock_category_code
           // data.stock_category_name = obj[i].stock_category_name
        }

        setItemHeader(data)

    }




    const fetchProfile = async (id) => {
        if (id === null) {
            // 
        } else {
            id = id.trim()
            let { data, status, statusText } = await api.get(`/api/itemById/${id}`)
            if (status === 200) {
                let response = (data.message);
                if (data.status === true) {
                    let itemObj = data.payload.data
                    loadField(itemObj);
                    console.log(itemObj)
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

    useEffect(() => {
        if (id === null) {
            fetchStockCategoryCodes();
            // 
        } else {
            fetchProfile(id)
            fetchStockCategoryCodes();
        }
    }, [])

    return (
        <>
            <CToaster ref={toaster} push={toast} className='toaster toast-container p-3 position-fixed top-0 start-50 translate-middle-x' />
            <CCard className='m-4'>
                <CCardHeader className='pt-1 pb-1'>
                    <CRow className="align-items-center">
                        <CCol md={1} lg={1} className='fs-2 d-flex h-100 ps-4'>
                            <IoMdArrowRoundBack style={{ fontSize: '24px', cursor: 'pointer' }} onClick={() => { window.history.back(); }} />
                        </CCol>
                        <CCol md={7}>
                            <CFormLabel className="col-form-label fs-4">Items</CFormLabel>
                        </CCol>
                        <CCol md={4} className='text-end pe-5'>
                            <CButton type="button" className="col-md-3 col-form-label fs-6" color="success" variant='outline' onClick={() => { onSubmit(); }} >{id === null ? 'Add' : 'Update'}</CButton>
                        </CCol>
                    </CRow>
                </CCardHeader>
                <CCardBody style={{ padding: '2rem' }}>
                    <CForm ref={formHeader} id="FormHeader" className='needs-validation' noValidate validated={validated}>
                        <CRow className="mb-3">
                            <CCol md={1} className=' col-form-label'>
                                <CFormLabel >Item Code</CFormLabel>
                            </CCol>
                            <CCol md={3}>
                                <CFormInput inline="true" readOnly
                                    type="text"
                                    name="item_code"
                                    value={itemHeader.item_code}
                                    onChange={({ target }) => { let p = { ...itemHeader }; p["item_code"] = (target.value); setItemHeader(p); }}
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CCol md={1} className=' col-form-label'>
                                <CFormLabel >Item</CFormLabel>
                            </CCol>
                            <CCol md={3}>
                                <CFormInput inline="true"
                                    type="text"
                                    name="item_name"
                                    value={itemHeader.item_name}
                                    required
                                    onChange={({ target }) => { let p = { ...itemHeader }; p["item_name"] = (target.value.trimStart()); setItemHeader(p); }}
                                    feedbackInvalid="Item Name is Required."
                                />
                            </CCol>


                        </CRow>
                        <CRow className="mb-3">
                            <CCol md={1} className=' col-form-label'>
                                <CFormLabel >Stock category name</CFormLabel>
                            </CCol>
                            <CCol md={3}>

                                <CFormSelect
                                    inline={true}
                                    required
                                    name="stock_category_code"
                                    value={itemHeader.stock_category_code}
                                    onChange={({ target }) => { let p = { ...itemHeader }; p["stock_category_code"] = target.value.trimStart(); setItemHeader(p); }}
                                    feedbackInvalid="Stock category name is required">

                                    <option value="">Select Stock catgory name</option>
                                    {stockCategoryCode.map((code) => (
                                        <option
                                            key={code.stock_category_name} value={code.stock_category_code}>
                                                {code.stock_category_name}
                                        </option>
                                    ))}</CFormSelect>
                            </CCol>
                        </CRow>
                    </CForm>
                </CCardBody>
            </CCard>
        </>

    )
}

export default Index;