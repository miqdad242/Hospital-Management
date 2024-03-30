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
  const [unit, setunit] = useState([]);
  const navigate = useNavigate();
  const [toast, addToast] = useState(0);
  const toaster = useRef();
  const columns = [
    {
      title: "Unit Code",
      id: "unit_code",
      width: 150,
      kind: GridCellKind.RowID,
      align: "left",
      editable: false,
    },
    {
      title: "Unit Name",
      id: "unit_name",
      width: 210,
      kind: GridCellKind.Text,
      align: "left",
      editable: false,
    },
  ];
  const addUnit = () => {
    navigate("/master/unit/form");
   
  };

 
  const deleteUnit = (formData) => {
    let json = formData;
    let jsonData = JSON.stringify(json);
    api
      .post("/api/unit/delete", jsonData)
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
            fetchStockFiltered("",0,50)
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
  const timerDelay = 5 * 60 * 1000;
  const onCellEdited = (cell, newValue) => {
    const indexes = columns;
    const [col, row] = cell;
    const key = indexes[col];
    let data = unit[row];
    data[key.id] = newValue.data;
  };
  useEffect(() => {
  }, []);

  const editFunc = (dataRow) => {
    let id = dataRow.unit_code;
    navigate("/master/unit/form?id=" + id);
  };
  const fetchStockFiltered = async (filter, page = 0, rowCount = 50) => {
    let { data, status, statusText } = await api.get("/api/unit", {
      params: { filter: filter, page: page, rowCount: rowCount },
    });

    if (status === 200) {
      let response = data.message;
      if (data.status === true) {
        let values = data.payload.data;
        setunit(values);
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

  const filterStock = (filter, pageCount, rowCount) => {
    if (filter.length > 0) {
      fetchStockFiltered(filter, pageCount, rowCount);
    } else {
      fetchStockFiltered("", pageCount, rowCount);
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
            rows={unit}
            columns={columns}
            title={"Unit"}
            editFunc={editFunc}
            showFilter={true}
            isEdit={true}
            onCellEdited={onCellEdited}
            addFunc={addUnit}
            filterFunc={filterStock}
            deleteFunc={deleteUnit}
          />
        </CCardBody>
      </CCard>
    </>
  );
};

export default Index;
