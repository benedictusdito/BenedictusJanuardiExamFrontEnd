import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import Header from "./Header";
import ManageProduct from "./ManageProduct";

import DetailProduct from "./DetailProduct";
import Checkout from "./Checkout";
import Cart from "./Cart";
import cookies from "universal-cookie";
import { connect } from "react-redux";
import { keepLogin } from "../actions";

const cookie = new cookies();
// localhost:3000/register

class App extends Component {
  componentDidMount() {
    const objCookies = cookie.get("userName");
    if (objCookies !== undefined) {
      this.props.keepLogin(objCookies);
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route path="/" exact component={Home} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/manageproduct" exact component={ManageProduct} />
          <Route
            path="/detailproduct/:product_id"
            exact
            component={DetailProduct}
          />
          <Route path="/checkout" exact component={Checkout} />
          <Route path="/cart" exact component={Cart} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  { keepLogin }
)(App);
