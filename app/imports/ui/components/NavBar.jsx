import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';
import { ComponentIDs } from '../utilities/ids';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
    loggedIn: !!Meteor.user(),
  }), []);
  // const menuStyle = { backgroundColor: 'E2D4C7', marginBottom: '0px' };
  return (
    <Navbar expand="lg" style={{ backgroundColor: '#E2D4C7' }}>
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="align-items-center">
          <span style={{ fontWeight: 800, fontSize: '24px' }}><Image src="/images/logo.png" width={75} style={{ marginBottom: 3 }} /></span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={ComponentIDs.basicNavbarNav} />
        <Navbar.Collapse id={ComponentIDs.basicNavbarNav}>
          <Nav className="me-auto justify-content-start">
            {currentUser ? (
              <Nav.Link as={NavLink} id={ComponentIDs.homeMenuItem} to="/home" key="home">Home</Nav.Link>
            ) : ''}
            <Nav.Link as={NavLink} id={ComponentIDs.profilesMenuItem} to="/profiles" key="profiles">Profile</Nav.Link>
            <Nav.Link as={NavLink} id={ComponentIDs.projectsMenuItem} to="/projects" key="projects">Recipes</Nav.Link>
            <Nav.Link as={NavLink} id={ComponentIDs.interestsMenuItem} to="/interests" key="interests">Ingredients</Nav.Link>
            {currentUser ? (
              [<Nav.Link as={NavLink} id={ComponentIDs.addProjectMenuItem} to="/addProject" key="addP">Add Recipe</Nav.Link>,
                <Nav.Link as={NavLink} id={ComponentIDs.filterMenuItem} to="/filter" key="filter" />]
            ) : ''}
          </Nav>
          <Nav className="justify-content-end">
            {currentUser === '' ? (
              <NavDropdown id={ComponentIDs.loginDropdown} title="Login">
                <NavDropdown.Item id={ComponentIDs.loginDropdownSignIn} as={NavLink} to="/signin">
                  <PersonFill />
                  Sign
                  in
                </NavDropdown.Item>
                <NavDropdown.Item id={ComponentIDs.loginDropdownSignUp} as={NavLink} to="/signup">
                  <PersonPlusFill />
                  Sign
                  up
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id={ComponentIDs.currentUserDropdown} title={currentUser}>
                <NavDropdown.Item id={ComponentIDs.currentUserDropdownSignOut} as={NavLink} to="/signout">
                  <BoxArrowRight />
                  {' '}
                  Sign
                  out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;