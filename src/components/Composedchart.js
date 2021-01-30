import React, { useEffect, useState } from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap'
import { CartesianGrid, Bar, XAxis, YAxis, Legend, Tooltip, Line, ComposedChart, ResponsiveContainer } from 'recharts';

export const Composedchart = ({ chartData, xAxisDataKey, dataKeys }) => {
    const [checkedKeys, setCheckedKeys] = useState({})
    useEffect(() => {
        setCheckedKeys(dataKeys.reduce((obj, { value }) => ({ ...obj, [value]: true }), {}))
    }, [dataKeys])
    return (
        <div className='chart-wrapper'>
            <ResponsiveContainer height='80%' width='100%'>
                <ComposedChart data={chartData} margin={{ bottom: 20 }} barGap={2}>
                    <XAxis dataKey={xAxisDataKey} scale="band"  />
                    <YAxis type="number" domain={[0, datamax => Math.round(datamax * 1.1)]} tickCount={20} />
                    <Tooltip />
                    <Legend margin={{ top: 20 }} />
                    <CartesianGrid stroke="#f5f5f5" />
                    
                    {dataKeys.map(({ value, Component, ...rest }) =>
                        checkedKeys[value] &&
                        <Component
                            dataKey={value}
                            {...rest}
                        />
                    )}
                </ComposedChart>
            </ResponsiveContainer>
            <ButtonGroup toggle style={{ width: '30%' }}>
                {dataKeys.map(({ value }, idx) =>
                    <ToggleButton
                        type="checkbox"
                        variant={checkedKeys[value] ? "secondary" : "outlined-secondary"}
                        checked={checkedKeys[value]}
                        value={value}
                        onChange={(e) => setCheckedKeys(prevState => ({ ...prevState, [value]: e.currentTarget.checked }))}
                        key={idx + value}
                    >
                        {value}
                    </ToggleButton>
                )}
            </ButtonGroup>
        </div>
    )
}