import React from "react";
import "./styles.css"

const YAxis = (props) => {
    const {values, width} = props

    return (
        <div className="y-container">
            {values?.map(val => <div key={val} className="y-axis-val">
                {val}</div>)}
        </div>
    )

}

export default YAxis