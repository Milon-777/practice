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
          isPromotion: true,
          id: 1,
        },
        {
          name: "Alex Marshal",
          salary: 3000,
          isSalaryIncrease: true,
          isPromotion: false,
          id: 2,
        },
        {
          name: "Carl Teach",
          salary: 5000,
          isSalaryIncrease: false,
          isPromotion: false,
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
    if (name.length < 3) {
      alert("Please, enter a valid name!");
      return;
    } else if (salary < 1 || !isFinite(salary)) {
      alert("Please, enter a valid salary!");
      return;
    }
    const newEmployee = {
      name: name,
      salary: salary,
      isSalaryIncrease: false,
      isPromotion: false,
      id: this.maxId++,
    };
    this.setState(({ data }) => {
      return {
        data: [...data, newEmployee],
      };
    });
  };

  handleChangeProperty = (id, property) => {
    this.setState(({ data }) => ({
      data: data.map((element) => {
        if (element.id === id) {
          return { ...element, [property]: !element[property] };
        }
        return element;
      }),
    }));
  };

  render() {
    const totalEmployees = this.state.data.length;
    const employeesWithSalaryIncrease = this.state.data.filter(
      (element) => element.isSalaryIncrease === true
    ).length;

    return (
      <div className="app">
        <AppInfo
          totalEmployees={totalEmployees}
          employeesWithSalaryIncrease={employeesWithSalaryIncrease}
        />

        <div className="search-panel">
          <SearchPanel />
          <AppFilter />
        </div>

        <EmployeesList
          data={this.state.data}
          deleteEmployee={this.deleteEmployee}
          handleChangeProperty={this.handleChangeProperty}
        />
        <EmployeesAddForm addEmployee={this.addEmployee} />
      </div>
    );
  }
}

export default App;
