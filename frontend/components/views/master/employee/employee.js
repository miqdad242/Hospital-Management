import React, { useState, useRef, useEffect } from "react";
import DataEditor, {
  GridCell,
  GridCellKind,
  GridColumn,
  NumberCell,
  Theme,
} from "@glideapps/glide-data-grid";
import { GrNewWindow } from "react-icons/gr";
import { BsPlusCircle } from "react-icons/bs";
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
  CFormSelect,
  CFormSwitch,
  CToast,
  CInputGroup,
  CInputGroupText,
  CToastBody,
  CButton,
  CCardHeader,
  CToastClose,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CToaster,
  CFormTextarea,
  CNav,
  CNavLink,
  CNavItem,
  CTabContent,
  CTabPane,
} from "@coreui/react-pro";
import ToastError from "../../../components/ToastError";
import ToastSuccess from "../../../components/ToastSuccess";
import Select from "../../../components/Select";
import DataGrid from "../../../components/DataGrid";
import { useSearchParams } from "react-router-dom";
// import {IoMdArrowRoundBack,IoArrowBackCircleOutline} from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import { size } from "lodash";

const Index = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [employeeHeader, setEmployeeHeader] = useState({});
  const [toast, addToast] = useState(0);
  const [departmentCode, setDepartmentCode] = useState([]);

  const toaster = useRef();
  const formHeader = useRef();

  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");

  const onSubmit = async () => {
    const formElement = document.querySelector("#FormHeader");
    console.log(formElement);
    if (formElement.checkValidity() === true) {
      console.log(employeeHeader);
      let form = employeeHeader;
      console.log(form);
      if (form.employee_code == null || form.employee_code == "") {
        // POST (Create a New record) !!
        let { data, status, statusText } = await api.post(
          `/api/employee`,
          form
        );
        console.log(form);
        if (status === 200) {
          console.log(data);
          let response = data.message;
          if (data.status === true) {
            let toastFailMsg = <ToastSuccess response={response} />;
            addToast(toastFailMsg);
            setTimeout(function () {
              locationDirect();
            }, 2000);
          } else {
            let toastFailMsg = <ToastError response={response} />;
            addToast(toastFailMsg);
          }
        } else {
          //
        }
      } else {
        // PUT (Update a record)
        let { data, status, statusText } = await api.post(
          `/api/employee`,
          form
        );
        console.log(data);
        console.log(form);
        if (status === 200) {
          let response = data.message;
          if (data.status === true) {
            let toastFailMsg = <ToastSuccess response={response} />;
            addToast(toastFailMsg);
            setTimeout(function () {
              locationDirect();
            }, 2000);
          } else {
            let toastFailMsg = <ToastError response={response} />;
            addToast(toastFailMsg);
          }
        } else {
          //
        }
      }
    }
    setValidated(true);
  };

  const fetchDepartmentCodes = async () => {
    try {
      const response = await api.get("/api/designationcodes");
      console.log("hello world");
      console.log(response);
      const data = response.data.payload.data;
      console.log(data);
      setDepartmentCode(data);
    } catch (error) {
      console.error("Error fetching department codes:", error);
    }
  };

  const locationDirect = () => {
    navigate("/master/employee");
  };
  const loadField = (obj) => {
    let data = {};
    for (let i = 0; i < obj.length; i++) {
      data.employee_code = obj[i].employee_code;
      data.employee_name = obj[i].employee_name;
      data.department_id = obj[i].department_id;
    }

    setEmployeeHeader(data);
  };

  const fetchProfile = async (id) => {
    if (id === null) {
      //
    } else {
      id = id.trim();
      let { data, status, statusText } = await api.get(`/api/employee/${id}`);
      if (status === 200) {
        let response = data.message;
        if (data.status === true) {
          let employeeObj = data.payload.data;
          console.log(employeeObj);
          loadField(employeeObj);
        } else {
          let toastFailMsg = <ToastError response={response} />;
          addToast(toastFailMsg);
        }
      } else {
        let response = data.message;
        let toastFailMsg = <ToastSuccess response={response} />;
        addToast(toastFailMsg);
      }
    }
  };

  useEffect(() => {
    if (id === null) {
      fetchDepartmentCodes();
      //
    } else {
      fetchProfile(id);
      fetchDepartmentCodes();
    }
  }, []);

  return (
    <>
      <CToaster
        ref={toaster}
        push={toast}
        className="toaster toast-container p-3 position-fixed top-0 start-50 translate-middle-x"
      />
      <CCard className="m-4">
        <CCardHeader className="pt-1 pb-1">
          <CRow className="align-items-center">
            <CCol md={1} lg={1} className="fs-2 d-flex h-100 ps-4">
              <IoMdArrowRoundBack
                style={{ fontSize: "24px", cursor: "pointer" }}
                onClick={() => {
                  window.history.back();
                }}
              />
            </CCol>
            <CCol md={7}>
              <CFormLabel className="col-form-label fs-4">Employee</CFormLabel>
            </CCol>
            <CCol md={4} className="text-end pe-5">
              <CButton
                type="button"
                className="col-md-3 col-form-label fs-6"
                color="success"
                variant="outline"
                onClick={() => {
                  onSubmit();
                }}
              >
                {id === null ? "Add" : "Update"}
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody style={{ padding: "2rem" }}>
          <CForm
            ref={formHeader}
            id="FormHeader"
            className="needs-validation"
            noValidate
            validated={validated}
          >
            <CRow className="mb-3">
              <CCol md={1} className=" col-form-label">
                <CFormLabel>Employee Code</CFormLabel>
              </CCol>
              <CCol md={3}>
                <CFormInput
                  inline="true"
                  readOnly
                  type="text"
                  name="employee_code"
                  value={employeeHeader.employee_code}
                  onChange={({ target }) => {
                    let p = { ...employeeHeader };
                    p["employee_code"] = target.value;
                    setEmployeeHeader(p);
                  }}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={1} className=" col-form-label">
                <CFormLabel>Employee</CFormLabel>
              </CCol>
              <CCol md={3}>
                <CFormInput
                  inline="true"
                  required
                  type="text"
                  name="employee_name"
                  value={employeeHeader.employee_name}
                  onChange={({ target }) => {
                    let p = { ...employeeHeader };
                    p["employee_name"] = target.value.trimStart();
                    setEmployeeHeader(p);
                  }}
                  feedbackInvalid="Employee Name Is Required."
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol md={1} className=" col-form-label">
                <CFormLabel>Department Name</CFormLabel>
              </CCol>
              <CCol>
                <CFormSelect
                  inline={true}
                  required
                  name="department_id"
                  value={employeeHeader.department_id}
                  onChange={({ target }) => {
                    let p = { ...employeeHeader };
                    p["department_id"] = target.value.trimStart();
                    setEmployeeHeader(p);
                  }}
                  feedbackInvalid="Department Name Is Required."
                >
                  <option value="">Select Department ID</option>
                  {departmentCode.map((code) => (
                    <option
                      key={code.designation_name}
                      value={code.designation_code}
                    >
                      {code.designation_name}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </>
  );
};

export default Index;
