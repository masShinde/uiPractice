import Bar from "../bar"
import "./styles.css"

const ChartSection = (props) => {
    
    const {values, highestYValue} = props
    
    return (
        <div className="chart-section-container" >
            {values?.map((val, index )=> <Bar key={index} value={val} highestYValue={highestYValue} />)}
        </div>
    )
}

export default ChartSection