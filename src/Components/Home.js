import React, { Component } from "react";
import axios from "axios";

import ProductItem from "./ProductItem";

class Home extends Component {
  state = {
    products: [],
    searchProduct: [],
    order: 0
  };
  handlePlus = () => {
    this.setState({
      order: this.state.order + 1
    });
  };

  handleMinus = () => {
    if (this.state.order > 0) {
      this.setState({
        order: this.state.order - 1
      });
    }
  };
  componentDidMount() {
    this.getProduct();
  }

  onBtnSearch = () => {
    const nameFilter = this.name.value;
    const minFilter = parseInt(this.min.value);
    const maxFilter = parseInt(this.max.value);

    var arrSearch = this.state.searchProduct.filter(item => {
      if (isNaN(minFilter) && isNaN(maxFilter)) {
        // Search by name
        return item.name.toLowerCase().includes(nameFilter.toLowerCase());
      } else if (isNaN(minFilter)) {
        return (
          item.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
          item.price <= maxFilter
        );
      } else if (isNaN(maxFilter)) {
        return (
          item.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
          item.price >= minFilter
        );
      } else if (item.price <= maxFilter && item.price >= minFilter) {
        return (
          item.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
          (item.price >= minFilter && item.price <= maxFilter)
        );
      }
    });

    this.setState({ products: arrSearch });
  };

  getProduct = () => {
    axios.get("http://localhost:2020/products").then(res => {
      this.setState({ products: res.data, searchProduct: res.data });
    });
  };

  renderList = () => {
    return this.state.products.map(item => {
      return <ProductItem barang={item} />;
    });
  };

  render() {
    return (
      <div className="row">
        <div className="col">
          <div className="mt-5">
            <div className="mx-auto card">
              <div className="card-body">
                <div className="border-bottom border-secondary card-title">
                  <h1>Search</h1>
                </div>
                <div className="card-title mt-1">
                  <h4>Name</h4>
                </div>
                <form className="input-group">
                  <input
                    ref={input => (this.name = input)}
                    className="form-control"
                    type="text"
                  />
                </form>
                <div className="card-title mt-1">
                  <h4>Price</h4>
                </div>
                <form className="input-group">
                  <input
                    placeholder="Minimum"
                    ref={input => (this.min = input)}
                    className="form-control mb-2"
                    type="text"
                  />
                </form>
                <form className="input-group">
                  <input
                    placeholder="Maximum"
                    ref={input => (this.max = input)}
                    className="form-control"
                    type="text"
                  />
                </form>
                <button
                  onClick={this.onBtnSearch}
                  className="btn btn-outline-secondary btn-block mt-5"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row col-10">{this.renderList()}</div>
      </div>
    );
  }
}

export default Home;
