import { useMemo } from "react"
import "./styles.css"
import { processValue } from "../../utils"

const Bar = (props) => {

    const {value, highestYValue} = props

    const processObject = useMemo(()=> processValue(value, highestYValue),[value])

    const {salesPercentage, profitPercentage, totalPercentage} = processObject

    return (
        <div className="bar-wrapper" style={{height: `${totalPercentage}%`}}>
            <div className="first-stack" style={{height: `${profitPercentage}%`}}>

            </div>
            <div className="second-stack" style={{height: `${salesPercentage}%`}}>

            </div>
        </div>
    )
}

export default Bar