import React from 'react';
import {Area, AreaChart, CartesianGrid, Label, Legend, Tooltip, XAxis, YAxis} from "recharts";

class RechartAreaChart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AreaChart width={800} height={250} data={this.props.data}
                       margin={{top: 10, right: 30, left: 0, bottom: 0}}>

                <defs>
                    <linearGradient id="colorFin" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorSav" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorInl" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4A4703" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#4A4703" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey="name">
                    <Label value='日期' offset={0} position='insideBottom'></Label>
                </XAxis>
                <YAxis label={{ value: '交易笔数', angle: -90, position: 'insideLeft', textAnchor: 'middle' }} />
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend verticalAlign="bottom" height={36}/>
                <Area type="monotone" dataKey="fin" name='理财' unit='笔' stroke="#8884d8" fillOpacity={1}
                      fill="url(#colorFin)"/>
                <Area type="monotone" dataKey="sav" name='活期' unit='笔' stroke="#82ca9d" fillOpacity={1}
                      fill="url(#colorSav)"/>
                <Area type="monotone" dataKey="inl" name='智投' unit='笔' stroke="#4A4703" fillOpacity={1}
                      fill="url(#colorInl)"/>
            </AreaChart>
        );
    };
}

export default RechartAreaChart;