import React, { useState, useRef, useEffect } from 'react'
import DataEditor, {
    GridCell,
    GridCellKind,
    GridColumn,
    NumberCell,
    Theme
} from "@glideapps/glide-data-grid";
import {
    GrNewWindow
} from 'react-icons/gr'
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
    CCardBody, CFormSelect, CFormSwitch,
    CToast, CInputGroup, CInputGroupText,
    CToastBody,
    CButton,
    CCardHeader,
    CToastClose,
    CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter,
    CToaster,
    CFormTextarea,
    CNav, CNavLink, CNavItem, CTabContent, CTabPane
} from '@coreui/react-pro'
import ToastError from '../../../components/ToastError';
import ToastSuccess from '../../../components/ToastSuccess';
import Select from '../../../components/Select';
import DataGrid from '../../../components/DataGrid';
import { useSearchParams } from 'react-router-dom';
// import {IoMdArrowRoundBack,IoArrowBackCircleOutline} from "react-icons/io5";
import {IoMdArrowRoundBack} from "react-icons/io";
import { useNavigate } from "react-router-dom";

import { size } from 'lodash';


const Index = () => {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false)
    const [Supplier_Header, setHeader] = useState({
      // supplier_group_code: '',
     //  supplier_group_name: '',
    })
    const [toast, addToast] = useState(0)
    const [suppliergroupCode, setsuppliergroupCode] = useState([]);
    const [supplierList, setSupplierList] = useState([]);
    const [selectOption, setSelectOption] = useState();
    const toaster = useRef();
    const formHeader = useRef();
    



   // const [supplier , setsupplier] = useState([]);

    const [supplierSelected, setSupplierSelected] = useState(false);

    const columns = [
      {
        title: "Supplier group Code",
        id: "supplier_group_id",
        width: 220,
        kind: GridCellKind.Text,
        align: "left",
        editable: false,
      },
      {
        title: "Supplier Group  Name",
        id: "supplier_group_name",
        width: 220,
        kind: GridCellKind.Text,
        align: "left",
        editable: false,
      },
      
    ];

/*
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      if (name === "supplier_name" && !supplierSelected) {
        setSupplierSelected(true);
        setHeader((prevHeader) => ({
          ...prevHeader,
          [name]: value,
        }));
      } else if (name !== "supplier_name") {
        setHeader((prevHeader) => ({
          ...prevHeader,
          [name]: value,
        }));
      }
    };
    */
  


    
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get('id');



    // const addSupplier = () => {
      
    //   const newRow = {
    //     // Define properties of your row object
    //     // For example:
    //     id: supplier.length + 1,
    //     supplierCode: `supplier_group_id${supplier.length + 1}`,
    //     supplierGroupName: `supplier_group_name${supplier.length + 1}`,
    //     // Add more properties as needed
    //   };
    //   setsupplier([...supplier, newRow]);

    // };
      
