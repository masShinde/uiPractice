import React from "react";
import "./styles.css"

const YAxis = (props) => {
    const {values, chartWidht} = props
    const style={
        "--width": chartWidht
    }
    console.log("width", chartWidht);
    return (
        <div className="y-container">
            {values?.map(val => <div key={val} className="y-axis-val" style={style}>
                {val}</div>)}
        </div>
    )

}

export default YAxis