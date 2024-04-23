import "./styles.css"

const XAxis = (props) => {
    
    const { values} = props

    return (
        <div className="x-axis-container">
            {values?.map(val => (
                <div key={val} className="x-container">
                    <p className="x-container-val">{val}</p>
                </div>
            )) }
        </div>
    )
}

export default XAxis