/*
      const supplierrelation = async () =>{
        const formElement = document.querySelector("#FormHeader");
        if (formElement.checkValidity() === true) {
            let form  =  Supplier_Header
            if(form.supplier_code == null || form.supplier_code == '' ){
                // POST (Create a New record) !!
                let { data, status, statusText } = await api.post(`/api/supplierrelations`,form)
                if (status === 200) {
                    let response = (data.message);
                    if (data.status === true) {
                        let toastFailMsg = (<ToastSuccess response={response} />);
                        addToast(toastFailMsg);
                        setTimeout(function(){
                            locationDirect()
                    }, 2000);
                    } else {
                        let toastFailMsg = (<ToastError response={response} />);
                        addToast(toastFailMsg);
                    }
                }else{
                    // 
                }
            }else{
                // PUT (Update a record) !!
                let { data, status, statusText } = await api.post(`/api/supplier`,form)
                if (status === 200) {
                    let response = (data.message);
                    if (data.status === true) {
                        let toastFailMsg = (<ToastSuccess response={response} />);
                        addToast(toastFailMsg);
                        setTimeout(function(){
                            locationDirect()
                    }, 2000);
                    } else {
                        let toastFailMsg = (<ToastError response={response} />);
                        addToast(toastFailMsg);
                    }
                }else{
                    // 
                }

            }   
        }
        setValidated(true)  
      }
      */



   


    const onSubmit = async() =>{
        const formElement = document.querySelector("#FormHeader");
        if (formElement.checkValidity() === true) {
            let form  =  Supplier_Header
            form.details = supplierList;
            console.log(supplierList);
            console.log("supplier save",form);
            if(form.supplier_code == null || form.supplier_code == '' ){
                // POST (Create a New record) !!
                let { data, status, statusText } = await api.post(`/api/supplier`,form)

                if (status === 200) {
                    let response = (data.message);
                    if (data.status === true) {
                        let toastFailMsg = (<ToastSuccess response={response} />);
                        addToast(toastFailMsg);
                        setTimeout(function(){
                            locationDirect()
                    }, 2000);
                    } else {
                        let toastFailMsg = (<ToastError response={response} />);
                        addToast(toastFailMsg);
                    }
                }else{
                    // 
                }
            }else{
                // PUT (Update a record) !!
                let { data, status, statusText } = await api.post(`/api/supplier`,form)
                console.log(form)
                console.log(data)
                if (status === 200) {
                    let response = (data.message);
                    if (data.status === true) {
                        let toastFailMsg = (<ToastSuccess response={response} />);
                        addToast(toastFailMsg);
                        setTimeout(function(){
                            locationDirect()
                    }, 2000);
                    } else {
                        let toastFailMsg = (<ToastError response={response} />);
                        addToast(toastFailMsg);
                    }
                }else{
                    // 
                }

            }   
        }
        setValidated(true)  
    }


    const fetchsuppliergroupCodes = async () => {
        try {
          const response = await api.get("api/supplier_groupes");
          console.log("hello world");
          console.log(response);
          const data = response.data.payload.data;
          console.log(data);
          setsuppliergroupCode(data);
        } catch (error) {
          console.error("Error fetching department codes:", error);
        }
      };
/*
      const fetchdetails = async () => {
        let { data, status, statusText } = await api.get('/api/get_suppliers')
        if (status === 200) {
            let response = (data.message);
            if (data.status === true) {
                let values = data.payload.data
                for (let index = 0; index < values.length; index++) {
                    const element = values[index];
                   // element.label = element.division_name;
                    element.value = element.supplier_group_code;
                    element.value = element.supplier_group_name;
                    values[index] = element;
                }
                setHeader(values);
            } else {
                let toastFailMsg = (<ToastError response={response} />);
                addToast(toastFailMsg);
            }
        } else {
            let response = (data.message);
            let toastFailMsg = (<ToastError response={response} />);
            addToast(toastFailMsg);
        }
      }
*/

    /*  
    const fetchDivisions = async () => {
      let { data, status, statusText } = await api.get('/api/division')
      if (status === 200) {
          let response = (data.message);
          if (data.status === true) {
              let values = data.payload.data
              for (let index = 0; index < values.length; index++) {
                  const element = values[index];
                  element.label = element.division_name;
                  element.value = element.division_code;
                  values[index] = element;
              }
              setDivisions(values);
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
  */




    const locationDirect = () => {
        navigate('/master/supplier');
      }
    const loadField = (obj)=>{
        let data = {}
        for(let i = 0; i < obj.length; i++){
            data.supplier_code= obj[i].supplier_code;
            data.supplier_name =obj[i].supplier_name;
            data.supplier_group_id =obj[i].supplier_group_id;
            data.address= obj[i].address;
            data.active= obj[i].active;
            data.resident = obj[i].resident ;
            data.telephone=obj[i].telephone;
            data.mobile=obj[i].mobile;
           // data.resident=obj[i].resident;
            data.supplier_nic=obj[i].supplier_nic;
            data.supplier_birthday=obj[i].supplier_birthday;
            data.supplier_group_code=obj[i].supplier_group_code;
           // data.supplier_group_name    =   obj[i].supplier_group_name;
            data.details=[];

            data.details = obj[i].details ? obj[i].details.map((detail) => ({
              supplier_group_code: detail.supplier_group_code,
              //supplier_group_name: detail.supplier_group_name,
         //     // Add more fields from detail if needed
          })) : [];
          

    
        }

        setHeader(data)
        setSupplierList([data])
        
        
      }




