  import React, { useEffect } from "react";
  import Header from "../components/Header";
  import Footer from "../components/Footer";
  import { OrderService, axiosInstance, baseURL, contentDeliveryService, paymentRoutes } from "../api/api";
  import updatePageVisit from "../Helper/AnalyticsService";
  import { useParams } from "react-router-dom";
  import Cookies from "js-cookie";
  import {  useNavigate } from "react-router-dom";

  function PricePage() {
    const { id } = useParams();
    const userDataString = Cookies.get("userData");
    const courseId = Cookies.get("courseId");
    const Navigate = useNavigate()
    const userData = JSON.parse(userDataString);

    // updating course Buyed User Updation
    const courseBuyedUserUpdation = async (userId,courseId) => {
      try {
        const res = await axiosInstance.post(
          `${baseURL}${contentDeliveryService}/CDS/courseBuyedUserUpdation`,
          { 
            courseId:courseId,
            userId:userId ,
          }
        );
        if(res.data){
          Cookies.remove("courseId");

        }
        return res.data;
      } catch (err) {
        console.log(err);
      }
    };
    
    // updating userBuyed Course 
    const userBuyedCourseUpdation =async (userId,courseId) =>{
      try {
        const res = await axiosInstance.post(
          `${baseURL}${contentDeliveryService}/CDS/userBuyedCourseUpdation`,
          { 
            courseId:courseId,
            userId:userId ,
          }
        );
        if(res.data){
          Cookies.remove("courseId");

        }
        return res.data;
      } catch (err) {
        console.log(err);
      }
    }

    const handleRazorpayPayment = async () => {
      try {
        const orderUrl = `${baseURL}${paymentRoutes}/razorpay/order`;
        const amountInRupees = id;

        const amountInPaise = amountInRupees * 100;

        const { data: responseData } = await axiosInstance.post(orderUrl, {
          amount: amountInPaise,
        });
        console.log(responseData);
        const data = responseData.data;
        console.log(data.id);
        console.log("Amount in paise:", amountInPaise);

        const options = {
          key: "rzp_test_ZqXDhbVwAyDJcu",
          amount: amountInPaise,
          currency: data.currency,
          name: "some random name",
          order_id: data.id,
          handler: async (response) => {
            try {
              const verifyUrl = `${baseURL}${paymentRoutes}/razorpay/verify`;
              const { data } = await axiosInstance.post(verifyUrl, response);
              console.log(data);
              if (data.message) {
                courseBuyedUserUpdation(userData._id,courseId);
                userBuyedCourseUpdation(userData._id,courseId);
              const res = await `${baseURL}${OrderService}/order/updateOrderStatus`
              console.log("order--->",res.data)
                Navigate(`/buyedCourses/${userData._id}`)
              }
            } catch (err) {
              console.log(err);
            }
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      } catch (err) {
        console.log(err);
        // Display alert message for the error
        alert(
          "Error: Amount should be passed in integer paise. Minimum value is 100 paise (1 rupee)."
        );
      }
    };
    const handleStripePayent = async () => {
      try {
        const body = {
          id: 1,
          quantity: 1,
          price: 100,
          currency: "inr", // Set the currency here
          name: "some random name",
          customer_name: "customer_name",
          customer_address: "customer_address",
          email: "triangle4business@gmail.com",
        };

        const res = await axiosInstance.post(
          `${baseURL}${paymentRoutes}/stripe/checkout`,
          body
        );

        console.log(res.data);
        if (res.data.url) {
          window.open(res.data.url, "_blank");
        }
      } catch (err) {
        console.log(err);
      }
    };
    useEffect(() => {
      updatePageVisit("Price Page");
    }, []);

    return (
      <div>
        <Header />
        <div onClick={handleRazorpayPayment} className="centered-box">
          <p>Pay with Razorpay...</p>
        </div>
        <div onClick={handleStripePayent} className="centered-box">
          <p>Pay with Stripe...</p>
        </div>
        <div className="centered-box">
          <p>Pay with Paypal...</p>
        </div>

        <Footer />
      </div>
    );
  }

  export default PricePage;
