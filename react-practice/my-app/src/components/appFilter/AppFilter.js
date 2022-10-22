import "./AppFilter.css";

const AppFilter = (props) => {
  const buttonsData = [
    { name: "all", label: "Всі співробітники" },
    { name: "promotion", label: "На підвищення" },
    { name: "largeSalary", label: "З/П більше 1000$" },
  ];

  const buttons = buttonsData.map(({ name, label }) => {
    const active = props.filter === name;
    const buttonClass = active ? "btn-light" : "btn-outline-light";
    return (
      <button
        className={`btn  ${buttonClass}`}
        type="button"
        key={name}
        onClick={() => props.handleFilterSelection(name)}
      >
        {label}
      </button>
    );
  });

  return <div className="btn-group">{buttons}</div>;
};

export default AppFilter;