/*
      const onHeaderSave = () => {
        const formSupplier = formHeader.current;
        let formInfo = new FormData(formElement);
        var formData = {};
        formInfo.forEach(function (value, key) {
            formData[key] = value;
        });
        if (formData["supplier_code"] === "") {
            formData["supplier_code"] = null;
        }
        formData["calculate"] = formData["calculate"] === "on" ? true : false;
        formData["sperate_barcode"] = formData["sperate_barcode"] === "on" ? true : false;
        formData["upper"] = Number(formData["upper"]);
        formData["lower"] = Number(formData["lower"]);
        formData["critical_upper"] = Number(formData["critical_upper"]);
        formData["critical_lower"] = Number(formData["critical_lower"]);
        formData["decimal_places"] = Number(formData["decimal_places"]);
        formData["keywords"] = keywords;
        formData["mappings"] = mappings;
        formData["agewise_references"] = ageWiseReferences;
        saveElement(formData);

    }
    */





      /*
       const onHeaderSave = () => {
        const formElement = formHeader.current;
        let formInfo = new FormData(formElement);
        var formData = {};
        formInfo.forEach(function (value, key) {
            formData[key] = value;
        });
        if (formData["element_code"] === "") {
            formData["element_code"] = null;
        }
        formData["calculate"] = formData["calculate"] === "on" ? true : false;
        formData["sperate_barcode"] = formData["sperate_barcode"] === "on" ? true : false;
        formData["upper"] = Number(formData["upper"]);
        formData["lower"] = Number(formData["lower"]);
        formData["critical_upper"] = Number(formData["critical_upper"]);
        formData["critical_lower"] = Number(formData["critical_lower"]);
        formData["decimal_places"] = Number(formData["decimal_places"]);
        formData["keywords"] = keywords;
        formData["mappings"] = mappings;
        formData["agewise_references"] = ageWiseReferences;
        saveElement(formData);

    }
    */


     


      const fetchProfile = async(id) => {
        if(id === null){
            // 
        }else {
            id  = id.trim()
                let { data, status, statusText } = await api.get(`/api/getbyid/${id}`)
            if (status === 200) {
                let response = (data.message);
                if (data.status === true) {
                    let supplierObj = data.payload.data
                    loadField(supplierObj);
                } else {
                    let toastFailMsg = (<ToastError response={response} />);
                    addToast(toastFailMsg);
                }
            } else {
                let response = (data.message);
                let toastFailMsg = (<ToastSuccess response={response} />);
                addToast(toastFailMsg);
            }
        }
       
    }


const addSupplier = ()=>{
  let p = supplierList  //hold a list of supplier
  p.push(Supplier_Header);  // Supplier_Header is the state variable that holds the details of the supplier being added  ,,   Supplier_Header is then added to the p array using the push method. This effectively adds the new supplier to the end of the list.
 setSupplierList(p);  //  The state variable supplierList is updated with the new array p using the setSupplierList function. This updates the component's state with the new list of suppliers.
 setHeader({...Supplier_Header}) //  Additionally, setHeader({...Supplier_Header}) is called to reset the Supplier_Header state variable. This clears the input fields for the next supplier entry
}


    // delete supplier function in use state method
    const deletesupplier = (rowIndex) => {
      const updatedSupplierList = [...supplierList];
      updatedSupplierList.splice(rowIndex, 1);
      setSupplierList(updatedSupplierList);
    };
    
    
