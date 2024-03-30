import React from 'react'
import {
  CiLocationOn, CiUser
} from 'react-icons/ci'
import { BiChart, BiBarChartSquare,BiSolidReport,BiCalculator, BiSolidUser , BiCog    } from 'react-icons/bi'
import { CNavItem, CNavTitle, CNavGroup } from '@coreui/react-pro'

const cssClass = "mx-2"
const _nav = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/dashboard",
    icon: <BiBarChartSquare className={cssClass} />,
  },
  // {
  //   component: CNavGroup,
  //   name: 'MIS',
  //   icon: <BiSolidReport  className={cssClass} />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Sales Report',
  //       to: '/dashboard',
  //       icon: <BiCalculator  className={cssClass} />,
  //     },
  //   ]
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Transactions',
  //   icon: <BiChart className={cssClass} />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Patient Registration',
  //       to: '/master/patientregistation',
  //       icon: <BiSolidUser  className={cssClass} />,
  //     }, {
  //       component: CNavItem,
  //       name: 'Invoicing',
  //       to: '/master/invoice',
  //       icon: <BiChart className={cssClass} />,
  //     }, {
  //       component: CNavItem,
  //       name: 'Sample Acceptance',
  //       to: '/master/sampleacceptance',
  //       icon: <BiChart className={cssClass} />,
  //     }, {
  //       component: CNavItem,
  //       name: 'Lab Report',
  //       to: '/master/labreport',
  //       icon: <BiChart className={cssClass} />,
  //     }, {
  //       component: CNavItem,
  //       name: 'BarCode',
  //       to: '/master/barCodeGenerate',
  //       icon: <BiChart className={cssClass} />,
  //     }
  //   ]
  // },
  {
    component: CNavGroup,
    name: "Settings",
    icon: <BiCog className={cssClass} />,
    items: [
      {
        component: CNavGroup,
        name: "Enterprise Settings",
        icon: <CiLocationOn className={cssClass} />,
        items: [
          {
            component: CNavItem,
            name: "Company",
            to: "/master/company",
            icon: <CiLocationOn className={cssClass} />,
          },
          {
            component: CNavItem,
            name: "Area",
            to: "/master/area",
            icon: <CiLocationOn className={cssClass} />,
          },
          {
            component: CNavItem,
            name: "Location",
            to: "/master/location",
            icon: <CiLocationOn className={cssClass} />,
          },
        ],
      },
      // {
      //   component: CNavGroup,
      //   name: 'Laboratory Settings',
      //   icon: <CiLocationOn className={cssClass} />,
      //   items: [
      //     {
      //       component: CNavItem,
      //       name: 'Sample Tracking',
      //       to: '/master/sample',
      //       icon: <CiLocationOn className={cssClass} />,
      //     },
      //     {
      //       component: CNavItem,
      //       name: 'Satellite Lab',
      //       to: '/master/satellite/laboratory',
      //       icon: <CiLocationOn className={cssClass} />,
      //     },
      //     {
      //       component: CNavItem,
      //       name: 'Collecting Center',
      //       to: '/master/collecting/center',
      //       icon: <CiLocationOn className={cssClass} />,
      //     },
      //     {
      //       component: CNavItem,
      //       name: 'Staff',
      //       to: '/master/staff',
      //       icon: <CiLocationOn className={cssClass} />,
      //     },
      //     {
      //       component: CNavItem,
      //       name: 'Analyzer-Type',
      //       to: '/master/analyzertype',
      //       icon: <CiLocationOn className={cssClass} />,
      //     },
      //     {
      //       component: CNavItem,
      //       name: 'Analyzer',
      //       to: '/master/analyzer',
      //       icon: <CiLocationOn className={cssClass} />,
      //     },
      //     {
      //       component: CNavItem,
      //       name: 'Test',
      //       to: '/master/test/test',
      //       icon: <CiLocationOn className={cssClass} />,
      //     }, {
      //       component: CNavItem,
      //       name: 'Element Group',
      //       to: '/master/elementgroup',
      //       icon: <CiLocationOn className={cssClass} />,
      //     },
      //     {
      //       component: CNavItem,
      //       name: 'Element',
      //       to: '/master/element',
      //       icon: <CiLocationOn className={cssClass} />,
      //     },
      //     {
      //       component: CNavItem,
      //       name: 'Speciman-Type',
      //       to: '/master/specimantype',
      //       icon: <CiLocationOn className={cssClass} />,
      //     },
      //     {
      //       component: CNavItem,
      //       name: 'Organism',
      //       to: '/master/organism',
      //       icon: <CiLocationOn className={cssClass} />,
      //     },
      //     {
      //       component: CNavItem,
      //       name: 'Antibiotic',
      //       to: '/master/antibiotic',
      //       icon: <CiLocationOn className={cssClass} />,
      //     }
      //   ]
      // },
      {
        component: CNavGroup,
        name: "HR Settings",
        icon: <CiLocationOn className={cssClass} />,
        items: [
          {
            component: CNavItem,
            name: "Employee",
            to: "/master/employee",
            icon: <CiLocationOn className={cssClass} />,
          },
          {
            component: CNavItem,
            name: "Employee Invoice",
            to: "/master/employeeinvoiceindex",
            icon: <CiLocationOn className={cssClass} />,
          },
          {
            component: CNavItem,
            name: "Designation",
            to: "/master/designation",
            icon: <CiLocationOn className={cssClass} />,
          },
          {
            component: CNavItem,
            name: "Department",
            to: "/master/department",
            icon: <CiLocationOn className={cssClass} />,
          },
        ],
      },
      {
        component: CNavGroup,
        name: "Business Settings",
        icon: <CiLocationOn className={cssClass} />,
        items: [
          {
            component: CNavItem,
            name: "Category",
            to: "/master/category",
            icon: <CiLocationOn className={cssClass} />,
          },
          
          {
            component: CNavItem,
            name: "Category Invoice",
            to: "/master/categoryinvoice",
            icon: <CiLocationOn className={cssClass} />,
          },
          {
            component: CNavItem,
            name: "Sub Category",
            to: "/master/subcategory",
            icon: <CiLocationOn className={cssClass} />,
          },
          {
            component: CNavItem,
            name: "Billing Category",
            to: "/master/billcategory",
            icon: <CiLocationOn className={cssClass} />,
          },
          {
            component: CNavItem,
            name: "Price-Category",
            to: "/master/pricecategory",
            icon: <CiLocationOn className={cssClass} />,
          },
          {
            component: CNavItem,
            name: "Stock Category",
            to: "/master/stock/category",
            icon: <CiLocationOn className={cssClass} />,
          },
          {
            component: CNavItem,
            name: "Generic-Types",
            to: "/master/generictype",
            icon: <CiLocationOn className={cssClass} />,
          },
          {
            component: CNavItem,
            name: "Units",
            to: "/master/unit",
            icon: <CiLocationOn className={cssClass} />,
          },
          {
            component: CNavItem,
            name: "Consultation Area",
            to: "/master/consultationareas",
            icon: <CiLocationOn className={cssClass} />,
          },
          {
            component: CNavItem,
            name: "Doctor",
            to: "/master/doctor",
            icon: <CiLocationOn className={cssClass} />,
          },
          {
            component: CNavItem,
            name: "Doctor Group",
            to: "/master/doctorgroup",
            icon: <CiLocationOn className={cssClass} />,
          },
          {
            component: CNavItem,
            name: "Speciality",
            to: "/master/speciality",
            icon: <CiLocationOn className={cssClass} />,
          },
          {
            component: CNavItem,
            name: "Membership",
            to: "/master/memberships",
            icon: <CiLocationOn className={cssClass} />,
          },
          {
            component: CNavItem,
            name: "Qualifications",
            to: "/master/profilequalifications",
            icon: <CiLocationOn className={cssClass} />,
          },
          {
            component: CNavItem,
            name: "Debtor Group",
            to: "/master/debtor/group",
            icon: <CiLocationOn className={cssClass} />,
          },
          {
            component: CNavItem,
            name: "Debtor",
            to: "/master/debtor",
            icon: <CiLocationOn className={cssClass} />,
          },
          {
            component: CNavItem,
            name: "Supplier Group",
            to: "/master/suppliergroup",
            icon: <CiLocationOn className={cssClass} />,
          },
          {
            component: CNavItem,
            name: "Supplier",
            to: "/master/supplier",
            icon: <CiLocationOn className={cssClass} />,
          },
          {
            component: CNavItem,
            name: "Items",
            to: "/master/items",
            icon: <CiLocationOn className={cssClass} />,
          },

          {
            component: CNavItem,
            name: "Registration-Category",
            to: "/master/registration/category",
            icon: <CiLocationOn className={cssClass} />,
          },
        ],
      },
      {
        component: CNavGroup,
        name: "Security",
        icon: <CiLocationOn className={cssClass} />,
        items: [
          {
            component: CNavItem,
            name: "User-Group",
            to: "/master/usergroup",
            icon: <CiLocationOn className={cssClass} />,
          },
          {
            component: CNavItem,
            name: "User",
            to: "/master/user",
            icon: <CiUser className={cssClass} />,
          },
          {
            component: CNavItem,
            name: "Security Right",
            to: "/master/event",
            icon: <CiLocationOn className={cssClass} />,
          },
          {
            component: CNavItem,
            name: "Event Wise Right",
            to: "/master/security/right",
            icon: <CiLocationOn className={cssClass} />,
          },
          {
            component: CNavItem,
            name: "Location Wise Right",
            to: "/master/user/location/rights",
            icon: <CiLocationOn className={cssClass} />,
          },
          {
            component: CNavItem,
            name: "Event Type",
            to: "/master/event",
            icon: <CiLocationOn className={cssClass} />,
          },
        ],
      },
    ],
  },
];

export default _nav
