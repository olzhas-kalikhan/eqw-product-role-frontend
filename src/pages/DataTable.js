import React, { useState, useEffect } from 'react';
import { Table, InputGroup, FormControl } from 'react-bootstrap'
import { Map } from '../components/Map'
import DataService from '../service/DataFetch'

export const DataTable = () => {
    const [tableData, setTableData] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [location, setLocation] = useState({ lat: 10, lon: 10 })
    useEffect(() => {
        async function fetchData(){
            try {
                let data = await DataService.getPOI()
                setTableData(data)
            }
            catch (err) {
                console.error(err)
            }
        }
        fetchData()
    }, [])
    const handleSearchFieldChange = (e) => {
        setSearchTerm(e.target.value)
    }
    const handleOnRowClick = (event) => {
        setLocation(tableData.find(record => record.poi_id === event.target.parentNode.rowIndex))
    }

    if (tableData.length > 0)
        return (
            <div style={{ height: '100vh', width: '70%' }}>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Name"
                        aria-label="Name"
                        aria-describedby="basic-addon2"
                        onChange={handleSearchFieldChange}
                    />

                </InputGroup>
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th>#ID</th>
                            <th>Name</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData
                            // .filter(record => record.name.includes(searchTerm))
                            .map(({ poi_id, name, lat, lon }) =>
                                <tr
                                    style={name.toLowerCase().includes(searchTerm.toLowerCase()) && searchTerm !== '' ? { background: 'yellow' } : {}}
                                    onClick={handleOnRowClick}
                                    key={poi_id}
                                >
                                    <th>{poi_id}</th>
                                    <th>{name}</th>
                                    <th>{lat}</th>
                                    <th>{lon}</th>
                                </tr>
                            )}
                    </tbody>
                </Table>
                <Map location={location} data={tableData} />

            </div>
        )
    else return <p>Loading</p>
}