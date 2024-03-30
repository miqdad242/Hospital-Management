import React, { useState, useRef, useEffect } from "react";
import DataEditor, {
  GridCell,
  GridCellKind,
  GridColumn,
  NumberCell,
  Theme,
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
  CModalTitle,
} from "@coreui/react-pro";
import ToastError from "../../../components/ToastError";
import DataGrid from "../../../components/DataGrid";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [designations, setDesignations] = useState([]);
  const navigate = useNavigate();
  const [toast, addToast] = useState(0);
  const toaster = useRef();
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState([]);

  const columns = [
    {
      title: "Designation code",
      id: "designation_code",
      width: 220,
      kind: GridCellKind.Text,
      align: "left",
      editable: false,
    },
    {
      title: "Designation",
      id: "designation_name",
      width: 150,
      kind: GridCellKind.Text,
      align: "left",
      editable: false,
    },
  ];

  const fetchDesignationFiltered = async (filter, page = 0, rowCount = 50) => {
    let { data, status, statusText } = await api.get("/api/designation", {
      params: { filter: filter, page: page, rowCount: rowCount },
    });

    if (status === 200) {
      let response = data.message;
      console.log(response);
      if (data.status === true) {
        let values = data.payload.data;
        console.log(values);
        setDesignations(values);
      } else {
        //let toastFailMsg = (<ToastError response={response} />);
        //addToast(toastFailMsg);
      }
    } else {
      let response = data.message;
      let toastFailMsg = <ToastError response={response} />;
      addToast(toastFailMsg);
    }
  };

  const filterDesignation = (filter, pageCount, rowCount) => {
    if (filter.length > 0) {
      fetchDesignationFiltered(filter, pageCount, rowCount);
    } else {
      fetchDesignationFiltered("", pageCount, rowCount);
    }
  };

  const onCellEdited = (cell, newValue) => {
    const indexes = columns;
    const [col, row] = cell;
    const key = indexes[col];
    let data = designations[row];
    data[key.id] = newValue.data;
    saveDesignation(data);
  };
  const addDesignation = () => {
    navigate("/master/designation/form");
  };
  const saveDesignation = (formData) => {
    let json = formData;
    api
      .post("/api/designation", json, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(({ data, status, statusText }) => {
        if (status === 200) {
          let response = data.message;
          console.log(response);
          if (data.status === true) {
            let toastSuccessMsg = (
              <CToast
                autohide={true}
                delay={2000}
                visible={true}
                color="success"
                className="text-white align-items-center"
              >
                <div className="d-flex">
                  <CToastBody>{response}</CToastBody>
                  <CToastClose className="me-2 m-auto" white />
                </div>
              </CToast>
            );
            addToast(toastSuccessMsg);
            fetchDesignation();
          } else {
            let toastFailMsg = (
              <CToast
                autohide={true}
                delay={2000}
                visible={true}
                color="danger"
                className="text-white align-items-center"
              >
                <div className="d-flex">
                  <CToastBody>{response}</CToastBody>
                  <CToastClose className="me-2 m-auto" white />
                </div>
              </CToast>
            );
            addToast(toastFailMsg);
          }
        } else {
          let response = data.message;
          let toastFailMsg = (
            <CToast
              autohide={true}
              delay={2000}
              visible={true}
              color="danger"
              className="text-white align-items-center"
            >
              <div className="d-flex">
                <CToastBody>{response}</CToastBody>
                <CToastClose className="me-2 m-auto" white />
              </div>
            </CToast>
          );
          addToast(toastFailMsg);
        }
      });
  };

  const confirmDelete = (formData) => {
    let json = formData;

    let jsonData = JSON.stringify(json);
    setVisible(true);
    setForm(jsonData);
  };

  const deleteDesignation = (formData) => {
    let jsonData = form;
    //let jsonData = JSON.stringify(json)
    api
      .post("/api/designation/delete", jsonData)
      .then(({ data, status, statusText }) => {
        if (status === 200) {
          let response = data.message;
          if (data.status === true) {
            let toastSuccessMsg = (
              <CToast
                autohide={true}
                delay={2000}
                visible={true}
                color="success"
                className="text-white align-items-center"
              >
                <div className="d-flex">
                  <CToastBody>{response}</CToastBody>
                  <CToastClose className="me-2 m-auto" white />
                </div>
              </CToast>
            );
            addToast(toastSuccessMsg);
            fetchDesignationFiltered("", 0);
            setVisible(false);
          } else {
            let toastFailMsg = (
              <CToast
                autohide={true}
                delay={2000}
                visible={true}
                color="danger"
                className="text-white align-items-center"
              >
                <div className="d-flex">
                  <CToastBody>{response}</CToastBody>
                  <CToastClose className="me-2 m-auto" white />
                </div>
              </CToast>
            );
            addToast(toastFailMsg);
          }
        } else {
          let response = data.message;
          let toastFailMsg = (
            <CToast
              autohide={true}
              delay={2000}
              visible={true}
              color="danger"
              className="text-white align-items-center"
            >
              <div className="d-flex">
                <CToastBody>{response}</CToastBody>
                <CToastClose className="me-2 m-auto" white />
              </div>
            </CToast>
          );
          addToast(toastFailMsg);
        }
      });
  };
  const fetchDesignation = async () => {
    let { data, status, statusText } = await api.get("/api/designation");
    if (status === 200) {
      let response = data.message;
      if (data.status === true) {
        let values = data.payload.data;

        setDesignations(values);
      } else {
        let toastFailMsg = <ToastError response={response} />;
        //addToast(toastFailMsg);
      }
    } else {
      let response = data.message;
      let toastFailMsg = <ToastError response={response} />;
      addToast(toastFailMsg);
    }
  };
  const timerDelay = 5 * 60 * 1000;
  const startupFunc = () => {
    fetchDesignation();
    const interval = setInterval(() => {
      fetchDesignation();
    }, timerDelay);
    return () => {
      clearInterval(interval);
    };
  };
  useEffect(() => {
    startupFunc();
  }, []);

  const editFunc = (dataRow) => {
    let id = dataRow.designation_code;
    navigate("/master/designation/form?id=" + id);
  };

  return (
    <>
      <CToaster
        ref={toaster}
        push={toast}
        className="toaster toast-container p-3 position-fixed top-0 start-50 translate-middle-x"
      />
      <CModal alignment="center" visible={visible}>
        <CModalHeader>
          <CModalTitle>
            {" "}
            <b>Are you sure you want to delete ?</b>
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p className="text-primary">
            {" "}
            <b>
              This item will be deleted immediately. You can&apos;t undo this
              action
            </b>
          </p>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            CANCEL
          </CButton>{" "}
          &nbsp;
          <CButton
            color="danger"
            onClick={() => deleteDesignation()}
            className="text-white"
          >
            DELETE
          </CButton>
        </CModalBody>
      </CModal>
      <CCard className="m-4">
        <CCardBody className="p-5">
          <DataGrid
            rows={designations}
            columns={columns}
            title={"Designation"}
            filterFunc={filterDesignation}
            showFilter={true}
            editFunc={editFunc}
            isEdit={true}
            onCellEdited={onCellEdited}
            addFunc={addDesignation}
            deleteFunc={confirmDelete}
          />
        </CCardBody>
      </CCard>
    </>
  );
};

export default Index;
