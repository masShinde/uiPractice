import React from "react";
import "./styles.css"

const YAxis = (props) => {
    const {values, chartWidth} = props
    const style={
        "--width": chartWidth
    }
    console.log("width", chartWidth);
    return (
        <div className="y-container">
            {values?.map(val => <div key={val} className="y-axis-val" style={style}>
                {val}</div>)}
        </div>
    )

}

export default YAxis