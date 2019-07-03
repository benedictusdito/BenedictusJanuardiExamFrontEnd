import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
// Tembak data ke database pakai axios
import { onLoginUser } from "../actions";
import { connect } from "react-redux";

class Login extends Component {
  // bikin function

  onButtonClick = () => {
    // Ambil data dari teks input
    // Ambil username dan password
    var user = this.username.value;
    var pass = this.password.value;
    // Tembak data ke database
    this.props.onLoginUser(user, pass);
  };

  render() {
    // ketika user login sukses maka user diarahkan ke halaman home
    if (this.props.user.username === "") {
      return (
        <div>
          <h1>{this.props.user.username}</h1>
          <div className="mt-5 row">
            <div className="col-sm-4 mx-auto card">
              <div className="card-body">
                <div className="border-bottom border-secondary card-title">
                  <h1>Login</h1>
                </div>

                <div className="card-title">
                  <h4>Username</h4>
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
                  Click for Login
                </button>
                <p>
                  Tidak memiliki akun ?{" "}
                  <Link to="/Register">Daftar Disini</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return <Redirect to="/" />;
  }
}
const mapStateToProps = state => {
  return {
    user: state.auth // {id, username}
  };
};

export default connect(
  mapStateToProps,
  { onLoginUser }
)(Login);
