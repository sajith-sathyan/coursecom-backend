import { analyticsService, axiosInstance, baseURL } from "../api/api";


// Function to update page visit
 const updatePageVisit = async (label) => {
  try {
    const response = await axiosInstance.post(`${baseURL}${analyticsService}/pageVisits/visit`, { label });
    console.log(response.data); 
  } catch (error) {
    console.error('Error updating page visit:', error);
  } 
};

export default updatePageVisit;
