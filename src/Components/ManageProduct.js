import React, { Component } from "react";
import axios from "axios";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class ManageProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      modal: false,
      editProduct: "",
      selectID: 0
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    // Akses database

    this.getProduct();
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  getProduct = () => {
    axios.get("http://localhost:2020/products").then(res => {
      console.log(res);
      this.setState({ products: res.data });
    });
  };

  deleteProduct = item => {
    const id = item.id;
    const url = "http://localhost:2020/products/" + id;

    axios.delete(url).then(res => {
      console.log("Berhasil delete");
      console.log(res);

      axios.get("http://localhost:2020/products").then(res => {
        console.log("data berhasil masuk");
        console.log(res);
        this.setState({ products: res.data });
      });
    });
  };

  addProduct = () => {
    //
    const id = this.state.editProductBaru.id;
    const nameProduct = this.nama.value;
    const descProduct = this.desc.value;
    const priceProduct = Number(this.price.value);
    const srcProduct = this.src.value;
    // Post product ke database
    axios
      .post("http://localhost:2020/products/" + id, {
        name: nameProduct,
        desc: descProduct,
        price: priceProduct,
        src: srcProduct
      })
      .then(res => {
        console.log("Data berhasil");
        console.log(res);
        axios.get("http://localhost:2020/products").then(res => {
          console.log(res);
          this.setState({ products: res.data });
        });
      })
      .catch(err => {
        console.log("Gagal Post data");
        console.log(err);
      });
  };

  editProductBaru = item => {
    this.setState({ editProduct: item });
    this.toggle();
    console.log(item);
  };

  onSaveItem = () => {
    const ID = this.state.editProduct.id;
    const namaBaru = this.editName.value;
    const descBaru = this.editDesc.value;
    const priceBaru = Number(this.editPrice.value);
    const pictureBaru = this.editPicture.value;

    axios
      .put("http://localhost:2020/products/" + ID, {
        name: namaBaru,
        desc: descBaru,
        price: priceBaru,
        src: pictureBaru
      })
      .then(res => {
        this.getProduct();
      });

    this.toggle();
  };

  renderList = () => {
    return this.state.products.map(item => {
      // this.state.products.map(item => { {id.name,price,desc,src}
      return (
        <tr>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.desc}</td>
          <td>{item.price}</td>
          <td>
            <img className="list" src={item.src} />
          </td>
          <td>
            <Button
              color="danger"
              onClick={() => {
                this.editProductBaru(item);
              }}
            >
              Edit
            </Button>

            <button
              className="btn btn-warning"
              onClick={() => this.deleteProduct(item)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };
  render() {
    if (this.props.user.username !== "") {
      return (
        <div className="container">
          <h1 className="display-4 text-center">List Product</h1>
          <table className="table table-hover mb-5">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">NAME</th>
                <th scope="col">DESC</th>
                <th scope="col">PRICE</th>
                <th scope="col">PICTURE</th>
                <th scope="col">ACTION</th>
              </tr>
            </thead>
            <tbody>{this.renderList()}</tbody>
            <tbody />
          </table>
          <h1 className="display-4 text-center">Input Product</h1>
          <table className="table text-center">
            <thead>
              <tr>
                <th scope="col">NAME</th>
                <th scope="col">DESC</th>
                <th scope="col">PRICE</th>
                <th scope="col">PICTURE</th>
                <th scope="col">ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="col">
                  <input
                    ref={input => (this.nama = input)}
                    className="form-control"
                    type="text"
                  />
                </th>
                <th scope="col">
                  <input
                    ref={input => (this.desc = input)}
                    className="form-control"
                    type="text"
                  />
                </th>
                <th scope="col">
                  <input
                    ref={input => (this.price = input)}
                    className="form-control"
                    type="text"
                  />
                </th>
                <th scope="col">
                  <input
                    ref={input => (this.src = input)}
                    className="form-control"
                    type="text"
                  />
                </th>
                <th scope="col">
                  <button
                    className="btn btn-outline-warning"
                    onClick={this.addProduct}
                  >
                    Add
                  </button>
                </th>
                <Modal
                  isOpen={this.state.modal}
                  toggle={this.toggle}
                  className={this.props.className}
                >
                  <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                  <ModalBody>
                    <Form>
                      <FormGroup>
                        <Label for="exampleEmail">Name</Label>
                        <input
                          ref={input => {
                            this.editName = input;
                          }}
                          type="email"
                          name="email"
                          id="exampleEmail"
                          placeholder="with a placeholder"
                          defaultValue={this.state.editProduct.name}
                          className="form-control"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="examplePassword">Description</Label>
                        <input
                          ref={input => {
                            this.editDesc = input;
                          }}
                          type="text"
                          name="password"
                          id="examplePassword"
                          placeholder="password placeholder"
                          defaultValue={this.state.editProduct.desc}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="examplePassword">Price</Label>
                        <input
                          ref={input => {
                            this.editPrice = input;
                          }}
                          type="text"
                          name="password"
                          id="examplePassword"
                          placeholder="password placeholder"
                          defaultValue={this.state.editProduct.price}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="examplePassword">Picture</Label>
                        <input
                          ref={input => {
                            this.editPicture = input;
                          }}
                          type="text"
                          name="password"
                          id="examplePassword"
                          placeholder="password placeholder"
                          defaultValue={this.state.editProduct.src}
                        />
                      </FormGroup>
                    </Form>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="primary"
                      onClick={() => {
                        this.onSaveItem();
                      }}
                    >
                      Save Data
                    </Button>{" "}
                    <Button color="secondary" onClick={this.toggle}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
    return <Redirect to={"/login"} />;
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth
  };
};

export default connect(mapStateToProps)(ManageProduct);
