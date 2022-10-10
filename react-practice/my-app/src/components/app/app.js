import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";
import "./app.css";

const App = () => {
  const data = [
    {
      name: "John Smith",
      salary: 800,
      isPromotion: false,
      id: 1,
    },
    {
      name: "Alex Marshal",
      salary: 3000,
      isPromotion: true,
      id: 2,
    },
    {
      name: "Carl Teach",
      salary: 5000,
      isPromotion: false,
      id: 3,
    },
  ];

  return (
    <div className="app">
      <AppInfo />

      <div className="search-panel">
        <SearchPanel />
        <AppFilter />
      </div>

      <EmployeesList data={data} />
      <EmployeesAddForm />
    </div>
  );
};

export default App;
