import React from "react";

function SalesList() {
  return (
    <ul className="box-info">
      <li>
        <i className="bx bxs-calendar-check"></i>
        <span className="text">
          <h3>1020</h3>
          <p>New Order</p>
        </span>
      </li>
      <li>
        <i className="bx bxs-group"></i>
        <span className="text">
          <h3>2834</h3>
          <p>Visitors</p>
        </span>
      </li>
      <li>
        <i className="bx bxs-dollar-circle"></i>
        <span className="text">
          <h3>$2543</h3>
          <p>Total Sales</p>
        </span>
      </li>
    </ul>
  );
}

export default SalesList;
