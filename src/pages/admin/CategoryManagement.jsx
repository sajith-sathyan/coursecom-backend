import React from 'react'
import AdminSidebar from '../../components/AdminSidebar'
import CategoryTable from '../../components/CategoryTable'

function CategoryManagement() {
  return (
   <>
   <AdminSidebar currentPage={'Category Management'}/>
   <CategoryTable/>
   </>
  )
}

export default CategoryManagement