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
} from "@coreui/react-pro";
import ToastError from "../../../components/ToastError";
import DataGrid from "../../../components/DataGrid";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [subcategories, setsubcategories] = useState([]);
  const navigate = useNavigate();
  const [toast, addToast] = useState(0);
  const toaster = useRef();
  const columns = [
    {
      title: "Sub Category Code",
      id: "sub_category_code",
      width: 150,
      kind: GridCellKind.RowID,
      align: "left",
      editable: false,
    },
    {
      title: "Sub Category Name",
      id: "sub_category_name",
      width: 210,
      kind: GridCellKind.Text,
      align: "left",
      editable: false,
    },
  ];
  const addCategory = () => {
    navigate("/master/subcategory/form");
   
  };

  const saveCategory = (formData) => {
    let json = formData;
    api
      .post("/api/subcategory", json, {
        headers: {
          "Content-Type": "application/json",
        },
      })
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
            fetchsubcategories();
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

  const deletesubCategory = (formData) => {
    let json = formData;
    let jsonData = JSON.stringify(json);
    api
      .post("/api/subcategory/delete", jsonData)
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
            fetchsubcategories();
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

  const fetchsubcategories = async () => {
    let { data, status, statusText } = await api.get("/api/subcategory");
    if (status === 200) {
      let response = data.message;
      if (data.status === true) {
        let values = data.payload.data;
        setsubcategories(values);
      } else {
        let toastFailMsg = <ToastError response={response} />;
        addToast(toastFailMsg);
      }
    } else {
      let response = data.message;
      let toastFailMsg = <ToastError response={response} />;
      addToast(toastFailMsg);
    }
  };
  const timerDelay = 5 * 60 * 1000;

  const onCellEdited = (cell, newValue) => {
    const indexes = columns;
    const [col, row] = cell;
    const key = indexes[col];
    let data = subcategories[row];
    data[key.id] = newValue.data;
    saveCategory(data);
  };
  useEffect(() => {
    fetchsubcategories()
  }, []);

  const editFunc = (dataRow) => {
    let id = dataRow.sub_category_code;
    navigate("/master/subcategory/form?id=" + id);
  };
  const fetchSubFiltered = async (filter, page = 0, rowCount = 50) => {
    let { data, status, statusText } = await api.get("/api/subcategory", {
      params: { filter: filter, page: page, rowCount: rowCount },
    });

    if (status === 200) {
      let response = data.message;
      if (data.status === true) {
        let values = data.payload.data;
        setsubcategories(values);
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

  const filterSub = (filter, pageCount, rowCount) => {
    if (filter.length > 0) {
      fetchSubFiltered(filter, pageCount, rowCount);
    } else {
      fetchSubFiltered("", pageCount, rowCount);
    }
  };
  return (
    <>
      <CToaster
        ref={toaster}
        push={toast}
        className="toaster toast-container p-3 position-fixed top-0 start-50 translate-middle-x"
      />
      <CCard className="m-4">
        <CCardBody className="p-5">
          <DataGrid
            rows={subcategories}
            columns={columns}
            title={"Sub Category"}
            editFunc={editFunc}
            showFilter={true}
            isEdit={true}
            onCellEdited={onCellEdited}
            addFunc={addCategory}
            filterFunc={filterSub}
            deleteFunc={deletesubCategory}
          />
        </CCardBody>
      </CCard>
    </>
  );
};

export default Index;
