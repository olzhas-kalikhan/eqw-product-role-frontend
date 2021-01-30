import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';


export const Barchart = ({ chartData, xAxisDataKey, barDataKey, xLabel }) => {

    return (
        <div className='chart-wrapper'>
            <ResponsiveContainer width='100%'>
                <BarChart data={chartData} margin={{ bottom: 20 }}>
                    <XAxis dataKey={xAxisDataKey} label={{ value: xLabel, position: 'bottom', offset: 0 }} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey={barDataKey} fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}