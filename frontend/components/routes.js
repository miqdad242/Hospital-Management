import { sample } from "lodash";
import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const SignUp = React.lazy(() => import("./views/auth/register/Register"));

const Area = React.lazy(() => import("./views/master/area/Index"));
const AreaForm = React.lazy(() => import("./views/master/area/area"));

const Billingcategory = React.lazy(() => import("./views/master/billingcategory/Index"));
const BillcategoryForm = React.lazy(() => import("./views/master/billingcategory/billingcategory"));


const Company = React.lazy(() => import("./views/master/company/Index"));
const CompanyProfile = React.lazy(() =>
  import("./views/master/company/Company")
);

const Category = React.lazy(() => import("./views/master/category/Index"));
const CategoryForm = React.lazy(() =>
  import("./views/master/category/category")
);

const CategoryInvoice = React.lazy(() => import("./views/master/category/CategoryInvoiceIndex"));
const CategoryInvoiceForm = React.lazy(() =>
import("./views/master/category/CategoryInvoice")
);

const Location = React.lazy(() => import("./views/master/location/Index"));
const LocationForm = React.lazy(() =>
  import("./views/master/location/Location")
);

const User = React.lazy(() => import("./views/master/users/Index"));
const UserForm = React.lazy(() => import("./views/master/users/Users"));

const UserGroup = React.lazy(() => import("./views/master/user group/Index"));
const UserGroupForm = React.lazy(() =>
  import("./views/master/user group/UserGroup")
);


const Unit = React.lazy(() => import('./views/master/units/Index'))
const UnitForm = React.lazy(() => import('./views/master/units/unit'))

const userLocationRights = React.lazy(() =>
  import("./views/master/security location/Index")
);


const Doctor_groupe = React.lazy(() =>
  import("./views/master/Doctor_Groupe/Index")
);
const Doctor_groupe_form = React.lazy(() =>
  import("./views/master/Doctor_Groupe/doctor_groupe")
);

//supplier group route
const Supplier_groupe = React.lazy(() =>
  import("./views/master/Supplier_Groupe/Index")
);
const Supplier_groupe_form = React.lazy(() =>
  import("./views/master/Supplier_Groupe/supplier_groupe")
);

const subcategory = React.lazy(() =>
  import("./views/master/sub category/index")
);
const subcategoryForm = React.lazy(() =>
  import("./views/master/sub category/subcategory")
);

//stock category
const StockCategory = React.lazy(() =>
  import("./views/master/stock category/index")
);
const StockCategoryForm = React.lazy(() =>
  import("./views/master/stock category/stockCategory")
);

//Doctor
const Doctor = React.lazy(() => import("./views/master/doctor/Index"));
const Doctor_form = React.lazy(() => import("./views/master/doctor/doctor"));

//supplier
const Supplier = React.lazy(() => import("./views/master/supplier/Index"));
const Supplier_form = React.lazy(() => import("./views/master/supplier/supplier"));



//item
const Item = React.lazy(() => import("./views/master/items/Index"));
const ItemForm = React.lazy(() => import("./views/master/items/items"));

const Designation = React.lazy(() =>
  import("./views/master/designation/Index")
);
const DesignationForm = React.lazy(() =>
  import("./views/master/designation/designation")
);

const Employee = React.lazy(() => import("./views/master/employee/Index"));
const EmployeeForm = React.lazy(() =>
  import("./views/master/employee/employee")
);

