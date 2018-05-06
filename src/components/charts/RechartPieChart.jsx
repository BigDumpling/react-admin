import React from 'react';
import {scaleOrdinal, schemeCategory10} from 'd3-scale';
import {Cell, Legend, Pie, PieChart, Tooltip} from "recharts";

const colors = scaleOrdinal(schemeCategory10).range();

class RechartPieChart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {pieData} = this.props;
        return (
            <PieChart width={730} height={250}>
                <Legend verticalAlign="bottom" height={36}/>
                <Tooltip/>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} animationDuration={400}
                     label={(item) => (`成功${item.value}笔,百分比为:${item.value}%`)}
                     fill="#8884d8">
                    {pieData && pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % 10]}/>
                    ))}
                </Pie>
            </PieChart>
        );
    }
}

export default RechartPieChart;