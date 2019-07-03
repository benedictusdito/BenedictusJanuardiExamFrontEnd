import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Axios from "axios";

import { onLogoutUser } from "../actions";

import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      cart: []
    };
  }
  getChart = () => {
    Axios.get("http://localhost:2020/cart").then(res => {
      this.setState({ cart: res.data, selectedId: 0 });
      console.log(this.state.cart);
      console.log(res);
    });
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  // // state = {
  //   cart: []
  // };

  componentDidMount() {
    Axios.get("http://localhost:2020/cart").then(res => {
      this.setState({ cart: res.data });
    });
  }

  totalQuantity = () => {
    // Mengambil objek di dalam array state myCart
    // Menampung hasil penjumlahaan
    var BesarQuantity = 0;
    // Looping array hasil maping diatas
    for (let i = 0; i < this.state.cart.length; i++) {
      if (this.props.user.id === this.state.cart[i].idUser)
        BesarQuantity += parseInt(this.state.cart[i].quantitiy);
    }
    return (
      // Merender hasil penjumlahan quantity & dimasukan ke besarQuantity
      BesarQuantity
    );
  };

  onButtonClick = () => {
    // menghapus username dari redux state
    this.props.onLogoutUser();
  };

  // totalCart = () => {
  //   var total = 0;
  //   for (let i = 0; i < array.length; i++) {
  //     if (this.props.user.id === this.state.cart[i].idUser) {
  //       total += 1;
  //     }
  //   }
  //   return total;
  // };

  render() {
    if (this.props.user.username == "") {
      // Render ketika belum login
      return (
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">simpleMerce</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <div className="icon col">
                  <h5>
                    <i className="fas fa-cart-plus" />
                  </h5>
                </div>
                <NavItem>
                  <Link to="/">All Products</Link>
                </NavItem>
                <NavItem>
                  <Link to="/register">
                    <Button color="primary" className="mx-3">
                      Register
                    </Button>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/login">
                    <Button color="success">Login</Button>
                  </Link>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
    }

    // Render setelah login
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">simpleMerce</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="mt-2">
                <Link to="/">All Products</Link>
              </NavItem>
              <NavItem className="mt-8" />
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Hallo, {this.props.user.username}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <Link to="/manageproduct">Manage Product</Link>
                  </DropdownItem>
                  <DropdownItem>
                    {" "}
                    <Link to="./cart">
                      Jumlah Belanjaan: {this.totalQuantity()}
                    </Link>
                  </DropdownItem>
                  <DropdownItem divider />
                  <Button
                    className="dropdown-item"
                    onClick={this.onButtonClick}
                    href="/"
                  >
                    Logout
                  </Button>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth // {id, username}
  };
};

export default connect(
  mapStateToProps,
  { onLogoutUser }
)(Header);
