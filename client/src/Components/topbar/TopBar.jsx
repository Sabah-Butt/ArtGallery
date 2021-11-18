import React from "react";
import "./topbar.css"
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";

import  {useContext} from "react";
import {Context} from "../../context/Context";

export default function TopBar() {
    const {user, dispatch}= useContext(Context);
    
    const handleLogout = ()=>{
        dispatch({type: "LOGOUT"});
    };
    return (
      
        <Navbar collapseOnSelect expand="lg" variant="dark" style={{backgroundColor:"#282828"}}>
        <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link href="/">HOME</Nav.Link>
            <Nav.Link href="/posts">ART GALLERY</Nav.Link>
            <NavDropdown title="MY GALLERY" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/MyGallery">MY POSTS</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/addPost">ADD NEW POST</NavDropdown.Item>
            </NavDropdown>
            </Nav>
            <Nav>
               
            
            {
            user ? (<Nav.Link onClick={handleLogout}>LOG OUT</Nav.Link>) 
            : (
                <>
                <Nav.Link href="/login">LOG IN</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
                </>
                )
            }

            
            </Nav>
        </Navbar.Collapse>
        </Container>
        </Navbar>
  
    )
    
}
