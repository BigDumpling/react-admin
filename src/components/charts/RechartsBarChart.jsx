/**
 * Created by hao.cheng on 2017/4/21.
 */
import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

const data = [
    {name: 'Page A', uv: 4000, pv: 2400, amt: 12400},
    {name: 'Page B', uv: 3000, pv: 1398, amt: 12210},
    {name: 'Page C', uv: 2000, pv: 9800, amt: 21290},
    {name: 'Page D', uv: 2780, pv: 3908, amt: 21000},
    {name: 'Page E', uv: 1890, pv: 4800, amt: 12181},
    {name: 'Page F', uv: 2390, pv: 3800, amt: 12500},
    {name: 'Page G', uv: 3490, pv: 4300, amt: 12100},
];

const RechartsBarChart = () => (
    <ResponsiveContainer width="100%" height={300}>
        <BarChart
            data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            {/*<Bar dataKey="uv" fill="#82ca9d" />*/}
            <Bar dataKey="amt" fill="#82ca9d" />
        </BarChart>
    </ResponsiveContainer>
);

export default RechartsBarChart;