const EmployeeInvoice = React.lazy(() => import("./views/master/employee/EmployeeInvoiceIndex"));
const EmployeeInvoiceForm = React.lazy(() =>
  import("./views/master/employee/EmployeeInvoice")
);

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/login", name: "Login" },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  { path: "/user", name: "User", exact: true },
  { path: "/user/register", name: "Registration", element: SignUp },

  {
    path: "/master/doctorgroup",
    name: "Doctor_groupe",
    element: Doctor_groupe,
    exact: false,
  },
  {
    path: "/master/Doctor_Groupe/doctor_groupe",
    name: "Doctor_groupe",
    element: Doctor_groupe_form,
    exact: false,
  },

  //supplier group route

  {
    path: "/master/suppliergroup",
    name: "Supplier_groupe",
    element: Supplier_groupe,
    exact: false,
  },
  {
    path: "/master/Supplier_Groupe/supplier_groupe",
    name: "supplier_groupe",
    element: Supplier_groupe_form,
    exact: false,
  },

  { path: "/master/doctor", name: "Doctor", element: Doctor, exact: false },
  {
    path: "/master/doctor/form",
    name: "Doctor",
    element: Doctor_form,
    exact: false,
  },

  //Supplier

  { path: "/master/supplier", name: "Supplier", element: Supplier, exact: false },
  {
    path: "/master/supplier/form",
    name: "Doctor",
    element: Supplier_form,
    exact: false,
  },


  { path: '/master/unit', name: 'Units', element: Unit , exact: false },

  { path: '/master/user/location/rights', name: 'location-Rights', element: userLocationRights , exact: false },

  { path: '/master/doctor', name: 'Doctor', element: Doctor , exact: false },
  { path: '/master/doctor/form', name: 'Doctor', element: Doctor_form , exact: false },

  { path: "/master/area", name: "Area", element: Area, exact: false },
  { path: "/master/area/form", name: "Area", element: AreaForm, exact: false },

  { path: "/master/billcategory", name: "BillingCategory", element: Billingcategory, exact: false },
  { path: "/master/billcategory/form", name: "BillingCategory", element: BillcategoryForm, exact: false },

  { path: "/master/company", name: "Company", element: Company, exact: false },
  {
    path: "/master/company/tr",
    name: "Company",
    element: CompanyProfile,
    exact: false,
  },
  {
    path: "/master/company/tr/:id",
    name: "Company",
    element: CompanyProfile,
    exact: false,
  },

  {
    path: "/master/category",
    name: "Category",
    element: Category,
    exact: false,
  },
  {
    path: "/master/category/form",
    name: "Category",
    element: CategoryForm,
    exact: false,
  },

  {
    path: "/master/categoryinvoice",
    name: "CategoryInvoice",
    element: CategoryInvoice,
    exact: false,
  },
  {
    path: "/master/categoryinvoice/form",
    name: "CategoryInvoice",
    element: CategoryInvoiceForm,
    exact: false,
  },

  {
    path: "/master/location",
    name: "Location",
    element: Location,
    exact: false,
  },
  {
    path: "/master/location/rw",
    name: "Create Location",
    element: LocationForm,
    exact: false,
  },
  {
    path: "/master/location/rw/:id",
    name: "Update Location",
    element: LocationForm,
    exact: false,
  },

  { path: "/master/user", name: "Users", element: User, exact: false },
  { path: "/master/user/form", name: "Users", element: UserForm, exact: false },

  {
    path: "/master/subcategory",
    name: "Sub Category",
    element: subcategory,
    exact: false,
  },
  {
    path: "/master/subcategory/form",
    name: "Sub Category form",
    element: subcategoryForm,
    exact: false,
  },

  {
    path: "/master/usergroup",
    name: "User-Group",
    element: UserGroup,
    exact: false,
  },
  {
    path: "/master/usergroup/form",
    name: "User-Group-form",
    element: UserGroupForm,
    exact: false,
  },

  {
    path: "/master/user/location/rights",
    name: "location-Rights",
    element: userLocationRights,
    exact: false,
  },

  {
    path: "/master/designation",
    name: "Designation",
    element: Designation,
    exact: false,
  },
  {
    path: "/master/designation/form",
    name: "Designation",
    element: DesignationForm,
    exact: false,
  },
  {
    path: "/master/employee",
    name: "Employee",
    element: Employee,
    exact: false,
  },
  {
    path: "/master/employee/form",
    name: "Employee",
    element: EmployeeForm,
    exact: false,
  },

  {
    path: "/master/employeeinvoiceindex",
    name: "Employee Invoice",
    element: EmployeeInvoice,
    exact: false,
  },
  {
    path: "/master/employeeinvoiceindex/form",
    name: "Employee Invoice",
    element: EmployeeInvoiceForm,
    exact: false,
  },


  { path: '/master/unit/form', name: 'Units', element: UnitForm , exact: false },



  //stock category
  {
    path: "/master/stock/category",
    name: "Stock Category",
    element: StockCategory,
    exact: false,
  },
  {
    path: "/master/stock/category/form",
    name: "Stock Category",
    element: StockCategoryForm,
    exact: false,
  },

  //items
  { path: "/master/items", name: "Items", element: Item, exact: false },
  {
    path: "/master/items/form",
    name: "Items",
    element: ItemForm,
    exact: false,
  },
];

export default routes;
