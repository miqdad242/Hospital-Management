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
import Location from './Location';
const Index = () => {
    const navigate = useNavigate();
    const [locations, setLocations] = useState([])
    const [form, setForm] = useState([])
    const [toast, addToast] = useState(0)
    const [visible, setVisible] = useState(false)
    const toaster = useRef()
    const filterFunc = (filter, pageCount, rowCount) => {
        if (filter.length >= 0) {
            fetchLocationFiltered(filter, pageCount, rowCount);
        } else { fetchLocationFiltered("", pageCount, rowCount); }
    }
    const columns = [
        {
            title: "Code",
            id: "location_code",
            width: 120,
            kind: GridCellKind.RowID,
            align: "left",
            editable: false,
            themeOverride: {
                textHeader: "#225588",
            },
        },
        {
            title: "Name",
            id: "location_name",
            width: 150,
            kind: GridCellKind.Text,
            align: "left",
            editable: false,
            themeOverride: {
                textHeader: "#225588",
            },
        },
        {
            title: "Company Code",
            id: "company_code",
            width: 190,
            kind: GridCellKind.Number,
            align: "left",
            editable: false,
            themeOverride: {
                textHeader: "#225588",
            },
        },
        {
            title: "Printer properties",
            id: "printer_properties",
            width: 180,
            kind: GridCellKind.Number,
            align: "left",
            editable: false,
            themeOverride: {
                textHeader: "#225588",
            },
        },
        {
            title: "Invoicing",
            id: "invoicing",
            width: 100,
            kind: GridCellKind.Boolean,
            align: "center",
            editable: false,
            themeOverride: {
                textHeader: "#225588",
            },
        }
    ]
    
    const fetchLocationFiltered = async (filter, page = 0, rowCount = 50) => {
        let { data, status, statusText } = await api.get('/api/locations', { params: { filter: filter, page: page, rowCount: rowCount } })
        if (status === 200) {
            let response = (data.message);
            if (data.status === true) {
                let values = data.payload.data
                setLocations(values);
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
        navigate('/master/location/rw');
    }

    const saveLocation = (formData) => {
        let json = formData;

        api.post('/api/location', json, {
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
                    fetchLocationFiltered("",0);
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

    const deleteLocationProfile = (formData) => {
        let json = formData;
        let jsonData = JSON.stringify(json)
        setVisible(true)
        setForm(jsonData)
    }
    const softDelete = () =>{
       let formData = form
       if(visible === true){
          api.post('/api/location/delete', formData).then(({ data, status, statusText }) => {
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
                    fetchLocationFiltered("", 0);
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
    }
    // const timerDelay = 5 * 60 * 1000

    const startupFunc = () => {
        fetchLocationFiltered("", 0);
    }

    const onCellEdited = (cell, newValue) => {
        const indexes = columns;
        const [col, row] = cell;
        const key = indexes[col];
        let data = locations[row];
        data[key.id] = newValue.data;
        saveLocation(data);
    };
    
    useEffect(() => {
        startupFunc();
    }, []);

    const editFunc = (dataRow) => {
        let id = dataRow.location_code;
        navigate('/master/location/rw/?id=' + id);
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
                    <DataGrid rows={locations} columns={columns} title={'Location'}  isEdit={true} showFilter={true}  filterFunc={filterFunc} onCellEdited={onCellEdited} addFunc={add} editFunc={editFunc}  deleteFunc={deleteLocationProfile} />
                </CCardBody>
            </CCard>
        </>
    )
}

export default Index;