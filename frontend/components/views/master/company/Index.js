import React, { useState, useRef, useEffect } from 'react'
import DataEditor, {
    GridCell,
    GridCellKind,
    GridColumn,
    NumberCell,
    Theme
} from "@glideapps/glide-data-grid";
import api from "../../../api";
import {
    CRow,
    CCol,
    CFormCheck,
    CForm,
    CFormInput,
    CFormLabel,
    CCard,
    CCardBody,
    CToast,
    CToastBody,
    CButton,
    CCardHeader,
    CToastClose,
    CToaster,CModal,CModalBody,CModalHeader,CModalTitle,CModalFooter
} from '@coreui/react-pro'
import ToastError from '../../../components/ToastError';
import DataGrid from '../../../components/DataGrid';
import { useNavigate } from "react-router-dom";
const Index = () => {
    const navigate = useNavigate();
    const [company, setCompany] = useState([])
    const [toast, addToast] = useState(0)
    const [visible, setVisible] = useState(false)
    const [form, setForm] = useState([])

    const toaster = useRef()
    const filterFunc = (filter, pageCount, rowCount) => {
        if (filter.length >= 0) {
            fetchCompanyFiltered(filter, pageCount, rowCount);
        } else { fetchCompanyFiltered("", pageCount, rowCount); }
    }
    const columns = [
        {
            title: "Code",
            id: "company_code",
            width: 90,
            kind: GridCellKind.RowID,
            themeOverride: {
                textHeader: "#225588",
            },
            align: "left",
            editable: false
        },
        {
            title: "Name",
            id: "company_name",
            width: 160,
            kind: GridCellKind.Text,
            themeOverride: {
                textHeader: "#225588",
            },
            align: "left",
            editable: false
        },
        {
            title: "E-Mail",
            id: "email",
            width: 190,
            kind: GridCellKind.Text,
            themeOverride: {
                textHeader: "#225588",
            },
            align: "left",
            editable: false
        },
        {
            title: "Telephone",
            id: "telephone",
            width: 150,
            kind: GridCellKind.Text,
            themeOverride: {
                textHeader: "#225588",
            },
            align: "left",
            editable: false
        },
        {
            title: "Fax",
            id: "fax",
            width: 150,
            kind: GridCellKind.Text,
            themeOverride: {
                textHeader: "#225588",
            },
            align: "left",
            editable: false
        }
    ]
    
    const fetchCompanyFiltered = async (filter, page = 0, rowCount = 50) => {
        let { data, status, statusText } = await api.get('/api/company', { params: { filter: filter, page: page, rowCount: rowCount } })
        if (status === 200) {
            let response = (data.message);
            if (data.status === true) {
                let values = data.payload.data
                setCompany(values);
            } else {
                let toastFailMsg = (<ToastError response={response} />);
                // addToast(toastFailMsg);
            }
        } else {
            let response = (data.message);
            let toastFailMsg = (<ToastError response={response} />);
            addToast(toastFailMsg);
        }
    };
    
    const add = () => {
        navigate('/master/company/tr');
    }

    const saveCompany = (formData) => {
        let json = formData;

        api.post('/api/company', json, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(({ data, status, statusText }) => {
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
                    fetchCompanyFiltered();
                } else {
                    let toastFailMsg = (
                        <CToast autohide={true} delay={2000} visible={true} color="danger" className="text-white align-items-center">
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
                    <CToast autohide={true} delay={2000} visible={true} color="danger" className="text-white align-items-center">
                        <div className="d-flex">
                            <CToastBody>{response}</CToastBody>
                            <CToastClose className="me-2 m-auto" white />
                        </div>
                    </CToast>);
                addToast(toastFailMsg);
            }
        })
    }
    const deleteCompanyProfile = (formData) => {
        let json = formData;

        let jsonData = JSON.stringify(json)
        setVisible(true)
        setForm(jsonData)
    }
    
    const softDelete =()=>{
        let jsonData = form
        api.post('/api/company/delete', jsonData).then(({ data, status, statusText }) => {
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
                    fetchCompanyFiltered("", 0);
                    setVisible(false)
                } else {
                    let toastFailMsg = (
                        <CToast autohide={true} delay={2000} visible={true} color="danger" className="text-white align-items-center">
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
                    <CToast autohide={true} delay={2000} visible={true} color="danger" className="text-white align-items-center">
                        <div className="d-flex">
                            <CToastBody>{response}</CToastBody>
                            <CToastClose className="me-2 m-auto" white />
                        </div>
                    </CToast>);
                addToast(toastFailMsg);
            }
        })
    }
    
    const startupFunc = () => {
        fetchCompanyFiltered("", 0);
    }

    const onCellEdited = (cell, newValue) => {
        const indexes = columns;
        const [col, row] = cell;
        const key = indexes[col];
        let data = company[row];
        data[key.id] = newValue.data;
        saveCompany(data);
    };
    
    useEffect(() => {
        startupFunc();
    }, []);

    const editFunc = (dataRow) => {
        let id = dataRow.company_code;
        navigate('/master/company/tr?id=' + id);
    };
    return (
        <>
            <CToaster ref={toaster} push={toast} className='toaster toast-container p-3 position-fixed top-0 start-50 translate-middle-x' />
            <CModal alignment="center" visible={visible}>
            <CModalHeader>
                <CModalTitle> <b>Are you sure you want to delete ?</b></CModalTitle>
            </CModalHeader>
            <CModalBody>
                <p className='text-primary'> <b>This item will be deleted immediately. You can&apos;t undo this action</b></p>
                <CButton color="secondary" onClick={() => setVisible(false)}>CANCEL</CButton>  &nbsp;
                <CButton color="danger" onClick={() => softDelete()} className='text-white'>DELETE</CButton>
            </CModalBody>
            </CModal>
            <CCard className='m-4'>
                <CCardBody className='p-5'>
                    <DataGrid rows={company} columns={columns} title={'company'} isEdit={true} showFilter={true}  filterFunc={filterFunc} onCellEdited={onCellEdited} addFunc={add} editFunc={editFunc}  deleteFunc={deleteCompanyProfile} />
                </CCardBody>
            </CCard>
        </>
    )
}

export default Index;