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
  const [areaHeader, setAreaHeader] = useState({});
  const [toast, addToast] = useState(0);

  const toaster = useRef();
  const formHeader = useRef();

  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");

  const onSubmit = async () => {
    const formElement = document.querySelector("#FormHeader");
    if (formElement.checkValidity() === true) {
      let form = areaHeader;
      if (form.area_code == null || form.area_code == "") {
        // POST (Create a New record) !!
        let { data, status, statusText } = await api.post(`/api/area`, form);
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
      } else {
        // PUT (Update a record) !!
        let { data, status, statusText } = await api.post(`/api/area`, form);
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

  const locationDirect = () => {
    navigate("/master/area");
  };
  const loadField = (obj) => {
    let data = {};
    for (let i = 0; i < obj.length; i++) {
      data.area_code = obj[i].area_code;
      data.area_name = obj[i].area_name;
    }

    setAreaHeader(data);
  };

  const fetchProfile = async (id) => {
    if (id === null) {
      //
    } else {
      id = id.trim();
      let { data, status, statusText } = await api.get(`/api/area/${id}`);
      if (status === 200) {
        let response = data.message;
        if (data.status === true) {
          let areaObj = data.payload.data;
          loadField(areaObj);
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
      //
    } else {
      fetchProfile(id);
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
              <CFormLabel className="col-form-label fs-4">Area</CFormLabel>
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
                <CFormLabel>Area Code</CFormLabel>
              </CCol>
              <CCol md={3}>
                <CFormInput
                  inline="true"
                  readOnly
                  type="text"
                  name="area_code"
                  value={areaHeader.area_code}
                  onChange={({ target }) => {
                    let p = { ...areaHeader };
                    p["area_code"] = target.value;
                    setAreaHeader(p);
                  }}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={1} className=" col-form-label">
                <CFormLabel>Area</CFormLabel>
              </CCol>
              <CCol md={3}>
                <CFormInput
                  inline="true"
                  type="text"
                  name="area_name"
                  value={areaHeader.area_name}
                  required
                  onChange={({ target }) => {
                    let p = { ...areaHeader };
                    p["area_name"] = target.value.trimStart();
                    setAreaHeader(p);
                  }}
                  feedbackInvalid="Area Name Is Required."
                />
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </>
  );
};

export default Index;
