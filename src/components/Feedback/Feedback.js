import React, { Component } from "react";
import { withAlert } from "react-alert";
import { motion } from "framer-motion";
import "./Feedback.css";
class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      subject: "",
      message: "",
      idUser: "",
    };
  }
  handleFeedback = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSendFeedback = (e) => {
    e.preventDefault();
    this.props.handleSendFeedback(this.state);
    const alert = this.props.alert;
    setTimeout(() => {
      let { message, statusCode } = this.props.orderMess;
      if (statusCode === 200) {
        alert.success(message);
        this.setState({
          username: "",
          email: "",
          subject: "",
          message: "",
          idUser: "",
        });
        return;
      }
      alert.error(message);
    }, 500);
  };
  componentDidMount() {
    if (JSON.parse(localStorage.getItem("info"))) {
      let { email, username, id } = JSON.parse(
        localStorage.getItem("info")
      ).user;
      this.setState({
        email,
        username,
        idUser: id,
      });
    }
  }
  render() {
    return (
      <>
        <div className="row  justify-content-center">
          <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5  ">
            <div className="feedback">
              <legend style={{ color: "#ed6c02" }}>Form Feedback</legend>
              <div className="form-group  ">
                <label htmlFor="">Name</label>
                <input
                  onChange={this.handleFeedback}
                  value={this.state.username}
                  name="username"
                  type="text"
                  className="form-control"
                  placeholder="Enter name . . ."
                />
                <i class="fas fa-signature"></i>
              </div>
              <div className="form-group">
                <label htmlFor="">Email</label>
                <input
                  onChange={this.handleFeedback}
                  value={this.state.email}
                  name="email"
                  type="text"
                  className="form-control"
                  placeholder="Enter email . . ."
                />
                <i class="far fa-envelope-open"></i>
              </div>
              <div className="form-group">
                <label htmlFor="">Subject</label>
                <input
                  onChange={this.handleFeedback}
                  name="subject"
                  type="text"
                  className="form-control"
                  placeholder="Enter Subject . . ."
                />
                <i id="subject" class="fas fa-map-marked-alt"></i>
              </div>

              <div className="form-group">
                <label htmlFor="input">Message</label>
                <textarea
                  onChange={this.handleFeedback}
                  placeholder="Enter Message . . ."
                  name="message"
                  id="input"
                  class="form-control textarea"
                  rows="3"
                  required="required"
                ></textarea>

                <i
                  style={{ marginLeft: "30px" }}
                  class="fas fa-comment-dots"
                ></i>
              </div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ y: [140, 0], opacity: 1 }}
                transition={{ duration: 2 }}
                onClick={this.handleSendFeedback}
                className="Send btn btn-success"
              >
                Send Message
              </motion.button>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ x: [-440, 0], opacity: 2, rotate: -40 }}
              transition={{ duration: 1 }}
              className="feedback__fake"
            ></motion.div>
          </div>
        </div>
      </>
    );
  }
}
export default withAlert()(Feedback);
