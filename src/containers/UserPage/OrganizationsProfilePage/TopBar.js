import React from 'react';
import {Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink} from 'mdbreact';
import {BrowserRouter as Router} from 'react-router-dom';

class NavbarFeatures extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse
    });
  }
  render() {
    return (
      <Router>
        <Navbar className="navbatop" dark expand="md" scrolling>
          <NavbarBrand href="/">
            <img src="https://i.postimg.cc/d3wznzMb/logo.png" className="logo" alt="jeck" />
          </NavbarBrand>
          { !this.state.isWideEnough && <NavbarToggler onClick={this.onClick} />}
          <Collapse isOpen={this.state.collapse} navbar>
            <NavbarNav left>
              <NavItem>
                <NavLink to="/announcement" >Announcements</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="#">Organizations</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="#">Events</NavLink>
              </NavItem>
            </NavbarNav>
            <NavbarNav right>
              <NavItem>
                <form className="form-inline md-form mt-0">
                  <input className="form-control mr-sm-2 mb-0 text-white" type="text" placeholder="Search" aria-label="Search" />
                </form>
              </NavItem>
            </NavbarNav>
          </Collapse>
        </Navbar>
      </Router>
    );
  }
}
export default NavbarFeatures;
