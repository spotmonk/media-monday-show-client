import React, { useState } from 'react';
import { Link } from "react-router-dom"
import LoginModal from '../auth/loginModal'
import {  Nav, Navbar, NavbarBrand,Dropdown, DropdownToggle, DropdownMenu, DropdownItem, NavItem } from 'reactstrap';
import { useHistory } from 'react-router'

export const NavBar = (props) => {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdown2Open, setDropdown2Open] = useState(false);
    const history = useHistory()

    const toggle = () => setDropdownOpen(prevState => !prevState);
    const toggle2 = () => setDropdown2Open(prevState => !prevState);

    const logout = () => {
        localStorage.removeItem('token')
        history.go(0)
    }

    return (
        <>
            {localStorage.getItem('token') ? 
            <Navbar color="dark" dark expand="md">
            <Nav className="d-flex" navbar>
            <NavbarBrand  href="/">Media Monday Show</NavbarBrand>
            </Nav>
            <div className="container">
            <NavbarBrand className="ml-auto mr-4">Media</NavbarBrand>
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
            <DropdownItem>Users</DropdownItem>
            </DropdownMenu>
            </Dropdown>
            </div>
            <NavbarBrand className="ml-auto" onClick={logout}>Logout</NavbarBrand>
            
        </Navbar>
        :
        <Navbar color="dark" dark expand="md">
            <Nav className="ml-auto" navbar>
            <NavbarBrand href="/">Media Monday Show</NavbarBrand>
            <LoginModal buttonLabel="Log In" />
            <NavItem><button className="btn-danger">Sign Up</button></NavItem>
        </Nav>
        </Navbar>
        }
    </>)
}