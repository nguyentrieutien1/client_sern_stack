import React, { Component } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { init } from "ityped";
import "./Home.css";
export default class Home extends Component {
  componentDidMount() {
    const myElement = document.querySelector("#myElement");
    let info = JSON.parse(localStorage.getItem("info"));
    init(myElement, {
      showCursor: false,
      strings: [
        `HELLO ${info && info.user ? info.user.username : " "} !!`,
        "WELLCOME TO TIENDZ STORE!!!",
      ],
    });
  }
  render() {
    let customLink = [
      {
        text: "LOGIN",
        to: "/login",
        className: "login",
      },
      {
        text: "REGISTER",
        to: "/register",
        className: "register",
      },
    ];
    return (
      <>
        <div className="main">
          <div className="container_video">
            <video id="movie" loop="true" autoplay="autoplay" muted>
              <source src="./Clothing - 1006.mp4" type="video/mp4" />
            </video>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            id="myElement"
          ></motion.div>
          <div id="text">Z</div>
          <motion.div
            animate={{ x: [-440, 400, -100, 200, -10, 0] }}
            transition={{ duration: 1 }}
            className="intro"
          >
            <h2>Foundation for sublimation</h2>
            <span>
              Aiming at the image of modern women, TienZX fashion <br />
              focuses on honoring sophistication, elegance and sensuality, with
              the slogan "Fashion
              <br /> pioneer", Chic-land has built <br /> its own image.
            </span>
          </motion.div>
          <div className="video"></div>
          <ul className="link">
            {customLink.map((link, index) => {
              return (
                <motion.li
                  animate={{ x: [-440, 400, -100, 200, -10, 0] }}
                  transition={{ duration: 1 }}
                  className="item"
                >
                  <Link
                    style={{ color: "black" }}
                    key={index}
                    className={`link-item ${link.className}`}
                    to={link.to}
                  >
                    {link.text}
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </>
    );
  }
}
