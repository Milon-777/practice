import EmployeesListItem from "../employeesListItem/EmployeesListItem";
import "./EmployeesList.css";

const EmployeesList = ({
  data,
  deleteEmployee,
  handleChangeProperty,
  handleSalaryChange,
}) => {
  const employees = data.map((item) => {
    const { id, ...itemProps } = item;
    return (
      <EmployeesListItem
        key={id}
        {...itemProps}
        deleteEmployee={() => deleteEmployee(id)}
        handleChangeProperty={(e) =>
          handleChangeProperty(id, e.currentTarget.getAttribute("data-toggle"))
        }
        handleSalaryChange={(e) =>
          handleSalaryChange(id, e.currentTarget.value)
        }
      />
    );
  });

  return <ul className="app-list list-group">{employees}</ul>;
};

export default EmployeesList;
