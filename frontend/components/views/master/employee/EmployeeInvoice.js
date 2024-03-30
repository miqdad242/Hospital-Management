import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
  CToaster,
} from "@coreui/react-pro";
import { useEffect, useRef, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../../api";
import DataGrid from "../../../components/DataGrid";
import { GridCellKind } from "@glideapps/glide-data-grid";
import ToastSuccess from "../../../components/ToastSuccess";
import ToastError from "../../../components/ToastError";

const Index = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [employeeInvoiceHeader, setEmployeeInvoiceHeader] = useState({
    employee_name: "",
    doctor_name: "",
    employee_payment: "",
  });
  const [toast, addToast] = useState(0);

  const toaster = useRef();
  const formHeader = useRef();

  const [employeeName, setEmployeeName] = useState([]);
  const [doctorName, SetDoctorName] = useState([]);
  const [employeeInvoices, setEmployeeInvoices] = useState([]);

  const [employeeSelected, setEmployeeSelected] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");

  const columns = [
    {
      title: "Employee Name",
      id: "employee_name",
      width: 220,
      kind: GridCellKind.Text,
      align: "left",
      editable: false,
    },
    {
      title: "Doctor Name",
      id: "doctor_name",
      width: 220,
      kind: GridCellKind.Text,
      align: "left",
      editable: false,
    },
    {
      title: "Payment",
      id: "employee_payment",
      width: 150,
      kind: GridCellKind.Text,
      align: "left",
      editable: false,
    },
  ];

  // const fetchEmployeeNames = async () => {
  //   try {
  //     const response = await api.get("/api/employeenamesforinvoice");
  //     console.log("hello world");
  //     console.log(response);
  //     const data = response.data.payload.data;
  //     console.log(data);
  //     setEmployeeName(data);
  //   } catch (error) {
  //     console.error("Error fetching employee names:", error);
  //   }
  // };

  const fetchDoctorNames = async () => {
    try {
      const response = await api.get("/api/doctornamesforinvoice");
      console.log("hello world");
      console.log(response);
      const data = response.data.payload.data;
      console.log(data);
      SetDoctorName(data);
    } catch (error) {
      console.error("Error fetching doctor names:", error);
    }
  };

  // Fetch employee names
  useEffect(() => {
    const fetchEmployeeNames = async () => {
      try {
        const response = await api.get("/api/employeenamesforinvoice");
        const data = response.data.payload.data;
        setEmployeeName(data);
      } catch (error) {
        console.error("Error fetching employee names:", error);
      }
    };
    fetchEmployeeNames();
    fetchDoctorNames();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "employee_name" && !employeeSelected) {
      setEmployeeSelected(true);
      setEmployeeInvoiceHeader((prevHeader) => ({
        ...prevHeader,
        [name]: value,
      }));
    } else if (name !== "employee_name") {
      setEmployeeInvoiceHeader((prevHeader) => ({
        ...prevHeader,
        [name]: value,
      }));
    }
  };

  const locationDirect = () => {
    navigate("/master/employeeinvoiceindex");
  };

  const addEmployeeInvoice = () => {
    const totalPayment = employeeInvoices.reduce((total, invoice) => {
      return total + parseFloat(invoice.employee_payment);
    }, 0);

    const newInvoice = {
      ...employeeInvoiceHeader,
      payment_total:
        totalPayment + parseFloat(employeeInvoiceHeader.employee_payment),
    };

    setEmployeeInvoices((prevInvoices) => [...prevInvoices, newInvoice]);

    //employee_name unchanged
    setEmployeeInvoiceHeader((prevHeader) => ({
      ...prevHeader,
      doctor_name: "",
      employee_payment: "",
      payment_total:
        totalPayment + parseFloat(employeeInvoiceHeader.employee_payment),
    }));
  };

  const onSubmit = async () => {
    const formElement = document.querySelector("#FormHeader");
    console.log(formElement);
    if (formElement.checkValidity() === true) {
      console.log(employeeInvoiceHeader);
      let form = employeeInvoiceHeader;
      console.log(form);
      if (form.invoice_code == null || form.invoice_code == "") {
        // POST (Create a New record) !!
        let { data, status, statusText } = await api.post(
          `/api/employeeinvoice`,
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
          `/api/employeeinvoice`,
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
  return (
    <>
      <CToaster
        ref={toaster}
        push={toast}
        className="toaster toast-container p-3 position-fixed top-0 start-50
          translate-middle-x"
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
              <CFormLabel className="col-form-label fs-4">
                Employee Invoice
              </CFormLabel>
            </CCol>
            <CCol md={4} className="text-end pe-5">
              <CButton
                type="button"
                className="col-md-3 col-form-label fs-6"
                color="success"
                variant="outline"
                onClick={addEmployeeInvoice}
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
            <CRow>
              <CCol md={2} className=" col-form-label">
                <CFormLabel>Employee Name</CFormLabel>
              </CCol>
              <CCol>
                <CFormSelect
                  className="w-10"
                  inline={true}
                  required
                  name="employee_name"
                  value={employeeInvoiceHeader.employee_name}
                  onChange={handleInputChange}
                  feedbackInvalid="Employee Name Is Required."
                >
                  <option value="">Select</option>
                  {employeeName.map((empname) => (
                    <option
                      key={empname.employee_name}
                      value={empname.employee_name}
                    >
                      {empname.employee_name}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={2} className=" col-form-label mt-3">
                <CFormLabel>Doctor Name</CFormLabel>
              </CCol>
              <CCol>
                <CFormSelect
                  className="w-10 mt-3"
                  inline={true}
                  name="doctor_name"
                  value={employeeInvoiceHeader.doctor_name}
                  onChange={handleInputChange}
                  feedbackInvalid="Doctor Name Is Required."
                >
                  <option value="">Select</option>
                  {doctorName.map((empname) => (
                    <option
                      key={empname.doctor_name}
                      value={empname.doctor_name}
                    >
                      {empname.doctor_name}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol md={1} className=" col-form-label mt-3">
                <CFormLabel>Payment</CFormLabel>
              </CCol>
              <CCol md={3}>
                <CFormInput
                  className="w-auto mt-3"
                  inline="true"
                  type="text"
                  name="employee_payment"
                  value={employeeInvoiceHeader.employee_payment}
                  //   onChange={({ target }) => {
                  //     let p = { ...employeeInvoiceHeader };
                  //     p["employee_payment"] = target.value.trimStart();
                  //     setEmployeeInvoiceHeader(p);
                  //   }}
                  onChange={handleInputChange}
                />
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
      <CCard className="m-4">
        <CCardBody className="p-5">
          <DataGrid rows={employeeInvoices} columns={columns} isActionColumns={false} />
          <CRow>
            <CCol md={1} className=" col-form-label mt-3 offset-md-5">
              <CFormLabel>Total</CFormLabel>
            </CCol>
            <CCol md={3}>
              <CFormInput
                className="w-auto mt-3"
                inline="true"
                required
                readOnly
                type="text"
                name="payment_total"
                value={employeeInvoiceHeader.payment_total}
                onChange={handleInputChange}
              />
            </CCol>
            <CCol md={12} className="text-end pe-5">
              <CButton
                type="button"
                className="col-md-3 col-form-label fs-6"
                color="success"
                variant="outline"
                onClick={() => {
                  onSubmit();
                }}
              >
                SAVE
              </CButton>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};

export default Index;
