import { Component } from "react";

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";

import "./app.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          name: "John Smith",
          salary: 800,
          isSalaryIncrease: false,
          id: 1,
        },
        {
          name: "Alex Marshal",
          salary: 3000,
          isSalaryIncrease: true,
          id: 2,
        },
        {
          name: "Carl Teach",
          salary: 5000,
          isSalaryIncrease: false,
          id: 3,
        },
      ],
    };
    this.maxId = 4;
  }

  deleteEmployee = (id) => {
    this.setState(({ data }) => {
      return {
        data: data.filter((item) => item.id !== id),
      };
    });
  };

  addEmployee = (name, salary) => {
    const newEmployee = {
      name: name,
      salary: salary,
      isSalaryIncrease: false,
      id: this.maxId++,
    };
    this.setState(({ data }) => {
      return {
        data: [...data, newEmployee],
      };
    });
  };

  render() {
    return (
      <div className="app">
        <AppInfo />

        <div className="search-panel">
          <SearchPanel />
          <AppFilter />
        </div>

        <EmployeesList
          data={this.state.data}
          deleteEmployee={this.deleteEmployee}
        />
        <EmployeesAddForm addEmployee={this.addEmployee} />
      </div>
    );
  }
}

export default App;
