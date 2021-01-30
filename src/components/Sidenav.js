import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const styles = {
    height: '100vh',
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '2rem'
}
export const Sidenav = () => {
    return (
        <Nav defaultActiveKey="/home" className="flex-column" style={styles}>
            <Nav.Item><Link to="/events">Events </Link></Nav.Item>
            <Nav.Item><Link to="/stats"> Stats</Link></Nav.Item>
            <Nav.Item><Link to="/datatable"> Data Table</Link></Nav.Item>
        </Nav>
    )
}
