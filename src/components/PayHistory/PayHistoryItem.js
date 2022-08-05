import React, { Component } from "react";
import { connect } from "react-redux";
class PayHistoryItem extends Component {
  destroyOrder = (id, obj) => {
    if (window.confirm(`You sure cancel order ? :v`)) {
      this.props.destroyOrder(id);
      this.props.addCancelProduct(obj);
    }
  };
  render() {
    let { id, image, title, price, active, description } = this.props;
    return (
      <>
        <tr>
          <td>
            <img src={image} />
          </td>
          <td>{price} $</td>
          <td>{title}</td>
          <td>
            <span
              className={active ? `label label-success` : `label label-danger`}
            >
              {active ? `Approved ` : `not approved yet`}
            </span>
          </td>
          <td style={{ textAlign: "center" }}>
            {active ? (
              <button
                type="button"
                className="btn btn-sm btn-primary"
                title="cant't cancel order because store sended product"
                disabled
                onMouseOver={this.handleOnMouseEvent}
              >
                Cancel Order
              </button>
            ) : (
              <button
                onClick={() =>
                  this.destroyOrder(id, {
                    id,
                    image,
                    title,
                    price,
                    active,
                    description,
                  })
                }
                type="button"
                className="btn btn-sm btn-primary"
              >
                Cancel order
              </button>
            )}
          </td>
        </tr>
      </>
    );
  }
}
export default connect()(PayHistoryItem);
