import "./AppInfo.css";

const AppInfo = ({ totalEmployees, employeesWithSalaryIncrease }) => {
  return (
    <div className="app-info">
      <h1>Облік співробітників у компанії N</h1>
      <h2>Загальна кількість співробітників: {totalEmployees}</h2>
      <h2>Премію отримають: {employeesWithSalaryIncrease}</h2>
    </div>
  );
};

export default AppInfo;
