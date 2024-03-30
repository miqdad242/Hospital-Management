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
    const [userGroup,setUserGroup] = useState([])
    const [visible, setVisible] = useState(false)
    const [form, setForm] = useState([])

    const columns = [
        {
            title: "Group Code",
            id: "group_code",
            width: 110,
            kind: GridCellKind.RowID,
            align: "center",
            editable: false
        },
        {
            title: "Group Name",
            id: "group_name",
            width: 120,
            kind: GridCellKind.Text,
            align: "center",
            editable: false
        },
    ]

    const addUserGroup =() => {
        navigate('/master/usergroup/form');
    }

    /*const saveUserGroup = (formData) =>{
        let json = formData;
        api.post('/api/user/group', json, {
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
                    fetchUserGroup();
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
    }*/

    const confirmDelete = (formData) => {
        let json = formData;

        let jsonData = JSON.stringify(json)
        setVisible(true)
        setForm(jsonData)
       
   }

    const deleteUserGroup = (formData) => {
       let jsonData = form;
        api.post('/api/user/group/delete', jsonData).then(({ data, status, statusText }) => {
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
                    fetchUserGroupFiltered("",0);
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

    const fetchUserGroup = async () => {
        let { data, status, statusText } = await api.get('/api/user/group')
        if (status === 200) {
            let response = (data.message);
            if (data.status === true) {
                let values = data.payload.data
                
                setUserGroup(values);
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
        fetchUserGroup();
        const interval = setInterval(() => {
            fetchUserGroup();
        }, timerDelay);
        return () => { clearInterval(interval) };
    }

    /* const onCellEdited = (cell,newValue) => {
    //     const indexes = columns;
    //     const [col, row] = cell;
    //     const key = indexes[col];
    //     let data = department[row];
    //     data[key.id] = newValue.data;
    //     saveUserGroup(data);
    };*/

    useEffect(() => {
        startupFunc();
    }, []);

    const editFunc = (dataRow) => {
        let id = dataRow.group_code;
        navigate('/master/usergroup/form?id=' + id);
    }


    const filterFunc = (filter,pageCount,rowCount) => {
        if (filter.length >= 0) {
            fetchUserGroupFiltered(filter,pageCount,rowCount);
        } else { fetchUserGroupFiltered("",pageCount,rowCount); }
    }

    const fetchUserGroupFiltered = async (filter,page = 0,rowCount = 50) => {
        let { data, status, statusText } = await api.get('/api/user/group',{ params: { filter: filter , page: page , rowCount:rowCount } })
        if (status === 200) {
            let response = (data.message);
            if (data.status === true) {
                let values = data.payload.data
                setUserGroup(values);
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
                <CButton color="danger" onClick={() => deleteUserGroup()} className='text-white'>DELETE</CButton>
            </CModalBody>
            </CModal>
            <CCard className='m-4'>
                <CCardBody className='p-5'>
                    <DataGrid rows={userGroup} columns={columns} title={'User Group'} 
                    // onCellEdited={onCellEdited} 
                    addFunc={addUserGroup} deleteFunc={confirmDelete} filterFunc={filterFunc} showFilter={true} editFunc={editFunc} isEdit={true}/>
                </CCardBody>
            </CCard>
        </>
    )

}
export default Index