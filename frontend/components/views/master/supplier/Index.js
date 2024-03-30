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

    const [suppliers, setsuppliers] = useState([])
    const navigate = useNavigate();
    const [toast, addToast] = useState(0)
    const toaster = useRef()
    const [visible, setVisible] = useState(false)
    const [form, setForm] = useState([])

    const columns = [
        {
            title: "Supplier code",
            id: "supplier_code",
            width: 170,
            kind: GridCellKind.Text,
            align: "left",
            editable: false
        },
        {
            title: "Supplier Name",
            id: "supplier_name",
            width: 170,
            kind: GridCellKind.Text,
            align: "left",
            editable: false
        },

        {
            title: "Address",
            id: "address",
            width: 170,
            kind: GridCellKind.Text,
            align: "left",
            editable: false
        },


        {
            title: "Telephone Number",
            id: "telephone",
            width: 170,
            kind: GridCellKind.Text,
            align: "left",
            editable: false
        },

        {
            title: "Mobile Number",
            id: "mobile",
            width: 170,
            kind: GridCellKind.Text,
            align: "left",
            editable: false
        },



        // {
        //     title: "Gender",
        //     id: "gender",
        //     width: 150,
        //     kind: GridCellKind.Text,
        //     align: "left",
        //     editable: false
        // },

        {
            title: "Active ",
            id: "active",
            width: 150,
            kind: GridCellKind.Boolean,
            align: "left",
            editable: false
        },

        {
            title: "Resident ",
            id: "resident",
            width: 150,
            kind: GridCellKind.Boolean,
            align: "left",
            editable: false
        },
 
      
        
            {
                title: "Supplier Group",
                id: "supplier_group_id",
                width: 170,
                kind: GridCellKind.Text,
                align: "left",
                editable: false
            },


                
            {
                title: "Supplier Group name",
                id: "supplier_group_name",
                width: 170,
                kind: GridCellKind.Text,
                align: "left",
                editable: false
            },
        
        
        {
            title: "Supplier NIC",
            id: "supplier_nic",
            width: 180,
            kind: GridCellKind.Text,
            align: "left",
            editable: false
        },

        {
            title: "Birthday",
            id: "supplier_birthday",
            width: 180,
            kind: GridCellKind.Text,
            align: "left",
            editable: false
        },


    ]



    const fetchFiltered = async (filter, page = 0, rowCount = 50) => {
        let { data, status, statusText } = await api.get('/api/supplier_filter', {
            params: { filter: filter, page: page, rowCount: rowCount }
        });
    
        if (status === 200) {
            let response = data.message;
            if (data.status === true) {
                let values = data.payload.data;
                setsuppliers(values);
            } else {
                //let toastFailMsg = (<ToastError response={response} />);
              
            }
        } else {
            let response = data.message;
            let toastFailMsg = (<ToastError response={response} />);
            addToast(toastFailMsg);
        }
    };
    
    const filter = (filter, pageCount, rowCount) => {
        if (filter.length > 0) {
            fetchFiltered(filter, pageCount, rowCount);
        } else {
            fetchFiltered("", pageCount, rowCount);
        }
    };
    
    
    const onCellEdited = (cell, newValue) => {
        const indexes = columns;
        const [col, row] = cell;
        const key = indexes[col];
        let data = suppliers[row];
        data[key.id] = newValue.data;
        savesupplier(data);
    };


    const Addsupplier = () => {
        navigate('/master/supplier/form');
    }
    const savesupplier = (formData) => {
        let json = formData;
        api.post('/api/supplier_groupe', json, {
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
                    fetchSupplier
                    ();
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

    const Delete = (formData) => {
        let jsonData = form;
        //let jsonData = JSON.stringify(json)
        api.post('/api/supplier/delete', jsonData).then(({ data, status, statusText }) => {
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
                    fetchFiltered("",0);
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

    const fetchSupplier= async () => {

        let { data, status, statusText } = await api.get('/api/get_suppliers')
        if (status === 200) {
            let response = (data.message);
            if (data.status === true) {
                let values = data.payload.data
                
                setsuppliers(values);
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
        fetchSupplier();
        const interval = setInterval(() => {
            fetchSupplier();
        }, timerDelay);
        return () => { clearInterval(interval) };
    }
    useEffect(() => {
        startupFunc();
    }, []);

    const editFunc = (dataRow) => {
        let id = dataRow.supplier_code;
        navigate('/master/supplier/form?id=' + id);
       
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
                <CButton color="danger" onClick={() => Delete()} className='text-white'>DELETE</CButton>
            </CModalBody>
            </CModal>
            <CCard className='m-4'> 
                <CCardBody className='p-5'>
                    <DataGrid rows={suppliers} columns={columns} title={'Supplier'} filterFunc={filter} showFilter={true} editFunc={editFunc} isEdit={true} addFunc={Addsupplier} deleteFunc={confirmDelete}/>
                </CCardBody>
                
            </CCard>
        </>
    )
}

export default Index;