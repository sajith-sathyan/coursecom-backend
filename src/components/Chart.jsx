import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';
import axios from 'axios'; // Import Axios for making HTTP requests
import { analyticsService, axiosInstance, baseURL } from '../api/api';
import { getPageVisits } from '../Helper/AnalyticsService';

function BarChartComponent() {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [pageVisits, setPageVisits] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(`${baseURL}${analyticsService}/pageVisits`);
                console.log(response.data)
                setPageVisits(response.data.pageVisits); 
            } catch (error) {
                console.error('Error fetching page visits:', error);
            }
        };

        fetchData(); 
    }, []);

    useEffect(() => {
        const myChartRef = chartRef.current.getContext("2d");
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

       if(pageVisits.length){
        chartInstance.current = new Chart(myChartRef, {
            type: "bar",
            data: {
                labels: pageVisits.map(visit => visit.label), // Use the page visit labels as chart labels
                datasets: [{
                    backgroundColor: ["red", "green", "blue", "orange", "brown"],
                    data: pageVisits.map(visit => visit.count) // Use the page visit counts as chart data
                }]
            },
            options: {
                legend: { display: false },
                title: {
                    display: true,
                    text: "Page Visits"
                }
            }
        });
       }

        // Cleanup function to destroy the Chart instance when the component unmounts
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [pageVisits]); // Run this effect whenever the pageVisits state changes

    return (
        <>
            <div id="content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <canvas id="myChart" style={{ width: "100%", maxWidth: "600px" }} ref={chartRef}></canvas>
            </div>
        </>
    );
}

export default BarChartComponent;
