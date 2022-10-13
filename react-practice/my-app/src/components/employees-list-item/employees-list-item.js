import { Component } from "react";

import "./employees-list-item.css";

class EmployeesListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPromotion: false,
    };
  }

  onPromotion = () => {
    this.setState(({ isPromotion }) => ({
      isPromotion: !isPromotion,
    }));
  };

  render() {
    const { name, salary } = this.props;
    const { isPromotion } = this.state;
    let employeeType = "list-group-item d-flex justify-content-between";
    if (isPromotion) {
      employeeType += " increase";
    }

    return (
      <li className={employeeType}>
        <span className="list-group-item-label">{name}</span>
        <input
          type="text"
          className="list-group-item-input"
          defaultValue={salary + "$"}
        />
        <div className="d-flex justify-content-center align-items-center">
          <button
            type="button"
            className="btn-cookie btn-sm"
            onClick={this.onPromotion}
          >
            <i className="fas fa-cookie"></i>
          </button>

          <button type="button" className="btn-trash btn-sm">
            <i className="fas fa-trash"></i>
          </button>
          <i className="fas fa-star"></i>
        </div>
      </li>
    );
  }
}

export default EmployeesListItem;
