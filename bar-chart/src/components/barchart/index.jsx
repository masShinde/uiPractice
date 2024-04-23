import React, { useMemo } from "react";
import "./styles.css"
import YAxis from "../yaxis";
import ChartSection from "../chartSection";
import XAxis from "../xAxis";
import { getChartValues } from "../../utils";

const BarChart = (props) => {

    const { data } = props || {}

    const chartValues = useMemo(()=> getChartValues(data) ,[data])

    const {
        xAxisValues, 
        yAxisValues,
        highestYValue
    } = chartValues


    return (
        <div className="chart-container">
            <div className="chart-wrapper-container">
                <YAxis values={yAxisValues} />
                <ChartSection highestYValue={highestYValue} values={data}  />
            </div>
            <XAxis values={xAxisValues}/>
        </div>
    )
}

export default BarChart