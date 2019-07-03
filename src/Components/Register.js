import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Register extends Component {
  onButtonClick = () => {
    const user = this.username.value;
    const emaiL = this.email.value;
    const pass = this.password.value;

    // GET, axios.get => request data / Mencari data
    axios
      .get("http://localhost:2020/users", {
        params: {
          username: user
        }
      })
      .then(res => {
        // Jika data ditemukan, array.length > 0
        if (res.data.length > 0) {
          console.log("Username sudah digunakan");
        } else {
          // Check Berdasarkan E-mail
          axios
            .get(" http://localhost:2020/users", {
              params: {
                email: emaiL
              }
            })
            .then(res => {
              console.log(res);

              // Jika data ditemukan, array.length > 0
              if (res.data.length > 0) {
                console.log("Email sudah digunakan");
              } else {
                // Post Data
                axios
                  .post(" http://localhost:2020/users", {
                    username: user,
                    email: emaiL,
                    password: pass
                  })
                  .then(res => {
                    console.log("Data berhasil");
                    console.log(res);
                  })
                  .catch(err => {
                    console.log("Gagal post data");
                    console.log(err);
                  });

                console.log("Akan input data");
              }
            });
        }
      })
      .catch(err => {
        console.log("Gagal Request Data");
      });
    // POST, axios.post, post/menaruh data
  };

  render() {
    return (
      <div>
        <div className="mt-5 row">
          <div className="col-sm-4 mx-auto card">
            <div className="card-body">
              <div className="border-bottom border-secondary card-title">
                <h1>Register</h1>
              </div>

              <div className="card-title">
                <h4>User Name</h4>
              </div>
              <form className="input-group">
                <input
                  className="form-control"
                  ref={input => {
                    this.username = input;
                  }}
                />
              </form>
              <div className="card-title">
                <h4>Email</h4>
              </div>
              <form className="input-group">
                <input
                  className="form-control"
                  ref={input => {
                    this.email = input;
                  }}
                />
              </form>
              <div className="card-title">
                <h4>Password</h4>
              </div>
              <form className="input-group">
                <input
                  className="form-control"
                  type="password"
                  ref={input => {
                    this.password = input;
                  }}
                />
              </form>

              <button
                onClick={this.onButtonClick}
                className="btn btn-success mt-3"
              >
                Login Now
              </button>
              <p>
                Sudah memiliki akun ? <Link to="/Login">Login Disini</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
