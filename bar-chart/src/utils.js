export const getChartValues = (data) => {
    const xAxisValues = getXAxisValues(data)
    const yAxisObj = getYAxisValues(data)
    const highestYValue = yAxisObj?.maxValue
    const yAxisValues = yAxisObj?.values
    return {
        xAxisValues, 
        yAxisValues,
        highestYValue
    }
}

export const getXAxisValues = (data) => {
    return data?.map?.(valObj => valObj?.month)
}

export const getYAxisValues = (data) => {
    const totalValues = data?.reduce((prev, current)=> {
        prev.push(current?.sales+current?.profit)
        return prev
    },[])
    const max= Math.max(...totalValues)
   const highestYValue = getHighestYValue(max)
    const gap = highestYValue / 4
    const yValues = []
    for(let i = 4 ;i>=0; i--){
        yValues.push(highestYValue-(gap * i))
    }

   return {values: yValues, maxValue: highestYValue}
}

export const getHighestYValue = (max) => {
    const nearestPow = getNearestPow(max)
    const ceil = Math.ceil(max/nearestPow)
    return ceil * nearestPow
}

export const getNearestPow = (val) => {
    return Math.pow(10, val.toString().length - 1);
}

export const processValue = (val, highestYValue) => {
    const total = val?.sales + val?.profit
    const totalPercentage = total/highestYValue * 100
    const salesPercentage = (val?.sales/total) * 100
    const profitPercentage = (val?.profit/total) * 100
    return {salesPercentage, profitPercentage, totalPercentage}
}