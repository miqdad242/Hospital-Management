import React, { useState, useRef, useEffect } from 'react'
import DataEditor, {
    GridCell,
    GridCellKind,
    GridColumn,
    NumberCell,
    Theme
} from "@glideapps/glide-data-grid";
import api from "../../../../api";
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
    CToaster
} from '@coreui/react-pro'
import ToastError from '../../../../components/ToastError';
import DataGrid from '../../../../components/DataGrid';

const Index = () => {

    const [locations, setLocations] = useState([])
    const [toast, addToast] = useState(0)
    const toaster = useRef()
    const columns = [
        {
            title: "Code",
            id: "location_code",
            width: 100,
            kind: GridCellKind.RowID,
            align: "left",
            editable: false
        },
        {
            title: "Name",
            id: "location_name",
            width: 100,
            kind: GridCellKind.Text,
            align: "left",
            editable: false
        },
        {
            title: "Next Number",
            id: "next_number",
            width: 100,
            kind: GridCellKind.Number,
            align: "left",
            editable: false
        },
        {
            title: "Price Markup Percentage",
            id: "price_markup_per",
            width: 180,
            kind: GridCellKind.Number,
            align: "left",
            format: (x) => x + ' %',
            editable: false
        },
        {
            title: "Default Printer",
            id: "default_printer",
            width: 100,
            kind: GridCellKind.Text,
            align: "left",
            editable: false
        },
        {
            title: "Prefix",
            id: "prefix",
            width: 100,
            kind: GridCellKind.Text,
            align: "left",
            editable: false
        },
        {
            title: "Value",
            id: "value",
            width: 100,
            kind: GridCellKind.Text,
            align: "left",
            editable: false
        },
        {
            title: "Invoicing",
            id: "invoicing",
            width: 100,
            kind: GridCellKind.Boolean,
            align: "left",
            editable: false
        },
        {
            title: "Price Applicable",
            id: "price_applicable",
            width: 120,
            kind: GridCellKind.Boolean,
            align: "left",
            editable: false
        }
    ]
    const addLocation = () => {
        let formData = {};
        columns.forEach((x)=>{
            let kind = x.kind
            let val = null
            switch (kind) {
                case GridCellKind.RowID:
                    val = null
                break;
                case GridCellKind.Text:
                    val = ''
                break;
                case GridCellKind.Number:
                    val = 0
                break;
                case GridCellKind.Boolean:
                    val = false
                break;
                default:
                    break;
            }
            formData[x.id] = val
        });
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
                    fetchLocations();
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
                    fetchLocations();
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
    const deleteLocation = (formData) => {
        let json = formData;
        api.post('/api/location/delete', json).then(({ data, status, statusText }) => {
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
                    fetchLocations();
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
    const fetchLocations = async () => {
        let { data, status, statusText } = await api.get('/api/locations')
        if (status === 200) {
            let response = (data.message);
            if (data.status === true) {
                let values = data.payload.data
                setLocations(values);
            } else {
                let toastFailMsg = (<ToastError response={response} />);
                addToast(toastFailMsg);
            }
        } else {
            let response = (data.message);
            let toastFailMsg = (<ToastError response={response} />);
            addToast(toastFailMsg);
        }
    };
    const timerDelay = 5 * 60 * 1000
    const startupFunc = () => {
        fetchLocations();
        const interval = setInterval(() => {
            fetchLocations();
        }, timerDelay);
        return () => { clearInterval(interval) };
    }
    const onCellEdited = (cell,newValue) => {
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
    return (
        <>
            <CToaster ref={toaster} push={toast} className='toaster toast-container p-3 position-fixed top-0 start-50 translate-middle-x' />
            <CCard>
                <CCardBody>
                    {/* <DataGrid rows={locations} columns={columns} title={'location'} onCellEdited={onCellEdited} addFunc={addLocation} deleteFunc={deleteLocation}/> */}
                </CCardBody>
            </CCard>
        </>
    )
}

export default Index;