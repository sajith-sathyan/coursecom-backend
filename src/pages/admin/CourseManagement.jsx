import React from 'react'
import AdminSidebar from '../../components/AdminSidebar'
import Table from '../../components/Table'
import CourseTable from '../../components/CourseTable'

function CourseManagement() {
  return (
    <div>
      <>
      <AdminSidebar currentPage={'Course Management'}/>
      <CourseTable/>
      </>
    </div>
  )
}

export default CourseManagement