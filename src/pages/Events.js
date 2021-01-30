import React, { useEffect, useState } from 'react'
import { Barchart } from '../components/Barchart'
import { DropdownButton, Dropdown } from 'react-bootstrap'
import DataService from '../service/DataFetch'
import Utilities from '../service/Utilities'

export const Events = () => {
    const [eventsDataDaily, seteventsDataDaily] = useState([]);
    const [eventsDataHourly, seteventsDataHourly] = useState([]);
    const [eventsDataHourlyByDate, setEventsDataHourlyByDate] = useState([])
    const [date, selectDate] = useState()

    const handleSelectDate = (event) => {
        selectDate(event)
    }
    useEffect(async () => {
        let eventsDaily = await DataService.getEvents();
        seteventsDataDaily(
            eventsDaily.map((record) => ({
                ...record,
                date: Utilities.getDateFromString(record.date),
            }))
        )
        let eventsHourly = await DataService.getEvents(true);
        seteventsDataHourly(
            eventsHourly.map((record) => ({
                ...record,
                date: Utilities.getDateFromString(record.date),
            }))
        )

    }, [])
    useEffect(() => {
        setEventsDataHourlyByDate(
            eventsDataHourly.filter(record => record.date === date)
        )
    }, [date])
    useEffect(() => {
        if (eventsDataHourly.length > 0)
            selectDate(eventsDataHourly[0].date)
    }, [eventsDataHourly])
    return (
        <div className='page-wrapper'>
            <Barchart chartData={eventsDataDaily} xAxisDataKey='date' barDataKey='events' xLabel='Dates' />
            <Barchart chartData={eventsDataHourlyByDate} xAxisDataKey='hour' barDataKey='events' xLabel='Hours' />
            <DropdownButton  variant="outline-info" id="dropdown-basic-button" title={date} onSelect={handleSelectDate}>
                {eventsDataDaily.map((record, idx) =>
                    <Dropdown.Item key={idx + record.date} eventKey={record.date} active={record.date === date}>{record.date}</Dropdown.Item>
                )}
            </DropdownButton>
        </div>
    )
}