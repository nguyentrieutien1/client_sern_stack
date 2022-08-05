import React, { Component } from "react";
import "./Store.css";
import Pagination from "react-js-pagination";
import { withAlert } from "react-alert";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link, withRouter } from "react-router-dom";
import Loading from "../Loading/Loading";
import { motion } from "framer-motion";
class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      arr: [],
      value: "",
      type: "",
      checked: "all",
      value1: 0,
      isLoading: false,
    };
  }
  componentDidMount() {
    AOS.init({
      offset: 300,
      duration: 400,
      easing: "ease-in-out-cubic",
    });
    this.setState({
      isLoading: true,
    });
    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 1000);
    let pagination = document.querySelector(".pagination");
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 100) {
        pagination.style.top = "30%";
      } else {
        pagination.style.top = "35%";
      }
    });
  }
  handlePageChange = (numberPage) => {
    this.setState({
      activePage: numberPage,
      value: "",
      isLoading: true,
    });
    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 1000);

    let token = JSON.parse(localStorage.getItem("token"));
    this.props.handlePageChange(numberPage, token);
  };
  buyProduct = (product) => {
    let token = JSON.parse(localStorage.getItem("token"));
    const alert = this.props.alert;
    this.props.buyProduct(product, token);
    setTimeout(() => {
      let { statusCode, message } = this.props.message;
      if (statusCode === 400) {
        if (window.confirm(`${message}`)) {
          let { history } = this.props;
          history.push("/login");
          return;
        }
        return;
      }
      alert.success(message);
    }, 300);
  };
  renderProducts = () => {
    let arrAnimation = [
      "fade",
      "fade-up",
      "fade-down",
      "fade-left",
      "fade-right",
      "fade-up-right",
      "fade-up-left",
      "fade-down-right",
      "fade-down-left",
      "fade",
      "fade",
      "fade-down-left",
      "fade",
      "fade-down-left",
    ];
    let countAnimate = 0;
    return this.state.arr.map((product, index) => {
      if (index === 3 || index === 6 || index === 9 || index === 11) {
        countAnimate++;
      }
      return (
        <div
          key={index}
          className="card text-left"
          data-aos={arrAnimation[countAnimate]}
        >
          <img className="card-img" src={product.image} alt="" />
          <div className="card-body">
            <h2 className="card-title">{product.price} $</h2>
            <h4 className="card-title">{product.title.slice(0, 30)}</h4>
            <span className="card-text">
              {product.description.slice(0, 100)}
            </span>
            <br />
            <hr />
            <button
              onClick={() => this.buyProduct(product)}
              style={{ textAlign: "center" }}
              type="button"
              className="buy__btn"
            >
              Buy Product
            </button>
            <Link
              to={`/view-details/${product.id}`}
              style={{ textAlign: "center" }}
              className="details__btn"
            >
              <span class="label label-danger">Views Details</span>
            </Link>
          </div>
        </div>
      );
    });
  };
  handleSearchInput = (e) => {
    let { value } = e.target;
    this.setState({
      value,
    });
    if (value) {
      let findValue = this.props.products.filter((arr) =>
        arr.title.toLowerCase().includes(value.toLowerCase())
      );
      this.setState({
        arr: findValue,
      });
    } else {
      this.setState({
        arr: this.props.products,
      });
    }
  };
  componentDidUpdate(props, state) {
    if (props.products !== this.props.products) {
      this.setState({
        arr: this.props.products,
      });
    }
  }
  handleOnchangeTypeInput = (e) => {
    let { value } = e.target;
    let { name } = e.target;
    let category = [];
    if (value) {
      if (value !== "all") {
        category = this.props.products.filter(
          (item) => item.category === value
        );
        this.setState({
          arr: category,
          checked: name,
        });
        return;
      }
      this.setState({
        arr: this.props.products,
        checked: name,
      });
    }
  };
  handleGetValueRangeInput = (e) => {
    let { value } = e.target;
    let arr = this.props.products.filter(
      (product) => parseFloat(product.price) < parseFloat(value)
    );
    this.setState({
      arr,
      value1: value,
    });
  };
  render() {
    // return <Loading />;
    return (
      <>
        <div className="row">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ x: [-440, 0], opacity: 1 }}
            transition={{ duration: 2 }}
            className="search-input"
          >
            <h3>Fillter By</h3>
            <h3>S e a r c h</h3>
            <div className="search">
              <input
                onChange={this.handleSearchInput}
                type="text"
                placeholder="Search  . . ."
                value={this.state.value}
              />
              <div className="search__icon">
                <i class="fas fa-search"></i>
              </div>
              <span class="bottom"></span>
              <span class="right"></span>
              <span class="top"></span>
              <span class="left"></span>
            </div>

            <div
              className="checkbox"
              onChange={this.handleOnchangeTypeInput}
              name="checkbox"
            >
              <h3>C a t e r g o r y</h3>
              <label>
                <input
                  name="all"
                  type="checkbox"
                  value="all"
                  checked={this.state.checked === "all"}
                />
                All
                <span class="checkmark"></span>
              </label>
              <label>
                <input
                  checked={this.state.checked === "men's clothing"}
                  type="checkbox"
                  value="men's clothing"
                  name="men's clothing"
                />
                Men's Clothing
              </label>
              <label>
                <input
                  checked={this.state.checked === "jewelery"}
                  type="checkbox"
                  value="jewelery"
                  name="jewelery"
                />
                Jewelery
              </label>
              <label>
                <input
                  checked={this.state.checked === "electronics"}
                  type="checkbox"
                  value="electronics"
                  name="electronics"
                />
                Electronics
              </label>
              <label>
                <input
                  checked={this.state.checked === "women's clothing"}
                  type="checkbox"
                  value="women's clothing"
                  name="women's clothing"
                />
                Women's Clothing
              </label>
            </div>
            <div className="ranger__input">
              <h3>R a n g e r</h3>

              <input
                onChange={this.handleGetValueRangeInput}
                type="range"
                id="input"
                class="form-control"
                min="0"
                max="1000"
                step="10"
              />
              <h4>
                Price: {this.state.value1} $ (
                {`Product < ${this.state.value1} $`})
              </h4>
            </div>
          </motion.div>
          <div className="render__products">
            {this.state.isLoading ? (
              <Loading />
            ) : this.state.arr.length < 1 ? (
              <h1>HIEN TAI CHUA CO HANG AHIHI</h1>
            ) : (
              this.renderProducts()
            )}
          </div>
          <div className="pagination">
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={30}
              totalItemsCount={450}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange.bind(this)}
            />
          </div>
        </div>
      </>
    );
  }
}
export default withAlert()(withRouter(Store));
