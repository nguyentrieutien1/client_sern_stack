import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./Register.css";
import { withAlert } from "react-alert";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { motion } from "framer-motion";
import { init } from "ityped";
import Loading from "./../Loading/Loading";
import io from "socket.io-client";
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      repassword: "",
      address: "",
      numberphone: "",
      isToggleCpn: true,
    };
    this.socket = io(`localhost:9000/`, {
      transports: ["websocket", "polling", "flashsocket"],
    });
  }
  componentDidMount() {
    const myElement = document.querySelector("#myElement");
    let input = document.querySelectorAll("input");
    input.forEach((e) => {
      e.value = "";
    });
    init(myElement, {
      showCursor: false,
      strings: [
        "A simple “bye” can make us cry",
        "a simple “joke” can make us laugh",
        "and a simple ” care” can make us fall in love",
      ],
    });
  }
  handleOnChangInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleGetNumberPhone = (e) => {
    this.setState({
      numberphone: e,
    });
  };
  handleOnRegister = (e) => {
    e.preventDefault();
    const alert = this.props.alert;
    let { username, email, password, repassword, address, numberphone } =
      this.state;
    this.props.handleOnRegister({
      username,
      email,
      password,
      repassword,
      address,
      numberphone,
    });
    this.setState({
      isToggleCpn: false,
    });
    setTimeout(() => {
      this.setState({
        isToggleCpn: true,
      });
      let { statusCode, message } = this.props.orderMess;
      if (statusCode === 200) {
        if (window.confirm(`${message}`)) {
          this.socket.emit("register");
          window.location.href = `https://mail.google.com/`;
        }
      } else {
        alert.error(
          message || `Plz register again, i like that =)))))))))))))`
        );
      }
    }, 4000);
  };

  render() {
    return (
      <div className="all">
        <div className="after">
          <video id="movie" loop="true" autoplay="autoplay" muted>
            <source src="./Seoul - 24603.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="img">
          <img src="./clothing-store-984396.jpg" />
          <div className="text">
            <h3>Tiendz Store</h3>
            <span id="myElement"></span>
            <div className="mxh">
              <motion.i
                initial={{ opacity: 0, zIndex: -1000 }}
                animate={{ y: [40, 10, 0], opacity: 1, zIndex: 1000 }}
                transition={{ duration: 0.6, ease: "anticipate" }}
                class="fab fa-facebook"
              ></motion.i>
              <motion.i
                initial={{ opacity: 0, zIndex: -1000 }}
                animate={{ y: [40, 10, 0], opacity: 1, zIndex: 1000 }}
                transition={{ duration: 1, ease: "anticipate" }}
                class="fab fa-twitter"
              ></motion.i>
              <motion.i
                initial={{ opacity: 0, zIndex: -1000 }}
                animate={{ y: [40, 10, 0], opacity: 1, zIndex: 1000 }}
                transition={{ duration: 1.5, ease: "anticipate" }}
                class="fab fa-instagram"
              ></motion.i>
              <motion.i
                initial={{ opacity: 0, zIndex: -1000 }}
                animate={{ y: [40, 10, 0], opacity: 1, zIndex: 1000 }}
                transition={{ duration: 2, ease: "anticipate" }}
                class="far fa-envelope-open"
              ></motion.i>
            </div>
          </div>
        </div>
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="container__video"
        >
          <div className="resigter__form resgister">
            <div className="resigter__form-d">
              <legend>Register From</legend>
              {this.state.isToggleCpn ? (
                <>
                  <div className="row1">
                    <div className="form-group">
                      <label htmlFor="username">username</label>
                      <input
                        onChange={this.handleOnChangInput}
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        placeholder="Enter username...."
                      />
                      <i class="fas fa-signature"></i>
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        onChange={this.handleOnChangInput}
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        autoComplete="off"
                        placeholder="Enter Email...."
                      />
                      <i class="far fa-paper-plane"></i>
                    </div>
                    <div className="form-group">
                      <label htmlFor="Password">Password</label>
                      <input
                        onChange={this.handleOnChangInput}
                        name="password"
                        type="password"
                        className="form-control"
                        id="Password"
                        autoComplete="off"
                        placeholder="Enter Password...."
                      />
                      <i class="fas fa-key"></i>
                    </div>
                  </div>
                  <div className="row2">
                    <div className="form-group">
                      <label htmlFor="rp">Repeat-Password</label>
                      <input
                        onChange={this.handleOnChangInput}
                        name="repassword"
                        type="text"
                        className="form-control"
                        id="rp"
                        type="password"
                        autoComplete="off"
                        placeholder="Enter Repeat-Password...."
                      />
                      <i class="fas fa-key"></i>
                    </div>
                    <div className="form-group">
                      <label htmlFor="Address">Address</label>
                      <input
                        onChange={this.handleOnChangInput}
                        name="address"
                        type="text"
                        className="form-control"
                        id="Address"
                        placeholder="Enter Address...."
                      />
                      <i class="fas fa-map-marker-alt"></i>
                    </div>
                    <div className="form-group">
                      <label htmlFor="numberphone">Number Phone</label>
                      <PhoneInput
                        placeholder="Enter phone number"
                        onChange={this.handleGetNumberPhone}
                        autoComplete="off"
                        value={this.state.numberphone}
                      />
                      <i class="fas fa-phone-volume"></i>
                    </div>
                  </div>
                </>
              ) : (
                <Loading />
              )}

              <button
                onClick={this.handleOnRegister}
                type="submit"
                className="dangki btn btn-danger"
              >
                Register
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }
}
export default withAlert()(withRouter(Register));
