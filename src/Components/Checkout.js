import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Axios from "axios";

class Checkout extends React.Component {
  state = {
    myCart: [],
    selectedId: 0
  };

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
      <td>{BesarQuantity}</td>
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

  renderCheckout = () => {
    console.log(this.state.myCart);
    var hasil = this.state.myCart.map(item => {
      return (
        <tr>
          <td scope="col"> {item.idProduct} </td>
          <td>{item.namaProduct}</td>
          <td>Rp. {item.price}</td>
          <td scope="col"> {item.quantity} </td>
          <td scope="col"> Rp.{item.price.toLocaleString()} </td>
          <td scope="col">
            {" "}
            ${(item.price * item.quantity).toLocaleString()}{" "}
          </td>
        </tr>
      );
    });
    return hasil;
  };

  renderList = () => {
    return this.state.myCart.map(item => {
      if (item.id !== this.state.selectedId) {
        if (item.idUser === this.props.dataState.id) {
          return (
            <tr>
              <td>{item.idProduct}</td>
              <td>{item.namaProduct}</td>
              {/* <td>
                <img className="list" src={item.src} />
              </td> */}
              <td scope="col"> Rp.{item.price.toLocaleString()} </td>
              <td>{item.quantitiy}</td>
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

  // render() {
  //   return (
  //     <center>
  //       <Link to="/">
  //         <button className="btn btn-warning text-white">
  //           {" "}
  //           <i className="fa fa-angle-left" /> Lanjutkan Belanja{" "}
  //         </button>
  //       </Link>

  //       <span>
  //         {" "}
  //         <strong>Total : Rp. {this.hargaTotal()} </strong>{" "}
  //       </span>

  //       <button
  //         className="btn btn-success"
  //         onClick={() => alert("Thankyou :)")}
  //       >
  //         {" "}
  //         <i className="fa fa-angle-left" /> Bayar Sekarang{" "}
  //       </button>
  //     </center>
  //   );
  // }

  render() {
    return (
      <div>
        <h3> Checkout </h3>
        <table className="table table-hover mb-5">
          <thead>
            <tr>
              <td scope="col">
                {" "}
                <b> Id</b>
              </td>
              <td scope="col">
                {" "}
                <b> Nama</b>
              </td>
              <td scope="col">
                {" "}
                <b> Price </b>
              </td>
              <td scope="col">
                {" "}
                <b> Total </b>
              </td>
            </tr>
          </thead>
          <tbody>
            {/*  */}
            {this.renderList()}
            {/*  */}
            <tr>
              <td scope="col">
                {" "}
                <b> Total Quantity </b>{" "}
              </td>
              <td scope="col"> {this.totalQuantity()}</td>
              <td scope="col"> </td>
              <td scope="col"> </td>
            </tr>

            <tr>
              <td scope="col">
                {" "}
                <b> Total Price </b>{" "}
              </td>
              <td scope="col"> </td>
              <td scope="col"> </td>
              <td scope="col"> {this.hargaTotal()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    dataState: state.auth
  };
};

export default connect(mapStateToProps)(Checkout);
