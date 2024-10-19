import React from "react";

function Table() {
  return (
    <div id="content">
      <main>
        {/* <div className="head-title">
          <div className="left">
            <h1>Dashboard</h1>
            <ul className="breadcrumb">
              <li>
                <a href="#">Dashboard</a>
              </li>
              <li>
                <i className="bx bx-chevron-right"></i>
              </li>
              <li>
                <a className="active" href="#">
                  Home
                </a>
              </li>
            </ul>
          </div>
          <a href="#" className="btn-download">
            <i className="bx bxs-cloud-download"></i>
            <span className="text">Download PDF</span>
          </a>
        </div> */}

        {/* <ul className="box-info">
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
        </ul> */}

        <div className="table-data">
          <div className="order">
            <div className="head">
              <h3>Recent Orders</h3>
              <i className="bx bx-search"></i>
              <i className="bx bx-filter"></i>
            </div>
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <p>John Doe</p>
                  </td>
                  <td>01-10-2021</td>
                  <td>
                    <span className="status completed">Completed</span>
                  </td>
                  <td>
                    <label class="switch">
                      <input type="checkbox" />
                      <span class="slider round"></span>
                    </label>
                  </td>
                </tr>
                {/* <tr>
                  <td>
                    <img src="img/people.png" alt="User" />
                    <p>John Doe</p>
                  </td>
                  <td>01-10-2021</td>
                  <td>
                    <span className="status pending">Pending</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src="img/people.png" alt="User" />
                    <p>John Doe</p>
                  </td>
                  <td>01-10-2021</td>
                  <td>
                    <span className="status process">Process</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src="img/people.png" alt="User" />
                    <p>John Doe</p>
                  </td>
                  <td>01-10-2021</td>
                  <td>
                    <span className="status pending">Pending</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src="img/people.png" alt="User" />
                    <p>John Doe</p>
                  </td>
                  <td>01-10-2021</td>
                  <td>
                    <span className="status completed">Completed</span>
                  </td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Table;
