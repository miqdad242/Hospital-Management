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
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody
} from '@coreui/react-pro'
import ToastError from '../../../../components/components/ToastError';
import DataGrid from '../../../../components/components/DataGrid';
import { useNavigate } from "react-router-dom";


const Index =()=>{

    const toaster = useRef()
    const navigate = useNavigate();
    const [toast, addToast] = useState(0)
    const [user,setUser] = useState([])
    const [visible, setVisible] = useState(false)
    const [form, setForm] = useState([])

    const columns = [
        {
            title: "User Code",
            id: "user_code",
            width: 120,
            kind: GridCellKind.Text,
            align: "left",
            editable: false
        },
        {
            title: "Department",
            id: "department_name",
            width: 120,
            kind: GridCellKind.Text,
            align: "left",
            editable: false
        },
		{
            title: "User name",
            id: "user_name",
            width: 120,
            kind: GridCellKind.Text,
            align: "left",
            editable: false
        },
		{
            title: "Email",
            id: "email",
            width: 200,
            kind: GridCellKind.Text,
            align: "left",
            editable: false
        },
        {
            title: "Mobile No",
            id: "mobile_no",
            width: 120,
            kind: GridCellKind.Text,
            align: "left",
            editable: false
        },
        {
            title: "Login ID",
            id: "login_id",
            width: 150,
            kind: GridCellKind.Text,
            align: "left",
            editable: false
        },
        {
            title: "Is Active",
            id: "is_active",
            width: 80,
            kind: GridCellKind.Boolean,
            align: "center",
            editable: false
        },
        {
            title: "Is Cashier",
            id: "is_cashier",
            width: 80,
            kind: GridCellKind.Boolean,
            align: "center",
            editable: false
        },
    ]

    const addUser =() => {
        navigate('/master/user/form');
    }

    const saveUser = (formData) =>{
        let json = formData;
        api.post('/api/user', json, {
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
                    fetchUser();
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

    const deleteUser = (formData) => {
       let jsonData = form;
        api.post('/api/user/delete', jsonData).then(({ data, status, statusText }) => {
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
                    fetchUserFiltered("",0);
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

    const fetchUser = async () => {
        let { data, status, statusText } = await api.get('/api/user')
        if (status === 200) {
            let response = (data.message);
            if (data.status === true) {
                let values = data.payload.data
                
                setUser(values);
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
        fetchUser();
        const interval = setInterval(() => {
            fetchUser();
        }, timerDelay);
        return () => { clearInterval(interval) };
    }

    // const onCellEdited = (cell,newValue) => {
    //     const indexes = columns;
    //     const [col, row] = cell;
    //     const key = indexes[col];
    //     let data = department[row];
    //     data[key.id] = newValue.data;
    //     saveUser(data);
    // };

    useEffect(() => {
        startupFunc();
    }, []);

    const editFunc = (dataRow) => {
        let id = dataRow.user_code;
        navigate('/master/user/form?id=' + id);
    }


    const filterFunc = (filter,pageCount,rowCount) => {
        if (filter.length >= 0) {
            fetchUserFiltered(filter,pageCount,rowCount);
        } else { fetchUserFiltered("",pageCount,rowCount); }
    }

    const fetchUserFiltered = async (filter,page = 0,rowCount = 50) => {
        let { data, status, statusText } = await api.get('/api/user',{ params: { filter: filter , page: page , rowCount:rowCount } })
        if (status === 200) {
            let response = (data.message);
            if (data.status === true) {
                let values = data.payload.data
                setUser(values);
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
                <CButton color="danger" onClick={() => deleteUser()} className='text-white'>DELETE</CButton>
            </CModalBody>
            </CModal>
            <CCard className='m-4'>
                <CCardBody className='p-5'>
                    <DataGrid rows={user} columns={columns} title={'Users'} 
                    // onCellEdited={onCellEdited} 
                    addFunc={addUser} deleteFunc={confirmDelete} filterFunc={filterFunc} showFilter={true} editFunc={editFunc} isEdit={true}/>
                </CCardBody>
            </CCard>
        </>
    )

}
export default Index