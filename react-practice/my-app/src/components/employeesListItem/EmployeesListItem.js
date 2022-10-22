import "./EmployeesListItem.css";

const EmployeesListItem = (props) => {
  const {
    name,
    salary,
    deleteEmployee,
    handleChangeProperty,
    handleSalaryChange,
    isSalaryIncrease,
    isPromotion,
  } = props;

  let employeeType = "list-group-item d-flex justify-content-between";

  if (isSalaryIncrease) {
    employeeType += " increase";
  }
  if (isPromotion) {
    employeeType += " like";
  }

  return (
    <li className={employeeType}>
      <span
        className="list-group-item-label"
        onClick={handleChangeProperty}
        data-toggle="isPromotion"
      >
        {name}
      </span>
      <input
        type="text"
        className="list-group-item-input"
        defaultValue={salary + "$"}
        onChange={handleSalaryChange}
      />
      <div className="d-flex justify-content-center align-items-center">
        <button
          type="button"
          className="btn-cookie btn-sm"
          onClick={handleChangeProperty}
          data-toggle="isSalaryIncrease"
        >
          <i className="fas fa-cookie"></i>
        </button>

        <button
          type="button"
          className="btn-trash btn-sm"
          onClick={deleteEmployee}
        >
          <i className="fas fa-trash"></i>
        </button>
        <i className="fas fa-star"></i>
      </div>
    </li>
  );
};

export default EmployeesListItem;
