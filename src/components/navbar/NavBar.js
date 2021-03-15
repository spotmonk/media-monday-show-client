import React, { useState } from 'react';
import { Link } from "react-router-dom"
import LoginModal from '../auth/loginModal'
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, NavItem, Button } from 'reactstrap';
import { useHistory } from 'react-router'
import './navbar.scss'

export const NavBar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdown2Open, setDropdown2Open] = useState(false);
    const history = useHistory()

    const toggle = () => setDropdownOpen(prevState => !prevState);
    const toggle2 = () => setDropdown2Open(prevState => !prevState);

    const logout = () => {
        localStorage.removeItem('token')
        history.go(0)
    }

    const toggleCollapse = () => setIsOpen(!isOpen);

    return (
        <>
            {localStorage.getItem('token') ? 
            <Navbar color="dark" dark expand="md">
            <Nav className="d-flex" navbar>
            <NavbarBrand  href="/">Media Monday Show</NavbarBrand>
            </Nav>
            <Nav className="flex-wrap ml-auto">
            <NavbarToggler onClick={toggleCollapse} />
            <Collapse isOpen={isOpen} navbar>
            <div className="container ml-auto">
            <NavbarBrand className="mr-4">Media</NavbarBrand>
            <Dropdown className="mr-4 bg-dark" color="secondary" isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>
                My Media
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem>To Watch</DropdownItem>
                <DropdownItem>Watched</DropdownItem>
                <DropdownItem>Rankings</DropdownItem>
                <DropdownItem>My Profile</DropdownItem>
            </DropdownMenu>
            </Dropdown>
            <Dropdown className="mr-4 bg-dark" isOpen={dropdown2Open} toggle={toggle2}>
            <DropdownToggle caret>
            Other People's Media
            </DropdownToggle>
            <DropdownMenu>
            <DropdownItem>All Top Lists</DropdownItem>
            <Link to="/users" style={{ textDecoration: 'none' }}><DropdownItem component={Link}>Users</DropdownItem></Link>
            </DropdownMenu>
            </Dropdown>
            <Button onClick={logout} color="danger">Log Out</Button>
            </div>
            </Collapse>
            </Nav>
        </Navbar>
        :
        <Navbar color="dark" dark expand="md">
            
            <NavbarBrand href="/">Media Monday Show</NavbarBrand>
            <Nav className="ml-auto" navbar>
            <NavbarToggler onClick={toggleCollapse} />
            <Collapse isOpen={isOpen} navbar>
            <LoginModal color="danger" buttonLabel="Log In" />
            <NavItem> <Link className="nav-link" to="/signup"><Button color="danger">Sign Up</Button></Link></NavItem>
            </Collapse>
        </Nav>
        </Navbar>
        }
    </>)
}