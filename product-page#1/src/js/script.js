const swiper = new Swiper(".carousel__inner", {
  loop: true,
  speed: 800,
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 1,
  autoplay: {
    delay: 5000,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
  },
  breakpoints: {
    // when window width is >= 320px
    320: {
      navigation: {
        enabled: false,
      },
    },
    992: {
      navigation: {
        enabled: true,
      },
    },
  },
});

//Tabs
const tabContent = document.querySelectorAll(".catalog__content"),
  tabWrapper = document.querySelector(".catalog__tabs"),
  tabs = document.querySelectorAll(".catalog__tab");

function hideTabContent() {
  tabContent.forEach((item) => {
    item.style.display = "none";
  });
  tabs.forEach((item) => {
    item.classList.remove("catalog__tab_active");
  });
}

function showTabContent(i = 0) {
  tabContent[i].style.display = "flex";
  tabs[i].classList.add("catalog__tab_active");
}

hideTabContent();
showTabContent();

tabWrapper.addEventListener("click", (e) => {
  const target = e.target;
  if (target && target.closest(".catalog__tab")) {
    tabs.forEach((item, i) => {
      if (target == item || target.parentElement == item) {
        hideTabContent();
        showTabContent(i);
      }
    });
  }
});

//Descriptions
const showBtns = document.querySelectorAll(".catalog-item__link");
const hideBtns = document.querySelectorAll(".catalog-item__back");

showBtns.forEach((elem, i) => {
  elem.addEventListener("click", (e) => {
    e.preventDefault();
    document
      .querySelectorAll(".catalog-item__content")
      [i].classList.toggle("catalog-item__content_active");
    document
      .querySelectorAll(".catalog-item__list")
      [i].classList.toggle("catalog-item__list_active");
  });
});

hideBtns.forEach((elem, i) => {
  elem.addEventListener("click", (e) => {
    e.preventDefault();
    document
      .querySelectorAll(".catalog-item__content")
      [i].classList.toggle("catalog-item__content_active");
    document
      .querySelectorAll(".catalog-item__list")
      [i].classList.toggle("catalog-item__list_active");
  });
});

//Modal windows
const popup = document.querySelector(".popup-window");
const consulModal = document.getElementById("consultation");
const orderModal = document.getElementById("order");
const thanksModal = document.getElementById("thanks");
const consulBtns = document.querySelectorAll("[data-modal='consultation']");
const consulFormBtn = document.querySelector(".button_submit");
const orderBtns = document.querySelectorAll("[data-modal='order']");
const thanksBtns = document.querySelectorAll("[data-modal='thanks']");
const closeBtns = document.querySelectorAll(".modal__close");
let products = document.querySelectorAll(".catalog-item__subtitle");
let order = document.querySelector("#order .modal__descr");

function hideModals() {
  popup.style.display = "none";
  consulModal.style.display = "none";
  orderModal.style.display = "none";
  thanksModal.style.display = "none";
}

function showModal(modal) {
  popup.style.display = "block";
  modal.style.display = "block";
}

closeBtns.forEach(function (elem) {
  elem.addEventListener("click", (e) => {
    hideModals();
  });
});

consulBtns.forEach((elem) => {
  elem.addEventListener("click", (e) => {
    showModal(consulModal);
    validateForm("#consultation");
  });
});

consulFormBtn.addEventListener("click", (e) => {
  validateForm("#consultation-form");
});

orderBtns.forEach((elem, i) => {
  elem.addEventListener("click", (e) => {
    order.textContent = products[i].textContent;
    showModal(orderModal);
    validateForm("#order");
  });
});

thanksBtns.forEach((elem) => {
  elem.addEventListener("click", (e) => {
    // e.preventDefault();
    // showModal(thanksModal);
  });
});

//Validations
function validateForm(form) {
  const validation = new window.JustValidate(form, {
    errorFieldCssClass: "is-invalid",
    errorFieldStyle: {
      border: "10px solid red",
    },
    errorLabelStyle: {
      color: "red",
    },
  });

  validation
    .addField(".name", [
      {
        rule: "required",
        errorMessage: "Введіть будь ласка ім'я!",
      },
      {
        rule: "customRegexp",
        value: /\D/,
        errorMessage: "Ім'я не повинно містити цифри!",
      },
      {
        rule: "minLength",
        value: 2,
        errorMessage: "Занадто коротке ім'я",
      },
      {
        rule: "maxLength",
        value: 30,
        errorMessage: "Занадто велике ім'я",
      },
    ])
    .addField(".phone", [
      {
        rule: "required",
        errorMessage: "Введіть будь ласка телефон!",
      },
    ])
    .addField(".email", [
      {
        rule: "required",
        errorMessage: "Введіть будь ласка пошту!",
      },
      {
        rule: "email",
        errorMessage: "Неправильний формат пошти!",
      },
    ]);
}

//Phone input mask
const elements = document.querySelectorAll("input[class='phone']");
let mask;
const maskOptions = {
  mask: "(000) 000-00-00",
};
elements.forEach((elem) => {
  mask = IMask(elem, maskOptions);
});
