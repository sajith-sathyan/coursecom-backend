import React, { useState, useEffect } from "react";
import { axiosInstance, baseURL, categoryRoutes } from "../api/api";

function CategoryTable() {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  

  useEffect(() => {
    getCategory();
  }, []); 

  const getCategory = async () => {
    try {
      const res = await axiosInstance.get(`${baseURL}${categoryRoutes}/category`);
      console.log("Response:", res.data);
      if (res.data && res.data.length > 0) {
        const categoryArrays = res.data.map(item => item.CategoryArray);
        setCategories(categoryArrays.flat());
      } else {
        setCategories([]);
      }
    } catch (err) {
      console.log(err);   
    }
  };

  const addCategory = async () => {
    try {
      if (category) {
        const res = await axiosInstance.post(
          `${baseURL}${categoryRoutes}/category/addCategory`,
          { categoryName: category }
        );
        console.log(res.data);
        setCategory("");
        setErrorMessage("");
        setSuccessMessage("Category added successfully");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
        getCategory(); 
      } else {
        setErrorMessage("Enter the category first");
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      }
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data && err.response.data.error) {
        setErrorMessage(err.response.data.error);
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
        setCategory("");
      } else {
        setErrorMessage("Failed to add category. Please try again.");
      }
    }
  };

  const deleteCategory = async (categoryName) => {
    try {
      const res = await axiosInstance.delete(
        `${baseURL}${categoryRoutes}/category/deleteCategory/${categoryName}`
      );
      console.log(res.data);
      setSuccessMessage("Category deleted successfully");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      getCategory(); 
    } catch (err) {
      console.log(err);
      setErrorMessage("Failed to delete category. Please try again.");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <div id="content">
      <main>
        <div className="center-container">
          <div className="input-container">
            <input
              type="text"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              placeholder="Add new category"
              style={{ textAlign: "center", width: 200, height: 50 }}
            />
            <button className="button" onClick={addCategory}>
              Add
            </button>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
        </div>
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
                  <th>Category</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat, index) => (
                  <tr key={index}>
                    <td>
                      <p>{cat}</p>
                    </td>
                    <td>
                      <i
                        className="fa fa-trash"
                        style={{ fontSize: "20px", cursor: "pointer" }}
                        onClick={() => deleteCategory(cat)}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CategoryTable;
