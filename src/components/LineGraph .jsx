import React from 'react'
import {Line} from "react-chartjs-2";
import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend} from "chart.js";
import {LineChartData} from '../data/TempData';

ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend);

const LineGraph = () => {
  const options = {};
  return <Line options={options} data={LineChartData}/>
}

export default LineGraph;