/* eslint-disable */
import React from 'react';
import CheckboxTree from 'react-checkbox-tree';
import Select from 'react-select'
// import makeAnimated from 'react-select/animated';
import ApiService from '../../../Masterservice/Service'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
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
    CFormTextarea,
    CRow,
  } from '@coreui/react-pro'
import { filter, result, zip } from 'lodash';


class BasicExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            elState:false,
            checked: [],
            expanded: [],
            privilege:[],
            onSearch:null,
            moduleCode:null,
            moduleOptions:[],
            userlist:[],
            nodesRaw:[],
            privageNode:[],
            user:null,
            userId:null,
            erMessage:null,
            isAnonymous:false
        }
        this.onCheck = this.onCheck.bind(this);
        this.onExpand = this.onExpand.bind(this);
        this.onFilterChange = this.onFilterChange.bind(this);
        this.filterTree = this.filterTree.bind(this);
        this.filterNodes = this.filterNodes.bind(this);
        this.onloadprivage = this.onloadprivage.bind(this)
        this.handleChangeModule = this.handleChangeModule.bind(this)
        this.handleChangeGroupUser = this.handleChangeGroupUser.bind(this)
        this.onClick = this.onClick.bind(this);
        this.onProcess = this.onProcess.bind(this)
        // this.fieldRest = this.fieldRest.bind(this)
    }
    
    onloadprivage = () =>{
        var moduleCode = this.state.moduleCode
        var checkStatus = this.state.moduleCode
        if(checkStatus === null){
            console.error("Record is not found")
        }else{
            if(checkStatus != null){
                let array1 = []
                ApiService.getPrivilege(moduleCode).then(rep => {array1.push(rep.data.data)}),
                this.setState({nodesRaw:array1})
                // ApiService.getPrivilegeRaw(moduleCode).then(rep => this.setState({nodesRaw:rep.data.data}))
                setTimeout(() => {this.findUniq()}, 1000)
            }
        }   
    }
    //  
    findUniq(){
        let ab = this.state.nodesRaw
        console.log("Hello", ab)

    }

    componentDidMount(){
        ApiService.retrieveModules()
        .then(rep => this.setState({moduleOptions:rep.data.data}))
        .then()
        .catch(err => console.error("Network Error %s",err))
        .finally
    }

    // ✅
    handleChangeModule(e) {
        this.setState({  moduleCode: e.value }, )
        setTimeout(() => {this.onloadprivage()}, 1000);
    }

    handleChangeGroupUser(e) {
        this.setState({  moduleCode: e.value }, )
    }
    
    fieldRest=()=>{
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            text: 'Do you want to Reset ?',
            icon: 'warning',
            confirmButtonText: 'Yes',
            allowEscapeKey:false
          }).then((e) => {if(e.isConfirmed === true){
            this.setState({checked:[],expanded:[], user:null, moduleCode:null})
          }})
    }
    submitForm =(e) =>{
        e.preventDefault()
        alert("thehhe")

    }
    onCheck(checked) {
        this.setState({checked});
        setTimeout(() => {this.onProcess()}, 1000);
    }
    onProcess(){
        let check = this.state.checked
        let nodeR = this.state.nodesRaw
        //✅ this one return match all the parameter !! otherwise not sort!
        // let match = nodeR.filter(arr=>Object.values(arr).every(value=>check.includes(value)))
        let match = nodeR.filter(arr=>Object.values(arr).some(value=>check.includes(value)))
        console.log(match,'list')
   }
    onExpand(expanded) {
        this.setState({ expanded });
    }
    onClick(clicked) {
        this.setState({ clicked });
    }
    onFilterChange(e) {
        this.setState({ filterText: e.target.value }, this.filterTree);
    }

    filterTree() {
        // Reset nodes back to unfiltered state
        if (!this.state.filterText) {
            this.setState((prevState) => ({
                nodesFiltered: prevState.nodes,
            }));

            return;
        }

        const nodesFiltered = (prevState) => (
            { nodesFiltered: prevState.nodes.reduce(this.filterNodes, []) }
        );

        this.setState(nodesFiltered);
    }

    filterNodes(filtered, node) {
        const { filterText } = this.state;
        const children = (node.children || []).reduce(this.filterNodes, []);

        if (
            // Node's label matches the search string
            node.label.toLocaleLowerCase().indexOf(filterText.toLocaleLowerCase()) > -1 ||
            // Or a children has a matching node
            children.length
        ) {
            filtered.push({ ...node, children });
        }

        return filtered;
    }
    
    render() {
        const {
            checked,
            expanded,
            filterText,
            nodesFiltered,
            privageNode,
            userlist,
            nodesRaw
            // nodes
        } = this.state;
        console.log(this.state.nodesRaw,"Check Row data")
        return (
              <CCard>
              <CCardBody>
                <CRow>
                    <CCol md={4}>
                    <CRow className="mb-3 d-flex">
                    <CFormLabel htmlFor="staticEmail" className="m-1" onClick={this.onloadprivage}>Search for module</CFormLabel>
                    <Select required options={this.state.moduleOptions} menuColor='red' width="100px" Value={this.state.moduleCode} defaultValue={{ label: "Select a module", value: 0 }}  onChange={this.handleChangeModule.bind(this)} />
                    </CRow>
                    <CRow className="mb-3 d-flex">
                    <CFormLabel htmlFor="staticEmail" className="m-1" onClick={this.onloadprivage}>User or Group</CFormLabel>
                    <Select required options={userlist} menuColor='red' width="100px" Value={this.state.user} defaultValue={{ label: "Select a group or user", value: 0 }}  onChange={this.handleChangeGroupUser.bind(this)} />
                    lll{this.state.nodesRaw.map((a)=> <p key={a.value}> |hello|{a.value}</p>)}
                    </CRow>
                    </CCol>
                    <CCol md={4}>
                    <CheckboxTree
                    checked={checked}
                    expanded={expanded}
                    expandOnClick
                    iconsClass="fa5"
                    nodes={this.state.nodesRaw} 
                    noCascade
                    // allowDuplicateValues
                    optimisticToggle={false}
                    onCheck={this.onCheck}
                    onClick={this.onClick}
                    onExpand={this.onExpand}
                    />
                    </CCol>
                    <CCol md={4}>
                    <CRow>
                        <CCol>
                        
                        </CCol>
                        <CCol md={12}>
                        <CButton size='sm' onClick={this.fieldRest} type={'reset'}>Reset</CButton>  <CButton color='info' onClick={this.submitForm} size='sm' disabled={this.state.isAnonymous ? true : false}>{this.state.userId ? "Update":"Add"}</CButton> <CButton color='dark' size='sm'>Back</CButton>
                        </CCol>
                        <CCol>
                        </CCol>
                    </CRow>
                    </CCol>
                </CRow>
 
              </CCardBody>
              </CCard>   
        );
    }
}

export default BasicExample;



