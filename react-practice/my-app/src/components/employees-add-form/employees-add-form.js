import { Component } from "react";
import "./employees-add-form.css";

class EmployeesAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      salary: "",
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleEmployeeAddition = (e) => {
    e.preventDefault();
    this.props.addEmployee(this.state.name, this.state.salary);
    this.setState({
      name: "",
      salary: "",
    });
  };

  render() {
    const { name, salary } = this.state;

    return (
      <div className="app-add-form">
        <h3>Додайте нового співробітника</h3>
        <form
          className="add-form d-flex"
          onSubmit={this.handleEmployeeAddition}
        >
          <input
            type="text"
            className="form-control new-post-label"
            placeholder="Як його звати?"
            name="name"
            value={name}
            onChange={this.handleInputChange}
          />
          <input
            type="number"
            className="form-control new-post-label"
            placeholder="З/П в $?"
            name="salary"
            value={salary}
            onChange={this.handleInputChange}
          />
          <button type="submit" className="btn btn-outline-light">
            Додати
          </button>
        </form>
      </div>
    );
  }
}

export default EmployeesAddForm;
