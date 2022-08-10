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

showBtns.forEach(function (elem, i) {
  elem.addEventListener("click", function (e) {
    e.preventDefault();
    document
      .querySelectorAll(".catalog-item__content")
      [i].classList.toggle("catalog-item__content_active");
    document
      .querySelectorAll(".catalog-item__list")
      [i].classList.toggle("catalog-item__list_active");
  });
});

hideBtns.forEach(function (elem, i) {
  elem.addEventListener("click", function (e) {
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
const consulModal = document.getElementById("consultation");
const orderModal = document.getElementById("order");
const thanksModal = document.getElementById("thanks");
const popup = document.querySelector(".popup-window");
const consultBtns = document.querySelectorAll("[data-modal=consultation]");
const orderBtns = document.querySelectorAll("[data-modal=order]");
const thanksBtns = document.querySelectorAll("[data-modal=thanks]");
const closeBtns = document.querySelectorAll(".modal__close");

// console.log(consultBtns);

// consultBtns.forEach(function (elem) {
//   elem.addEventListener("click", function (e) {
//     consulModal.style.display = "block";
//     popup.style.display = "block";
//   });
// });

// orderBtns.forEach(function (elem) {
//   elem.addEventListener("click", function (e) {
//     orderModal.style.display = "block";
//     popup.style.display = "block";
//   });
// });

// thanksBtns.forEach(function (elem) {
//   elem.addEventListener("click", function (e) {
//     thanksModal.style.display = "block";
//     popup.style.display = "block";
//   });
// });

closeBtns.forEach(function (elem) {
  elem.addEventListener("click", function (e) {
    consulModal.style.display = "none";
    orderModal.style.display = "none";
    thanksModal.style.display = "none";
    popup.style.display = "none";
  });
});

const btns = document.querySelectorAll(".button");
btns.forEach(function (elem) {
  if (elem.getAttribute("data-modal") === "consultation") {
    elem.addEventListener("click", function (e) {
      consulModal.style.display = "block";
      popup.style.display = "block";
    });
  } else if (elem.getAttribute("data-modal") === "order") {
    elem.addEventListener("click", function (e) {
      orderModal.style.display = "block";
      popup.style.display = "block";
    });
  }
});
