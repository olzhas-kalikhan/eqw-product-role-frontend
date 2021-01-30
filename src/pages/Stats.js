import React, { useEffect, useState } from 'react'
import { Composedchart } from '../components/Composedchart'
import { DropdownButton, Dropdown } from 'react-bootstrap'
import DataService from '../service/DataFetch'
import Utilities from '../service/Utilities'
import { Bar, Line } from 'recharts';
const chartOptions = [
    {
        value: 'impressions',
        fill: '#FF6633',
        Component: Bar,
    },
    {
        value: 'clicks',
        fill: '#E6B333',
        Component: Bar
    },
    {
        value: 'revenue',
        stroke: '#008000',
        type: 'natural',
        Component: Line
    },
]
export const Stats = () => {
    const [statsDataDaily, setStatsDataDaily] = useState([]);
    const [statsDataHourly, setStatsDataHourly] = useState([]);
    const [statsDataHourlyByDate, setStatsDataHourlyByDate] = useState([])
    const [date, selectDate] = useState('')

    const handleSelectDate = (date) => {
        selectDate(date)
    }

    useEffect(async () => {
        let stats = await DataService.getStats();
        setStatsDataDaily(
            stats.map((record) => ({
                ...record,
                date: Utilities.getDateFromString(record.date),
                revenue: record.revenue * 1,
                clicks: record.clicks * 1,
                impressions: record.impressions / 1000,
            }))
        )

        let statsHourly = await DataService.getStats(true)
        setStatsDataHourly(
            statsHourly.map(record => ({
                ...record,
                date: Utilities.getDateFromString(record.date),
                revenue: record.revenue * 1,
                clicks: record.clicks * 1,
                impressions: record.impressions / 1000,
            }))
        )


    }, [])
    useEffect(() => {
        setStatsDataHourlyByDate(
            statsDataHourly.filter(record => record.date === date)
        )
    }, [date])
    useEffect(() => {
        if (statsDataHourly.length > 0)
            selectDate(statsDataHourly[0].date)
    }, [statsDataHourly])
    return (
        <div className='page-wrapper'>
            <Composedchart chartData={statsDataDaily} xAxisDataKey='date' dataKeys={chartOptions} />
            <Composedchart chartData={statsDataHourlyByDate} xAxisDataKey='hour' dataKeys={chartOptions} />
            <DropdownButton variant="outline-info" id="dropdown-basic-button" title={date} onSelect={handleSelectDate}>
                {statsDataDaily.map((record, idx) =>
                    <Dropdown.Item key={idx + record.date} eventKey={record.date} active={record.date === date}>{record.date}</Dropdown.Item>
                )}
            </DropdownButton>
        </div>
    );
}