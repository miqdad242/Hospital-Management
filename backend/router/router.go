package router

import (
	"backend/controllers"
	auth "backend/middleware"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/jwtauth"
)

func SetupRoutes(r *chi.Mux) {
	r.Route("/api", func(r chi.Router) {
		// Public Routes
		r.Post("/login", controllers.Login)
		r.Get("/user/location", controllers.RetrieveUserLocations)
		r.Get("/user/workinghospital", controllers.RetrieveUserWorkingHospital)
		// Private Routes
		r.Group(func(r chi.Router) {
			r.Use(jwtauth.Verifier(auth.Jwt.TokenAuth))
			r.Use(jwtauth.Authenticator)
			r.Post("/logout", controllers.Logout)
			r.Get("/validate", controllers.Validate)
			r.Post("/validate", controllers.Validate)
			// Location
			r.Group(func(r chi.Router) {
				r.Post("/location", controllers.SaveLocation)
				r.Post("/location/delete", controllers.DeleteLocation)
				r.Get("/locations", controllers.RetrieveLocations)
				r.Get("/location/{id}", controllers.RetrieveLocation)
				r.Get("/locationlist", controllers.RetrieveLocationList)
			})
			// Area
			r.Group(func(r chi.Router) {
				r.Get("/area", controllers.RetrieveArea)
				r.Get("/areas", controllers.RetrieveAreaList)
				r.Get("/area/{id}", controllers.RetrievebyIdArea)
				r.Post("/area", controllers.SaveArea)
				r.Post("/area/delete", controllers.DeleteArea)
				r.Get("/areabyname/{name}", controllers.RetrieveAreaByName)
			})

			// Bill
			r.Group(func(r chi.Router) {
				r.Get("/bill", controllers.RetrieveBill)
				r.Get("/bills", controllers.RetrieveBillList)
				r.Get("/bill/{id}", controllers.RetrievebyIdBill)
				r.Post("/bill", controllers.SaveBill)
				r.Post("/bill/delete", controllers.DeleteBill)
				r.Get("/billbyname/{name}", controllers.RetrieveBillByName)
			})

			// Doctor

			r.Group(func(r chi.Router) {
				r.Post("/doctor", controllers.SaveDoctor)
				r.Get("/get_doctors", controllers.RetrieveDoctorList)
				r.Post("/doctor/delete", controllers.DeleteDoctor)
				r.Get("/doctor_filter", controllers.FilterRetrieve)
				r.Get("/getbyid/{id}", controllers.DoctorRetrievebyId)
				r.Get("/doctor_groupes_name", controllers.RetrieveDoctorGroupNameList)

			})

			//Supplier

			r.Group(func(r chi.Router) {
				r.Post("/supplier", controllers.SaveSupplier)
				r.Get("/get_suppliers", controllers.RetrieveSupplierList)
				r.Post("/supplier/delete", controllers.DeleteSupplier)
				r.Get("/supplier_filter", controllers.SupplierFilterRetrieve)
				r.Get("/getbyid/{id}", controllers.SupplierRetrievebyId)
				r.Get("/supplier_groupes_name", controllers.RetrieveSupplierGroupNameList)
				//r.Get("/supplier/{id}", controllers.RetrievebyIdSupplier)

			})

			//supplier releation

			r.Group(func(r chi.Router) {
				//	r.Post("/supplierrelations", controllers.SaveSupplierreleation)

			})

			// Doctor Groupe
			r.Group(func(r chi.Router) {
				r.Get("/a/{id}", controllers.RetrievebyId)
				r.Get("/Doctor_groupe_filter", controllers.Retrieve)
				r.Post("/doctor_groupe", controllers.SaveDoctorGroup)
				r.Get("/doctor_groupes", controllers.RetrieveDoctorGroupeList)
				r.Post("/doctor_groupe/delete", controllers.Delete)

			})

			// Supplier Groupe
			r.Group(func(r chi.Router) {
				r.Get("/a/{id}", controllers.RetrievebyIdSupplierGroup)
				r.Get("/Supplier_groupe_filter", controllers.RetrieveSupplierGroup)
				r.Post("/supplier_groupe", controllers.SaveSupplierGroup)
				r.Get("/supplier_groupes", controllers.RetrieveSupplierGroupeList)
				r.Post("/supplier_groupe/delete", controllers.DeleteSupplierGroup)

			})

			// category
			r.Group(func(r chi.Router) {

				r.Get("/category", controllers.RetrieveCategory)
				r.Get("/category/{id}", controllers.RetrivebyIdCategory)
				r.Post("/category", controllers.SaveCategory)
				r.Post("/category/delete", controllers.DeleteCategory)
			})

			//Category invoice
			r.Group(func(r chi.Router) {
				r.Get("/categorynamesforinvoice", controllers.RetrieveCategoryNamesForInvoice)
				r.Get("/employeenamesforcategoryinvoice", controllers.RetrieveEmployeeNamesForCategoryInvoice)
				r.Get("/categoryinvoices", controllers.RetrieveCategoryInvoiceList)
				r.Post("/categoryinvoice", controllers.SaveCategoryInvoice)
				r.Get("/categoryinvoicefilter", controllers.RetrieveFilteredCategoryInvoice)
				r.Post("/categoryinvoice/delete", controllers.DeleteCategoryInvoice)

			})


			// Company
			r.Group(func(r chi.Router) {
				r.Get("/company", controllers.RetrieveCompany)
				r.Get("/company/{id}", controllers.RetrieveCompanyById)
				r.Post("/company", controllers.SaveCompany)
				r.Post("/company/delete", controllers.DeleteCompany)
				r.Get("/companylist", controllers.RetrieveCompanyList)
				r.Get("/companybyname/{name}", controllers.RetrieveCompanyByName)
				r.Get("/company/getbarcode", controllers.RetrieveBarcodePrinter)
			})
			r.Group(func(r chi.Router) {
				r.Get("/event", controllers.RetrieveEventFilterd)
				r.Post("/event", controllers.SaveEventType)
				r.Post("/eventfilter", controllers.SaveEventType)
				r.Get("/event/{id}", controllers.RetrivebyIdEvent)

			})

			//Sub category
			r.Group(func(r chi.Router) {

				r.Get("/subcategory", controllers.RetriveSubCategories)
				r.Get("/subcategory/{id}", controllers.RetrievebyIdSubCategory)
				r.Post("/subcategory", controllers.SaveSubCategory)
				r.Post("/subcategory/delete", controllers.DeleteSubCategory)
			})

			// User
			r.Group(func(r chi.Router) {
				r.Get("/user", controllers.RetrieveUser)
				r.Get("/users", controllers.RetrieveUserList)
				r.Get("/user/{id}", controllers.RetrievebyIdUser)
				r.Post("/user", controllers.SaveUser)
				r.Post("/user/delete", controllers.DeleteUser)
			})
			// user group
			r.Group(func(r chi.Router) {
				r.Get("/user/group", controllers.RetrieveUserGroup)
				r.Get("/user/groups", controllers.RetrieveUserGroupList)
				r.Get("/user/group/{id}", controllers.RetrievebyIdUserGroup)
				r.Post("/user/group", controllers.SaveUserGroup)
				r.Post("/user/group/delete", controllers.DeleteUserGroup)
			})
			r.Group(func(r chi.Router) {
				r.Get("/security/userlocation/{id}", controllers.RetrieveUserSecurityLocations)
				r.Post("/security/userlocationrights", controllers.SaveUserSecurityLocations)
			})

			//Designation
			r.Group(func(r chi.Router) {
				r.Post("/designation", controllers.SaveDesignation)
				r.Get("/designation", controllers.RetrieveDesignation)
				r.Get("/designations", controllers.RetrieveDesignationList)
				r.Get("/designation/{id}", controllers.RetrievebyIdDesignation)
				r.Post("/designation/delete", controllers.DeleteDesignation)
				r.Get("/designationbyname/{name}", controllers.RetrieveDesignationByName)

			})

			//Unit
			r.Group(func(r chi.Router) {

				r.Get("/unit", controllers.RetrieveUnit)
				r.Get("/unit/{id}", controllers.RetrivebyIdUnit)
				r.Post("/unit", controllers.SaveUnit)
				r.Post("/unit/delete", controllers.DeleteUnit)
			})

			//stock category
			r.Group(func(r chi.Router) {
				r.Post("/stock_category", controllers.SaveStockCategory)
				r.Post("/stock_category/delete", controllers.DeleteStockCategory)
				r.Get("/stock_categories", controllers.RetrieveStockCategory)
				r.Get("/stock_categorybyname/{name}", controllers.RetrieveStockCategoryByName)
				r.Get("/stock_categorybyid/{id}", controllers.RetrieveStockCategorybyId)
				r.Get("/stock_category", controllers.RetrieveFilterStockCategory)

			})
			//item
			r.Post("/item", controllers.SaveItem)
			r.Post("/item/delete", controllers.DeleteItem)
			r.Get("/itemAll", controllers.RetrieveItemList)
			r.Get("/itemByName/{name}", controllers.RetrieveItemByName)
			r.Get("/itemById/{id}", controllers.RetrieveItembyId)
			r.Get("/itemFilter", controllers.RetrieveItemFilter)
			r.Get("/item/stockCategoryDetails", controllers.RetrieveStockCategoryDetails)
			r.Get("/item/withStockCIDandName", controllers.RetrieveStockCategoryIDandName)

			//Employee
			r.Group(func(r chi.Router) {
				r.Post("/employee", controllers.SaveEmployee)
				r.Get("/employee", controllers.RetrieveFilteredEmployee)
				r.Get("/employees", controllers.RetrieveEmployeeList)
				r.Get("/designationcodes", controllers.RetrieveDesignationCode)
				r.Get("/employee/{id}", controllers.RetrievebyIdEmployee)
				r.Post("/employee/delete", controllers.DeleteEmployee)
				r.Get("/employeebyname/{name}", controllers.RetrieveEmployeeByName)

			})

			//Employee invoice
			r.Group(func(r chi.Router) {
				r.Get("/employeenamesforinvoice", controllers.RetrieveEmployeeNamesForInvoice)
				r.Get("/doctornamesforinvoice", controllers.RetrieveDoctorNamesForInvoice)
				r.Get("/employeeinvoices", controllers.RetrieveEmployeeInvoiceList)
				r.Post("/employeeinvoice", controllers.SaveEmployeeInvoice)
				r.Get("/employeeinvoicefilter", controllers.RetrieveFilteredEmployeeInvoice)
				r.Post("/employeeinvoice/delete", controllers.DeleteEmployeeInvoice)

			})

		})
	})
}
