import React from "react";
import AdminSidebar from "../../components/AdminSidebar";
import BarChartComponent from "../../components/Chart";


function DashboardPage() {
  return (
    <>
     <AdminSidebar currentPage={'Dashboard'}/>
     

      <BarChartComponent/>
      {/* <Table/> */}
    </>
  );
}

export default DashboardPage;
