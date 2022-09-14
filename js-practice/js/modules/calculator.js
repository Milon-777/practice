function calculator() {
  // Calculator

  const result = document.querySelector(".calculating__result span");
  let gender, height, weight, age, ratio;

  const getOldInformation = () => {
    if (localStorage.getItem("gender")) {
      gender = localStorage.getItem("gender");
    } else {
      gender = "female";
      localStorage.setItem("gender", gender);
    }
    if (localStorage.getItem("ratio")) {
      ratio = localStorage.getItem("ratio");
    } else {
      ratio = 1.375;
      localStorage.setItem("ratio", ratio);
    }
  };

  const setOldInformation = (selector, activeClass) => {
    const elements = document.querySelectorAll(selector);

    elements.forEach((elem) => {
      elem.classList.remove(activeClass);
      if (elem.getAttribute("id") === localStorage.getItem("gender")) {
        elem.classList.add(activeClass);
      } else if (
        elem.getAttribute("data-ratio") === localStorage.getItem("ratio")
      ) {
        elem.classList.add(activeClass);
      }
    });
  };

  const calculateTotal = () => {
    if (!gender || !height || !weight || !age || !ratio) {
      result.textContent = "____";
      return;
    } else if (gender === "female") {
      result.textContent = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
      );
    } else {
      result.textContent = Math.round(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
      );
    }
  };

  const getTabInformation = (selector, activeClass) => {
    const elements = document.querySelectorAll(selector);

    elements.forEach((elem) => {
      elem.addEventListener("click", (event) => {
        if (event.target.getAttribute("data-ratio")) {
          ratio = +event.target.getAttribute("data-ratio");

          localStorage.setItem(
            "ratio",
            +event.target.getAttribute("data-ratio")
          );
        } else {
          gender = event.target.getAttribute("id");

          localStorage.setItem("gender", event.target.getAttribute("id"));
        }

        elements.forEach((elem) => {
          elem.classList.remove(activeClass);
        });

        event.target.classList.add(activeClass);

        calculateTotal();
      });
    });
  };

  const getInputInformation = (selector) => {
    const input = document.querySelector(selector);

    input.addEventListener("input", () => {
      if (input.value.match(/\D/gi)) {
        input.style.border = "1px solid red";
      } else {
        input.style.border = "none";
      }

      switch (input.getAttribute("id")) {
        case "height":
          height = +input.value;
          break;
        case "weight":
          weight = +input.value;
          break;
        case "age":
          age = +input.value;
          break;
      }

      calculateTotal();
    });
  };

  getOldInformation();
  setOldInformation("#gender div", "calculating__choose-item_active");
  setOldInformation(
    ".calculating__choose_big div",
    "calculating__choose-item_active"
  );
  calculateTotal();

  getTabInformation("#gender div", "calculating__choose-item_active");
  getTabInformation(
    ".calculating__choose_big div",
    "calculating__choose-item_active"
  );
  getInputInformation("#height");
  getInputInformation("#weight");
  getInputInformation("#age");
}

export default calculator;
