import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { addToCart } from "../actions/index";
import Axios from "axios";

class ProductItem extends Component {
  funAddToChart = () => {
    var { id, name, price, src } = this.props.barang;
    const inputQuantity = parseInt(this.quantitiy.value);
    var idUser = this.props.user.id;
    Axios.post("http://localhost:2020/cart", {
      idUser: idUser,
      idProduct: id,
      namaProduct: name,
      price: price,
      quantitiy: inputQuantity,
      src: src
    }).then(res => {
      console.log(res);
      return alert("Data sudah diinput");
    });
  };

  // handleClick = id => {
  //   console.log(inputQuantity);
  //   if (isNaN(inputQuantity)) {
  //     alert("Mohon masukan data yang benar");
  //   } else {
  //     this.props.addToCart(id, inputQuantity);
  //   }
  // };
  // handlePlus = () => {
  //   this.setState({
  //     order: this.state.order + 1
  //   });
  // };

  // handleMinus = () => {
  //   if (this.state.order > 0) {
  //     this.setState({
  //       order: this.state.order - 1
  //     });
  //   }
  // };
  render() {
    var { id, name, price } = this.props.barang;

    return (
      <div className="card col-3 m-5" key={this.props.barang.id}>
        <div className="card-image" />
        <img className="card-img-top" src={this.props.barang.src} />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">Rp. {price}</p>

          <br />
          <Link to={"/detailproduct/" + id}>
            <button className="btn btn-outline-primary btn-block">
              Details
            </button>
          </Link>
          <button
            className="btn btn-primary btn-block"
            onClick={() => {
              this.funAddToChart(this.props.barang);
            }}
          >
            Add To Cart
          </button>
          <input
            ref={input => (this.quantitiy = input)}
            className="form-control"
            placeholder="Quantity"
            type="number"
            min="0"
          />
        </div>
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
  { addToCart }
)(ProductItem);
