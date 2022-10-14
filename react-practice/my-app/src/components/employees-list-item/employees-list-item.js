import { Component } from "react";

import "./employees-list-item.css";

class EmployeesListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSalaryIncrease: false,
      isPromotion: false,
    };
  }

  onSalaryIncrease = () => {
    this.setState(({ isSalaryIncrease }) => ({
      isSalaryIncrease: !isSalaryIncrease,
    }));
  };

  onPromotion = () => {
    this.setState(({ isPromotion }) => ({
      isPromotion: !isPromotion,
    }));
  };

  render() {
    const { name, salary } = this.props;
    const { isSalaryIncrease, isPromotion } = this.state;
    let employeeType = "list-group-item d-flex justify-content-between";
    if (isSalaryIncrease) {
      employeeType += " increase";
    }
    if (isPromotion) {
      employeeType += " like";
    }

    return (
      <li className={employeeType}>
        <span className="list-group-item-label" onClick={this.onPromotion}>
          {name}
        </span>
        <input
          type="text"
          className="list-group-item-input"
          defaultValue={salary + "$"}
        />
        <div className="d-flex justify-content-center align-items-center">
          <button
            type="button"
            className="btn-cookie btn-sm"
            onClick={this.onSalaryIncrease}
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
