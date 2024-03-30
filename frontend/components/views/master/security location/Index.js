import { React, useState, useRef, useEffect } from 'react'
import api from '../../../api';
import { CButton, CCol, CForm, CFormSelect, CInputGroup, CToaster, CFormCheck, CFormLabel, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CRow } from '@coreui/react-pro';
import { CiLocationOn, CiSun } from 'react-icons/ci';
import DataGrid from '../../../components/DataGrid';
import { GridCellKind } from '@glideapps/glide-data-grid';
import ToastError from '../../../components/ToastError';
import ToastSuccess from '../../../components/ToastSuccess';

const Index = () => {
  const toaster = useRef();
  const [userData, setUserData] = useState([])
  const [selectedUserData, setSelectedUserData] = useState([])
  const [location, setLocations] = useState([])
  const [editedCell, setEditedCell] = useState(null);
  const [toast, addToast] = useState(0)

  const fetchUserData = async () => {
    let { data, status, statusText } = await api.get('/api/user', {
    });

    if (status === 200) {
      let response = data.message;
      if (data.status === true) {
        let values = data.payload.data;
        setUserData(values);
      } else {
        let toastFailMsg = (<ToastError response={response} />);
        addToast(toastFailMsg);
        console.log("err")
      }
    } else {
      let response = data.message;
      let toastFailMsg = (<ToastError response={response} />);
      addToast(toastFailMsg);
    }
  }
  const userChange = (e) => {
    let user = e.target.value.trim()

    setSelectedUserData(user)
    fetchUserSecurityLocation(user)
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserSecurityLocation = async (id) => {
    let { data, status, statusText } = await api.get(`/api/security/userlocation/${id}`)
    console.log("location", data)
    console.log("user ", id)

    if (status === 200) {
      let response = (data.message);
      if (data.status === true) {
        let values = data.payload.data

const groupedData = {};
values.forEach(item => {
  const key = `${item.location_code}-${item.user_code}`;

  if (!groupedData[key]) {
    groupedData[key] = { location_code: item.location_code, location_name: item.location_name, dealing_location: false, logging_location: false };
  }

  if (item.right_type === 'del') {
    groupedData[key].dealing_location = true;
  } else if (item.right_type === 'log') {
    groupedData[key].logging_location = true;
  }
});
const groupedArray = Object.values(groupedData);

console.log("grouped",groupedArray);
        setLocations(groupedArray);
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

  const relationColumns = [
    {
      title: "Location Name",
      id: "location_name",
      width: 200,
      kind: GridCellKind.RowID,
      align: "left",
      editable: false
    },
    {
      title: "Logging Location",
      id: "logging_location",
      width: 200,
      kind: GridCellKind.Boolean,
      align: "left",
      editable: false
    },
    {
      title: "Dealing Location",
      id: "dealing_location",
      width: 200,
      kind: GridCellKind.Boolean,
      align: "left",
      editable: false
    }
  ]
  const onCellEdited = (cell, newValue) => {
    const indexes = relationColumns;
    const [col, row] = cell;
    const key = indexes[col];
    let newData = [...location];
    newData[row][key.id] = newValue.data;
    setLocations(newData);
    console.log("on cell edit",newData)
    setEditedCell(cell);

  };


  const saveButtonSubmit = async () => {
    let changedLocationsRights = []
    location.forEach((item) => {
      if (item.logging_location === true) {
        changedLocationsRights.push({
          location_code: item.location_code,
          right_type: "log"
        });
      }
      if (item.dealing_location === true) {
        changedLocationsRights.push({
          location_code: item.location_code,
          right_type: "del"
        });
      }
    });
    let submitData ={
      rights: changedLocationsRights,
      user_code : selectedUserData
    }
    let { data, status, statusText } = await api.post(`/api/security/userlocationrights`, submitData)

    console.log("add data", submitData)
    if (status === 200) {
      let response = (data.message);
      if (data.status === true) {
        let toastFailMsg = (<ToastSuccess response={response} />);
        addToast(toastFailMsg);
        setTimeout(function(){
  }, 2000);
      } else {
        let toastFailMsg = (<ToastError response={response} />);
        addToast(toastFailMsg);
      }
    } else {
      // 
    }
  };

  // const handleSubmit = () => {
  //   // Use the checkedItems state as needed
  //   console.log('Checked Items:', checkedItems);
  //   // Add your submission logic here
  // };

  return (
    <div>
      <CToaster ref={toaster} push={toast} className='toaster toast-container p-3 position-fixed top-0 start-50 translate-middle-x' />
      <div className='pt-3'>
      <CForm id='locationRightsForm' >
        <CRow className='row'>
          <CCol className='col-3'>
          <CFormLabel className="col-form-label fs-3">User / User Group</CFormLabel>
            </CCol>
            <CCol className='col-3 pt-2'>
              <CFormSelect
              className='sm'
                aria-label="Default select example"
                value={selectedUserData}
                onChange={userChange}
                name='user'

              >
                <option value='' disabled selected>
                  
                </option>

                {userData &&
                  userData.map((user) => (
                    <option key={user.user_code.trim()} value={user.user_code.trim()}>
                      {user.user_name.trim()}
                    </option>
                  ))
                }
              </CFormSelect>
              </CCol>
          
          <CCol className='col-1 pt-2 offset-md-5'>
            <CButton onClick={saveButtonSubmit}>Update</CButton>
          </CCol>
          </CRow>
      </CForm>
      </div>
      <CCol md={12}>
        <DataGrid
          columns={relationColumns}
          rows={location}
          onCellEdited={onCellEdited}
          title={'Location List'}
          height={600}
          isActionColumns={false}
          isEdit={false}
        //editFunc={editFunc}
        //addFunc={addSupplierRelation}
        //deleteFunc={deletegroup}
        />
      </CCol>

      {/* <CCol md={12} className='bg-white'>
<CForm>
  {location.map((item) => (
    < div key={item.location_code} className='row ' style={{paddingLeft:'5%'}}>
        <div className='col-2 '><CFormLabel key={item.location_code}>{item.location_name}</CFormLabel></div>
        <div className='col-1'><CFormCheck id={item.is_assigned} checked={item.is_assigned} ></CFormCheck></div>
      
      
    </div>
  ))}
  <CButton color="primary" onClick={handleSubmit}>
    Submit
  </CButton>
</CForm>
</CCol> */}
      {/* <CCol md={8} className='bg-white'>
      <CForm>
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell >Location Name</CTableHeaderCell>
              <CTableHeaderCell>Assigned</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
          {location.map((item) => (
              <CTableRow key={item.location_code}>
                <CTableDataCell>{item.location_name}</CTableDataCell>
                <CTableDataCell>
                  <CFormCheck
                    id={item.location_code}
                    checked={item.user_code}
                    // onChange={(e) =>
                    //   handleCheckboxChange(e.target.checked)
                    // }
                    onChange={handleCheckboxChange}
                  />
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
        <CButton color="primary" onClick={handleSubmit}>
          Submit
        </CButton>
      </CForm>
    </CCol> */}
    </div>
  )

}

export default Index;