/*
    const onSubmitAddOrUpdateDetails = (e) => {
      if (keywordForm.index === undefined || keywordForm.index === null) {
          let p = [...keywords];
          p.push(keywordForm);
          setKeywords(p);
      } else {
          let p = [...keywords];
          p[keywordForm.index] = (keywordForm);
          setKeywords(p);
      }
      let t = { ...keywordForm };
      t.default = false;
      t.keyword = "";
      t.index = null;
      setKeywordForm(t);
  }

  */





    useEffect(()=>{
        if(id === null){
            fetchsuppliergroupCodes()
         //   fetchdetails()
            
        }else{
            fetchProfile(id)
            fetchsuppliergroupCodes()
           // fetchdetails()
        }
    },[])


    return (
        <>
            <CToaster ref={toaster} push={toast} className='toaster toast-container p-3 position-fixed top-0 start-50 translate-middle-x' />
            <CCard className='m-4'>
                <CCardHeader className='pt-1 pb-1'>
                    <CRow className="align-items-center">
                        <CCol md={1} lg={1} className='fs-2 d-flex h-100 ps-4'> 
                            <IoMdArrowRoundBack style={{ fontSize: '24px', cursor:'pointer' }} onClick= {()=>{window.history.back();}}/>
                        </CCol>
                        <CCol md={7}> 
                            <CFormLabel className="col-form-label fs-4">Supplier</CFormLabel>
                        </CCol>
                        <CCol md={4} className='text-end pe-5'>
                            <CButton type="button" className="col-md-3 col-form-label fs-6" color="success" variant='outline' onClick={() => { onSubmit(); }} >{id ===null ? 'Add':'Update'}</CButton>
                        </CCol>
                    </CRow>
                </CCardHeader>
                <CCardBody style={{padding:'2rem'}}>

                    <CForm ref={formHeader} id="FormHeader" className='needs-validation' noValidate validated={validated}>
                        <CRow className="mb-3">
                            <CCol md={2} className=' col-form-label'>
                            <CFormLabel style={{ width: '220px' }} >Supplier code</CFormLabel>
                            </CCol>
                            <CCol md={3}> 
                                <CFormInput inline="true" readOnly 
                                    type="text"
                                    name="supplier_code"
                                    value={Supplier_Header.supplier_code}
                                    onChange={({ target }) => { let p = { ...Supplier_Header }; p["supplier_code"] = (target.value); setHeader(p); }}
                                />
                            </CCol>
                            </CRow>

                            <CRow className="mb-3">
                            <CCol md={2} className=' col-form-label'>
                            <CFormLabel style={{ width: '220px' }} >Supplier name</CFormLabel>
                            </CCol>
                            <CCol md={3}>
                                <CFormInput inline="true"
                                    type="text"
                                    name="supplier_name"
                                    value={Supplier_Header.supplier_name}
                                    required
                                    onChange={({ target }) => { let p = { ...Supplier_Header}; p["supplier_name"] = (target.value.trimStart()); setHeader(p); }}
                                    feedbackInvalid="Supplier Groupe Name Is Required."
                                />
                            </CCol>
                            </CRow>

                            <CRow className="mb-3">
                            <CCol md={2} className=' col-form-label'>
                            <CFormLabel style={{ width: '220px' }} >Address</CFormLabel>
                            </CCol>
                            <CCol md={3}>
                                <CFormInput inline="true"
                                    type="text"
                                    name="address"
                                    value={Supplier_Header.address}
                                    required
                                    onChange={({ target }) => { let p = { ...Supplier_Header}; p["address"] = (target.value.trimStart()); setHeader(p); }}
                                    feedbackInvalid="Supplier Groupe Name Is Required."
                                />
                            </CCol>
                            </CRow>

                            <CRow className="mb-3">
                            <CCol md={2} className=' col-form-label'>
                            <CFormLabel style={{ width: '220px' }} >Telephone Number</CFormLabel>
                            </CCol>
                            <CCol md={3}>
                                <CFormInput inline="true"
                                    type="text"
                                    name="telephone"
                                    value={Supplier_Header.telephone}
                                    required
                                    onChange={({ target }) => { let p = { ...Supplier_Header}; p["telephone"] = (target.value.trimStart()); setHeader(p); }}
                                    feedbackInvalid="Valid Telephone number is required"
                                    minLength={10}
                                    maxLength={10}
                                />
                            </CCol>
                            </CRow>


                            <CRow className="mb-3">
                            <CCol md={2} className=' col-form-label'>
                            <CFormLabel style={{ width: '220px' }} >Mobile Number</CFormLabel>
                            </CCol>
                            <CCol md={3}>
                                <CFormInput inline="true"
                                    type="text"
                                    name="mobile"
                                    value={Supplier_Header.mobile}
                                    required
                                    onChange={({ target }) => { let p = { ...Supplier_Header}; p["mobile"] = (target.value.trimStart()); setHeader(p); }}
                                    feedbackInvalid="Valid Mobile number is required"
                                    minLength={10}
                                    maxLength={10}
                                    
                                />
                            </CCol>
                            </CRow>




                            <CRow className="mb-3">
                            <CCol md={2} className=' col-form-label'>
                            <CFormLabel style={{ width: '220px' }} >Supplier NIC</CFormLabel>
                            </CCol>
                            <CCol md={3}>
                                <CFormInput inline="true"
                                    type="text"
                                    name="supplier_nic"
                                    value={Supplier_Header.supplier_nic}
                                    required
                                    onChange={({ target }) => { let p = { ...Supplier_Header}; p["supplier_nic"] = (target.value.trimStart()); setHeader(p); }}
                                    feedbackInvalid="Valid NIC Number is required."
                                    minLength={10}
                                    maxLength={10}
                                    
                                />
                            </CCol>
                            </CRow>


                            <CRow className="mb-3">
                            <CCol md={2} className=' col-form-label'>
                            <CFormLabel style={{ width: '220px' }} >Supplier Birthday</CFormLabel>
                            </CCol>
                            <CCol md={3}>
                                <CFormInput inline="true"
                                    type="date"
                                    name="supplier_birthday"
                                    value={Supplier_Header.supplier_birthday}
                                    required
                                    onChange={({ target }) => { let p = { ...Supplier_Header}; p["supplier_birthday"] = (target.value.trimStart()); setHeader(p); }}
                                    feedbackInvalid="Valid Date Number is required."
                                />
                            </CCol>
                            </CRow>

  <CRow className="mb-3">
  <CCol md={2} className="col-form-label">
    <CFormLabel style={{ width: '220px' }}>Active</CFormLabel>
  </CCol>
  <CCol md={3}>
    <div>
      <CFormSwitch size="xl"
        inline
        name="active"
        checked={Supplier_Header.active}
        // id="yes"
        // label="Yes"
        onChange={({target}) => {
          console.log(target);
          let p = { ...Supplier_Header };
          p["active"] =  target.checked;
          setHeader(p);
        }}
      />
    </div>
  </CCol>
</CRow>


<CRow className="mb-3">
  <CCol md={2} className="col-form-label">
    <CFormLabel style={{ width: '220px' }}>Resident</CFormLabel>
  </CCol>
  <CCol md={3}>
    <div>
      <CFormSwitch size="xl"
        inline
        name="resident"
        checked={Supplier_Header.resident}
        // id="yes"
        // label="Yes"
        onChange={({target}) => {
          console.log(target);
          let p = { ...Supplier_Header };
          p["resident"] =target.checked;
          setHeader(p);
        }}
      />
    </div>
  </CCol>
</CRow>


{/* <CRow className="mb-3">
  <CCol md={2} className="col-form-label">
    <CFormLabel style={{ width: '220px' }}>Resident</CFormLabel>
  </CCol>
  <CCol md={3}>
    <div>
      <CFormCheck
        inline
        type="radio"
        name="resident"
        id="yes"
        label="Yes"
        checked={Doctor_Header.resident === 'True'}
        onChange={() => {
          let p = { ...Doctor_Header };
          p["resident"] = 'True';
          setHeader(p);
        }}
      />
      <CFormCheck
        inline
        type="radio"
        name="resident"
        id="no"
        label="No"
        checked={Doctor_Header.resident === 'No'}
        onChange={() => {
          let p = { ...Doctor_Header };
          p["resident"] = 'No';
          setHeader(p);
        }}
      />
    </div>
  </CCol>
</CRow> */}


              <CRow>
              <CCol md={2} className=" col-form-label">
                <CFormLabel>Supplier Groupe Name</CFormLabel>
              </CCol>
              <CCol>
                <CFormSelect
                  inline={true}
                  required
                  name="supplier_name"
                  value={Supplier_Header.supplier_group_id}
                  onChange={( e ) => {
                    let p = { ...Supplier_Header };
                  //  p["supplier_code"] = e.target.selectedOptions[0].value.trimStart();
                    p["supplier_group_id"] = e.target.selectedOptions[0].value.trimStart();
                    p["supplier_group_name"] = e.target.selectedOptions[0].label.trimStart();
                   // p["supplier_group_code"] = e.target.selectedOptions[0].label.trimStart();
                    setHeader(p);
                  }}
                  feedbackInvalid="Supplier Group  Is Required."
                  //onChange={handleInputChange}
                >
                  <option value="">Select supplier group</option>
                  {suppliergroupCode.map((code) => (
                    <option
                      key={code.supplier_group_name}
                      value={code.supplier_group_code}
                    >
                      {code.supplier_group_name}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
            </CRow>

            <CRow>
              
              <CCol md={4} className="text-end pe-5">
              <CButton
                type="button"
                className="col-md-6 col-form-label fs-6"
                color="success"
                variant="outline"
                onClick={addSupplier}
              >
                {id === null ? "Add Group name " : "Update group"}
              </CButton>
            </CCol>
                        
                        
             
            </CRow>

           
          <DataGrid rows={supplierList}  columns={columns}   isActionColumns={true} isEdit = {false} deleteFunc={deletesupplier}    />
            </CForm>
            </CCardBody>
                </CCard>

                
        </>
        
    )
}

export default Index;