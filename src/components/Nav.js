import React, { Component } from 'react';
import { Navbar, NavItem, NavLink, NavbarNav, NavbarToggler, Collapse, Fa } from 'mdbreact';
import logo from '../images/logo.svg';
import './Nav.css';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
      totalQuantity: 0,
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  render() {
    return (
      <Navbar className="sticky-top" color="indigo darken-3" dark expand="md">
        <div className="container">
          <NavLink className="logo mx-4 d-flex align-items-center" to="/">
            <img src={logo} alt="logo" />
          </NavLink>
          {!this.state.isWideEnough && <NavbarToggler onClick={this.onClick} />}
          <Collapse isOpen={this.state.collapse} navbar>
            <NavbarNav left>
              <NavItem className="pr-3 h-100">
                <NavLink to="/starters">Starters</NavLink>
              </NavItem>
              <NavItem className="pr-3 h-100">
                <NavLink to="/soups">Soups</NavLink>
              </NavItem>
              <NavItem className="pr-3 h-100">
                <NavLink to="/mains">Main Dishes</NavLink>
              </NavItem>
              <NavItem className="pr-3 h-100">
                <NavLink to="/pizzas">Pizza</NavLink>
              </NavItem>
              <NavItem className="pr-3 h-100">
                <NavLink to="/desserts">Dessert</NavLink>
              </NavItem>
              <NavItem className="pr-3 h-100">
                <NavLink to="/drinks">Drinks</NavLink>
              </NavItem>
            </NavbarNav>
            <NavbarNav right className="mx-4">
              <NavItem>
                <NavLink to="/cart">
                  <Fa icon="shopping-cart" /> Cart
                  <span className="text-white badge badge-light mx-2"> {this.props.totalQuantity}</span>
                </NavLink>
              </NavItem>
            </NavbarNav>
          </Collapse>
        </div>
      </Navbar>
    );
  }
}

export default Nav;
