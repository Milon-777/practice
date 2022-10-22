import { Component } from "react";

import AppInfo from "../appInfo/AppInfo";
import SearchPanel from "../searchPanel/SearchPanel";
import AppFilter from "../appFilter/AppFilter";
import EmployeesList from "../employeesList/EmployeesList";
import EmployeesAddForm from "../employeesAddForm/EmployeesAddForm";

import "./App.css";

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
      searchText: "",
      filter: "all",
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

  handleSalaryChange = (id, newSalary) => {
    this.setState(({ data }) => ({
      data: data.map((element) => {
        if (element.id === id) {
          return { ...element, salary: newSalary };
        }
        return element;
      }),
    }));
  };

  searchEmployee = (elements, searchText) => {
    if (searchText.length === 0) {
      return elements;
    }

    return elements.filter((element) => {
      return element.name.indexOf(searchText) > -1;
    });
  };

  handleSearchUpdate = (searchText) => {
    this.setState({ searchText });
  };

  handleFilterUpdate = (elements, filter) => {
    switch (filter) {
      case "promotion":
        return elements.filter((element) => element.isPromotion);
      case "largeSalary":
        return elements.filter((element) => element.salary > 1000);
      default:
        return elements;
    }
  };

  handleFilterSelection = (filter) => {
    this.setState({ filter });
  };

  render() {
    const { data, searchText, filter } = this.state;
    const totalEmployees = data.length;
    const employeesWithSalaryIncrease = data.filter(
      (element) => element.isSalaryIncrease === true
    ).length;
    const visibleEmployees = this.handleFilterUpdate(
      this.searchEmployee(data, searchText),
      filter
    );

    return (
      <div className="app">
        <AppInfo
          totalEmployees={totalEmployees}
          employeesWithSalaryIncrease={employeesWithSalaryIncrease}
        />

        <div className="search-panel">
          <SearchPanel handleSearchUpdate={this.handleSearchUpdate} />
          <AppFilter
            filter={filter}
            handleFilterSelection={this.handleFilterSelection}
          />
        </div>

        <EmployeesList
          data={visibleEmployees}
          deleteEmployee={this.deleteEmployee}
          handleChangeProperty={this.handleChangeProperty}
          handleSalaryChange={this.handleSalaryChange}
        />
        <EmployeesAddForm addEmployee={this.addEmployee} />
      </div>
    );
  }
}

export default App;
