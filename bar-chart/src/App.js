import logo from './logo.svg';
import './App.css';
import BarChart from './components/barchart';
import { useState } from 'react';

function App() {


  const data = [{
    "year": 2023,
    "chart_title": "Monthly Sales and Profit (2023)",
    "x_axis_title": "Month",
    "y_axis_title": "Amount (in $)",
    "data": [
      {
        "month": "January",
        "sales": 13000,
        "profit": 5500
   }, {
        "month": "February",
        "sales": 16000,
        "profit": 6200
   }, {
        "month": "March",
        "sales": 18500,
        "profit": 7100
   }, {
        "month": "April",
        "sales": 20500,
        "profit": 8200
   }, {
        "month": "May",
        "sales": 22500,
        "profit": 9100
   }, {
        "month": "June",
        "sales": 25500,
        "profit": 10500
   } ]
   }, {
    "year": 2024,
    "chart_title": "Monthly Sales and Profit (2024)",
    "x_axis_title": "Month",
    "y_axis_title": "Amount (in $)",
    "data": [
      {
        "month": "January",
        "sales": 14000,
        "profit": 6000
   }, {         "month": "February",
   "sales": 15500,
   "profit": 6300
}, {
   "month": "March",
   "sales": 18000,
   "profit": 7200
}, {
   "month": "April",
   "sales": 21000,
   "profit": 8300
}, {
   "month": "May",
   "sales": 23000,
   "profit": 9200
}, {
   "month": "June",
   "sales": 26000,
   "profit": 10600
} ]
}]


  const [selectedData, setSelectedData] = useState(data[0])

  const onDropdownSelect = (e) => {
    
    const selectedYear = e?.target?.value
    const filteredData = data?.find(val => val?.year == selectedYear) 
    setSelectedData(filteredData)
  }

  return (
    <div className="App">
      <select onChange={onDropdownSelect}>
        {data?.map((val, index) => (
          <option key={val?.year} value={val?.year}>{val?.year}</option>
        ))}
      </select>
      <BarChart data={selectedData?.data} />
    </div>
  );
}

export default App;
