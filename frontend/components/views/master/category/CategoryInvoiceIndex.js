import {
    CButton,
    CCard,
    CCardBody,
    CModal,
    CModalBody,
    CModalHeader,
    CModalTitle,
    CToast,
    CToastBody,
    CToastClose,
    CToaster,
  } from "@coreui/react-pro";
  import React, { useEffect, useRef, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import DataGrid from "../../../components/DataGrid";
  import { GridCellKind } from "@glideapps/glide-data-grid";
  import api from "../../../api";
  import ToastError from "../../../components/ToastError";

  const Index = () => {
    const toaster = useRef();
    const [visible, setVisible] = useState(false);
    const [toast, addToast] = useState(0);
    const [categoryInvoices, setCategoryInvoices] = useState([]);
    const [form, setForm] = useState([]);
    const navigate = useNavigate();


    const columns = [
      {
        title: "Category Invoice",
        id: "category_invoice_code",
        width: 220,
        kind: GridCellKind.Text,
        align: "left",
        editable: false,
      },
      {
        title: "Employee Name",
        id: "employee_name",
        width: 220,
        kind: GridCellKind.Text,
        align: "left",
        editable: false,
      },
      {
        title: "Count Total",
        id: "count_total",
        width: 150,
        kind: GridCellKind.Text,
        align: "left",
        editable: false,
      },
    ];

    
    const addCategoryInvoice = () => {
      navigate("/master/categoryinvoice/form");
    };

    const fetchCategoryInvoice = async () => {
      let { data, status, statusText } = await api.get("/api/categoryinvoices");
      if (status === 200) {
        let response = data.message;
        if (data.status === true) {
          let values = data.payload.data;
          console.log(values); //designation_code
  
          setCategoryInvoices(values);
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
      fetchCategoryInvoice();
      const interval = setInterval(() => {
        fetchCategoryInvoice();
      }, timerDelay);
      return () => {
        clearInterval(interval);
      };
    };

    const fetchCategoryInvoiceFiltered = async (
      filter,
      page = 0,
      rowCount = 50
    ) => {
      let { data, status, statusText } = await api.get(
        "/api/categoryinvoicefilter",
        {
          params: { filter: filter, page: page, rowCount: rowCount },
        }
      );
  
      if (status === 200) {
        let response = data.message;
        console.log(response);
        if (data.status === true) {
          let values = data.payload.data;
          console.log(values);
          setCategoryInvoices(values);
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

    const filterCategoryInvoice = (filter, pageCount, rowCount) => {
      if (filter.length > 0) {
        fetchCategoryInvoiceFiltered(filter, pageCount, rowCount);
      } else {
        fetchCategoryInvoiceFiltered("", pageCount, rowCount);
      }
    };

    const deleteCategoryInvoice = (formData) => {
      let jsonData = form;
      console.log(jsonData);
      //let jsonData = JSON.stringify(json)
      api
        .post("/api/categoryinvoice/delete", jsonData)
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
              fetchCategoryInvoiceFiltered("", 0);
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

    const confirmDelete = (formData) => {
      let json = formData;
  
      let jsonData = JSON.stringify(json);
      setVisible(true);
      setForm(jsonData);
    };

    const onCellEdited = (cell, newValue) => {
      const indexes = columns;
      const [col, row] = cell;
      const key = indexes[col];
      let data = categoryInvoices[row];
      console.log(data);
      data[key.id] = newValue.data;
      saveCategoryInvoice(data);
    };

    const saveCategoryInvoice = (formData) => {
      let json = formData;
      api
        .post("/api/categoryinvoice", json, {
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
              fetchCategoryInvoice();
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
        })
        .catch((error) => {
          console.error("Error updating category invoice:", error);
        });
    };

    const editFunc = (dataRow) => {
      let id = dataRow.invoice_code;
      console.log(id);
      navigate("/master/categoryinvoice/form?id=" + id);
    };


    useEffect(() => {
      startupFunc();
    }, []);
  


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
        <b>Are you sure you want to delete ?</b>
        </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p className="text-primary">
            <b>
              This item will be deleted immediately. You can&apos;t undo this
              action
            </b>
          </p>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            CANCEL
          </CButton>
          &nbsp;
          <CButton
            color="danger"
            onClick={() => deleteCategoryInvoice()}
            className="text-white"
          >
            DELETE
          </CButton>
        </CModalBody>
      </CModal>

      <CCard className="m-4">
        <CCardBody className="p-5">
          <DataGrid
            rows={categoryInvoices}
            columns={columns}
            title={"Category Invoice"}
            showFilter={true}
            addFunc={addCategoryInvoice}
            filterFunc={filterCategoryInvoice}
            deleteFunc={confirmDelete}
            isEdit={true}
            onCellEdited={onCellEdited}
            editFunc={editFunc}
          />
        </CCardBody>
      </CCard>
      </>
    );

  };

  export default Index;