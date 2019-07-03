import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Checkout from "./Checkout";
import Axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myCart: [],
      selectedId: 0,
      modal: false,
      checkout: false
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  componentDidMount() {
    this.getChart();
  }

  getChart = () => {
    Axios.get("http://localhost:2020/cart").then(res => {
      this.setState({ myCart: res.data, selectedId: 0 });
      console.log(this.state.myCart);
      console.log(res);
    });
  };

  totalQuantity = () => {
    // Mengambil objek di dalam array state myCart
    // Menampung hasil penjumlahaan
    var BesarQuantity = 0;
    // Looping array hasil maping diatas
    for (let i = 0; i < this.state.myCart.length; i++) {
      BesarQuantity += parseInt(this.state.myCart[i].quantitiy);
    }
    return (
      // Merender hasil penjumlahan quantity & dimasukan ke besarQuantity
      <td>{BesarQuantity.toLocaleString()}</td>
    );
  };
  deleteCart = id => {
    Axios.delete("http://localhost:2020/cart/" + id).then(res => {
      this.getChart();
    });
  };

  saveCart = item => {
    // Buat penampungan untuk quantity
    const quantitiyBaru = this.editQuantity.value;

    Axios.patch("http://localhost:2020/cart/" + item.id, {
      quantitiy: quantitiyBaru
    }).then(res => this.getChart());
  };

  hargaTotal = () => {
    // Mengambil objek di dalam array state myCart
    // Menampung hasil perkalian
    var totalHarga = 0;
    for (let i = 0; i < this.state.myCart.length; i++) {
      {
        totalHarga += parseInt(
          this.state.myCart[i].quantitiy * this.state.myCart[i].price
        );
      }
    }
    return totalHarga;
  };

  renderList = () => {
    return this.state.myCart.map(item => {
      var price = Intl.NumberFormat()
        .format(item.price)
        .replace(/,/g, ".");
      console.log(price);
      if (item.id !== this.state.selectedId) {
        if (item.idUser === this.props.dataState.id) {
          return (
            <tr>
              <td>
                <img className="list" src={item.src} />
              </td>
              <td>{item.idProduct}</td>
              <td>{item.namaProduct}</td>
              <td scope="col"> Rp.{item.price.toLocaleString()} </td>
              <td>{item.quantitiy}</td>
              <td scope="col"> Rp. {this.hargaTotal().toLocaleString()}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    this.setState({ selectedId: item.id });
                  }}
                >
                  Edit
                </button>

                <button
                  className="btn btn-warning"
                  onClick={() => this.deleteCart(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        }
      } else {
        return (
          <tr>
            <td>
              <img className="list" src={item.src} />
            </td>
            <td>{item.namaProduct}</td>
            <td scope="col"> Rp.{item.price.toLocaleString()} </td>
            <td>
              <input
                className="form-control"
                ref={input => {
                  this.editQuantity = input;
                }}
              />
            </td>
            <td>{item.quantitiy * item.price}</td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => {
                  this.saveCart(item);
                }}
              >
                Save
              </button>
              <button
                className="btn btn-warning"
                onClick={() => this.setState({ selectedId: 0 })}
              >
                Cancel
              </button>
            </td>
          </tr>
        );
      }

      // this.state.products.map(item => { {id.name,price,desc,src}
    });
  };

  checkOut = () => {
    return this.state.myCart.map(item => {
      if (item.id !== this.state.selectedId) {
        if (item.idUser === this.props.dataState.id) {
          return (
            <tr>
              <td>
                <img className="list" src={item.src} />
              </td>
              <td>{item.idProduct}</td>
              <td>{item.namaProduct}</td>
              <td scope="col"> Rp.{item.price.toLocaleString()} </td>
              <td>{item.quantitiy}</td>
              <td scope="col"> Rp.{item.price.toLocaleString()} </td>
            </tr>
          );
        }
      } else {
        return (
          <tr>
            <td>
              <img className="list" src={item.src} />
            </td>
            <td>{item.namaProduct}</td>
            <td scope="col"> Rp.{item.price.toLocaleString()} </td>
            <td>
              <input
                className="form-control"
                ref={input => {
                  this.editQuantity = input;
                }}
              />
            </td>
            <td scope="col"> Rp.{item.price.toLocaleString()} </td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => {
                  this.saveCart(item);
                }}
              >
                Save
              </button>
              <button
                className="btn btn-warning"
                onClick={() => this.setState({ selectedId: 0 })}
              >
                Cancel
              </button>
            </td>
          </tr>
        );
      }

      // this.state.products.map(item => { {id.name,price,desc,src}
    });
  };

  render() {
    return (
      <div className="container">
        <div className="col-lg-12 pl-3 pt-3">
          {this.props.dataState.myCart.length === 0 ? (
            <center>
              <h3>Hallo, {this.props.dataState.username} </h3>
              <h3>
                {" "}
                <Link to="/"> Buy products here </Link>
              </h3>
            </center>
          ) : (
            <div>
              <center>
                <h4>
                  {" "}
                  Ini Adalah Jumlah Belanjaan Kamu
                  {this.props.dataState.username}{" "}
                </h4>
              </center>
            </div>
          )}

          <table className="table table-hover border bg-white">
            <thead>
              <tr>
                <th>
                  <center> Gambar </center>
                </th>

                <th>
                  <center> Id </center>
                </th>

                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {this.renderList()}
              <tr>
                {/* <td />
                <td />
                <td /> */}
                {/* <td>
                  <p>Total Belanjaan:</p>
                </td>
                <td>
                  <p>Rp. {this.hargaTotal()}</p>
                </td> */}
                {/* <td> */}
                {/* <button
                    className="btn btn-warning text-white"
                    onClick={() => this.checkOut()}
                  >
                    {" "}
                    <i
                      className="fa fa-angle-right"
                      onClick={this.toggle}
                    />{" "}
                    Check Out{" "}
                  </button> */}
                {/* </td> */}
                {/* <td /> */}
                {/* <div className="text-center">
                  <button
                    onClick={() => {
                      this.setState({ checkout: true });
                    }}
                    className="btn btn-outline-primary"
                  >
                    Checkout
                  </button>
                </div> */}
                <tr />
                <Checkout cart={this.state.checkout} />
              </tr>
            </tbody>
          </table>
          {this.props.dataState.myCart.length > 0 ? (
            <center>
              <Checkout total={this.props.dataState.totalPrice} />
            </center>
          ) : (
            ""
          )}
          <div>
            <Button className="center" color="danger" onClick={this.toggle}>
              Check Out
            </Button>
            <Modal
              isOpen={this.state.modal}
              toggle={this.toggle}
              className={this.props.className}
            >
              <ModalHeader toggle={this.toggle}>TOTAL</ModalHeader>
              <ModalBody className="table table-hover border bg-white">
                <table>
                  <thead>
                    <tr>
                      <th>
                        <center> Gambar </center>
                      </th>

                      <th>
                        <center> Id </center>
                      </th>

                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.checkOut()}
                    <tr>
                      <td />
                      <td />
                      <td />
                      {/* <td>
                      <thead>
                        <p>Total Belanjaan:</p>
                      </thead>
                    </td>
                    <td>
                      <p>Rp. {this.hargaTotal()}</p>
                    </td> */}
                      <td>
                        {/* <button
                    className="btn btn-warning text-white"
                    onClick={() => this.checkOut()}
                  >
                    {" "}
                    <i
                      className="fa fa-angle-right"
                      onClick={this.toggle}
                    />{" "}
                    Check Out{" "}
                  </button> */}
                      </td>
                      <td />
                    </tr>
                  </tbody>
                </table>
                <p>
                  <h1>Total Rp. {this.hargaTotal()}</h1>
                </p>
                <ModalFooter>
                  <Button color="primary" onClick={this.toggle}>
                    Bayar
                  </Button>{" "}
                  <Button color="secondary" onClick={this.toggle}>
                    Cancel
                  </Button>
                </ModalFooter>
              </ModalBody>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    dataState: state.auth
  };
};

export default connect(mapStateToProps)(Cart);
