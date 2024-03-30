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
    CToaster,
    CModalHeader,
    CModal,
    CModalBody,
    CModalFooter,
    CModalTitle
} from '@coreui/react-pro'
import ToastError from '../../../components/ToastError';
import DataGrid from '../../../components/DataGrid';
import { useNavigate } from "react-router-dom";



const Index = () => {

    const [bills, setBills] = useState([])
    const navigate = useNavigate();
    const [toast, addToast] = useState(0)
    const toaster = useRef()
    const [visible, setVisible] = useState(false)
    const [form, setForm] = useState([])

    const columns = [
        {
            title: "Bill code",
            id: "bill_code",
            width: 120,
            kind: GridCellKind.Text,
            align: "left",
            editable: false
        },
        {
            title: "Bill Name",
            id: "bill_name",
            width: 150,
            kind: GridCellKind.Text,
            align: "left",
            editable: false
        }
    ]



    const fetchBillFiltered = async (filter, page = 0, rowCount = 50) => {
        let { data, status, statusText } = await api.get('/api/bill', {
            params: { filter: filter, page: page, rowCount: rowCount }
        });
    
        if (status === 200) {
            let response = data.message;
            if (data.status === true) {
                let values = data.payload.data;
                setBills(values);
            } else {
                //let toastFailMsg = (<ToastError response={response} />);
                //addToast(toastFailMsg);
            }
        } else {
            let response = data.message;
            let toastFailMsg = (<ToastError response={response} />);
            addToast(toastFailMsg);
        }
    };
    
    const filterBill = (filter, pageCount, rowCount) => {
        if (filter.length > 0) {
            fetchBillFiltered(filter, pageCount, rowCount);
        } else {
            fetchBillFiltered("", pageCount, rowCount);
        }
    };
    
    
    const onCellEdited = (cell, newValue) => {
        const indexes = columns;
        const [col, row] = cell;
        const key = indexes[col];
        let data = bills[row];
        data[key.id] = newValue.data;
        saveBill(data);
    };
    const addBill = () => {
        navigate('/master/billcategory/form');
    }
    const saveBill = (formData) => {
        let json = formData;
        api.post('/api/bill', json, {
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
                    fetchBill();
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

    const confirmDelete = (formData) => {
        let json = formData;

        let jsonData = JSON.stringify(json)
        setVisible(true)
        setForm(jsonData)
       
   }

    const deleteBill = (formData) => {
        let jsonData = form;
        //let jsonData = JSON.stringify(json)
        api.post('/api/bill/delete', jsonData).then(({ data, status, statusText }) => {
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
                    fetchBillFiltered("",0);
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
                            <CToastClose className="me-2 m-auto" white/>
                        </div>
                    </CToast>);
                addToast(toastFailMsg);
            }
        })
    }
    const fetchBill = async () => {
        let { data, status, statusText } = await api.get('/api/bill')
        if (status === 200) {
            let response = (data.message);
            if (data.status === true) {
                let values = data.payload.data
                
                setBills(values);
            } else {
                let toastFailMsg = (<ToastError response={response} />);
                //addToast(toastFailMsg);
            }
        } else {
            let response = (data.message);
            let toastFailMsg = (<ToastError response={response} />);
            addToast(toastFailMsg);
        }
    };
    const timerDelay = 5 * 60 * 1000
    const startupFunc = () => {
        fetchBill();
        const interval = setInterval(() => {
            fetchBill();
        }, timerDelay);
        return () => { clearInterval(interval) };
    }
    useEffect(() => {
        startupFunc();
    }, []);

    const editFunc = (dataRow) => {
        let id = dataRow.bill_code;
        navigate('/master/billcategory/form?id=' + id);
    }
    


    
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
                <CButton color="danger" onClick={() => deleteBill()} className='text-white'>DELETE</CButton>
            </CModalBody>
            </CModal>
            <CCard className='m-4'> 
                <CCardBody className='p-5'>
                    <DataGrid rows={bills} columns={columns} title={'Bill'} filterFunc={filterBill} showFilter={true} editFunc={editFunc} isEdit={true} onCellEdited={onCellEdited} addFunc={addBill} deleteFunc={confirmDelete}/>
                </CCardBody>
                
            </CCard>
        </>
    )
}

export default Index;