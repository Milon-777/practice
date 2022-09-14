/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction calculator() {\r\n  // Calculator\r\n\r\n  const result = document.querySelector(\".calculating__result span\");\r\n  let gender, height, weight, age, ratio;\r\n\r\n  const getOldInformation = () => {\r\n    if (localStorage.getItem(\"gender\")) {\r\n      gender = localStorage.getItem(\"gender\");\r\n    } else {\r\n      gender = \"female\";\r\n      localStorage.setItem(\"gender\", gender);\r\n    }\r\n    if (localStorage.getItem(\"ratio\")) {\r\n      ratio = localStorage.getItem(\"ratio\");\r\n    } else {\r\n      ratio = 1.375;\r\n      localStorage.setItem(\"ratio\", ratio);\r\n    }\r\n  };\r\n\r\n  const setOldInformation = (selector, activeClass) => {\r\n    const elements = document.querySelectorAll(selector);\r\n\r\n    elements.forEach((elem) => {\r\n      elem.classList.remove(activeClass);\r\n      if (elem.getAttribute(\"id\") === localStorage.getItem(\"gender\")) {\r\n        elem.classList.add(activeClass);\r\n      } else if (\r\n        elem.getAttribute(\"data-ratio\") === localStorage.getItem(\"ratio\")\r\n      ) {\r\n        elem.classList.add(activeClass);\r\n      }\r\n    });\r\n  };\r\n\r\n  const calculateTotal = () => {\r\n    if (!gender || !height || !weight || !age || !ratio) {\r\n      result.textContent = \"____\";\r\n      return;\r\n    } else if (gender === \"female\") {\r\n      result.textContent = Math.round(\r\n        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio\r\n      );\r\n    } else {\r\n      result.textContent = Math.round(\r\n        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio\r\n      );\r\n    }\r\n  };\r\n\r\n  const getTabInformation = (selector, activeClass) => {\r\n    const elements = document.querySelectorAll(selector);\r\n\r\n    elements.forEach((elem) => {\r\n      elem.addEventListener(\"click\", (event) => {\r\n        if (event.target.getAttribute(\"data-ratio\")) {\r\n          ratio = +event.target.getAttribute(\"data-ratio\");\r\n\r\n          localStorage.setItem(\r\n            \"ratio\",\r\n            +event.target.getAttribute(\"data-ratio\")\r\n          );\r\n        } else {\r\n          gender = event.target.getAttribute(\"id\");\r\n\r\n          localStorage.setItem(\"gender\", event.target.getAttribute(\"id\"));\r\n        }\r\n\r\n        elements.forEach((elem) => {\r\n          elem.classList.remove(activeClass);\r\n        });\r\n\r\n        event.target.classList.add(activeClass);\r\n\r\n        calculateTotal();\r\n      });\r\n    });\r\n  };\r\n\r\n  const getInputInformation = (selector) => {\r\n    const input = document.querySelector(selector);\r\n\r\n    input.addEventListener(\"input\", () => {\r\n      if (input.value.match(/\\D/gi)) {\r\n        input.style.border = \"1px solid red\";\r\n      } else {\r\n        input.style.border = \"none\";\r\n      }\r\n\r\n      switch (input.getAttribute(\"id\")) {\r\n        case \"height\":\r\n          height = +input.value;\r\n          break;\r\n        case \"weight\":\r\n          weight = +input.value;\r\n          break;\r\n        case \"age\":\r\n          age = +input.value;\r\n          break;\r\n      }\r\n\r\n      calculateTotal();\r\n    });\r\n  };\r\n\r\n  getOldInformation();\r\n  setOldInformation(\"#gender div\", \"calculating__choose-item_active\");\r\n  setOldInformation(\r\n    \".calculating__choose_big div\",\r\n    \"calculating__choose-item_active\"\r\n  );\r\n  calculateTotal();\r\n\r\n  getTabInformation(\"#gender div\", \"calculating__choose-item_active\");\r\n  getTabInformation(\r\n    \".calculating__choose_big div\",\r\n    \"calculating__choose-item_active\"\r\n  );\r\n  getInputInformation(\"#height\");\r\n  getInputInformation(\"#weight\");\r\n  getInputInformation(\"#age\");\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);\r\n\n\n//# sourceURL=webpack://js-practice/./js/modules/calculator.js?");

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ \"./js/services/services.js\");\n\r\n\r\nfunction cards() {\r\n  //MenuCards\r\n\r\n  class MenuCard {\r\n    constructor(\r\n      title,\r\n      description,\r\n      imageSrc,\r\n      imageAlt,\r\n      price,\r\n      parentSelector,\r\n      ...classes\r\n    ) {\r\n      this.title = title;\r\n      this.description = description;\r\n      this.imageSrc = imageSrc;\r\n      this.imageAlt = imageAlt;\r\n      this.price = price;\r\n      this.parent = document.querySelector(parentSelector);\r\n      this.classes = classes;\r\n      this.transfer = 27;\r\n      this.changeToUAH();\r\n    }\r\n\r\n    changeToUAH() {\r\n      this.price = this.price * this.transfer;\r\n    }\r\n\r\n    render() {\r\n      const element = document.createElement(\"div\");\r\n\r\n      if (this.classes.length === 0) {\r\n        this.element = \"menu__item\";\r\n        element.classList.add();\r\n      } else {\r\n        this.classes.forEach((className) => {\r\n          element.classList.add(className);\r\n        });\r\n      }\r\n\r\n      element.innerHTML = `\r\n          <img src=${this.imageSrc} alt=${this.imageAlt} />\r\n          <h3 class=\"menu__item-subtitle\">${this.title}</h3>\r\n          <div class=\"menu__item-descr\">${this.description}</div>\r\n          <div class=\"menu__item-divider\"></div>\r\n          <div class=\"menu__item-price\">\r\n            <div class=\"menu__item-cost\">Цена:</div>\r\n            <div class=\"menu__item-total\"><span>${this.price}</span> грн/день</div>\r\n          </div>`;\r\n\r\n      this.parent.append(element);\r\n    }\r\n  }\r\n\r\n  axios.get(\"http://localhost:3000/menu\").then((response) => {\r\n    response.data.forEach(({ title, descr, img, altimg, price }) => {\r\n      new MenuCard(\r\n        title,\r\n        descr,\r\n        img,\r\n        altimg,\r\n        price,\r\n        \".menu .container\",\r\n        \"menu__item\"\r\n      ).render();\r\n    });\r\n  });\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);\r\n\n\n//# sourceURL=webpack://js-practice/./js/modules/cards.js?");

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ \"./js/modules/modal.js\");\n/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ \"./js/services/services.js\");\n\r\n\r\n\r\nfunction forms(formSelector, modalTimerId) {\r\n  //Forms\r\n\r\n  const forms = document.querySelectorAll(formSelector);\r\n\r\n  const message = {\r\n    loading: \"icons/spinner.svg\",\r\n    success: \"Спасибо! Скоро мы с вами свяжемся\",\r\n    failure: \"Что-то пошло не так...\",\r\n  };\r\n\r\n  const bindPostData = (form) => {\r\n    form.addEventListener(\"submit\", (event) => {\r\n      event.preventDefault();\r\n\r\n      const statusMessage = document.createElement(\"img\");\r\n      statusMessage.src = message.loading;\r\n      statusMessage.style.cssText = `\r\n        display: block;\r\n        margin: 0 auto;\r\n      `;\r\n      form.insertAdjacentElement(\"afterend\", statusMessage);\r\n\r\n      const formData = new FormData(form);\r\n\r\n      const json = JSON.stringify(Object.fromEntries(formData.entries()));\r\n\r\n      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)(\"http://localhost:3000/requests\", json)\r\n        .then((data) => {\r\n          console.log(data);\r\n          showThanksModal(message.success);\r\n          statusMessage.remove();\r\n        })\r\n        .catch(() => {\r\n          showThanksModal(message.failure);\r\n        })\r\n        .finally(() => {\r\n          form.reset();\r\n        });\r\n    });\r\n  };\r\n\r\n  const showThanksModal = (message) => {\r\n    const prevModalDialog = document.querySelector(\".modal__dialog\");\r\n\r\n    prevModalDialog.classList.add(\"hide\");\r\n    prevModalDialog.classList.remove(\"show\");\r\n    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(\".modal\", modalTimerId);\r\n\r\n    const thanksModal = document.createElement(\"div\");\r\n    thanksModal.classList.add(\"modal__dialog\");\r\n    thanksModal.innerHTML = `\r\n      <div class=\"modal__content\">\r\n        <div class=\"modal__close\" data-close>&times;</div>\r\n        <div class=\"modal__title\">${message}</div>\r\n      </div>\r\n    `;\r\n\r\n    document.querySelector(\".modal\").append(thanksModal);\r\n\r\n    setTimeout(() => {\r\n      thanksModal.remove();\r\n\r\n      prevModalDialog.classList.add(\"show\");\r\n      prevModalDialog.classList.remove(\"hide\");\r\n\r\n      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(\".modal\");\r\n    }, 4000);\r\n  };\r\n\r\n  forms.forEach((form) => {\r\n    bindPostData(form);\r\n  });\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);\r\n\n\n//# sourceURL=webpack://js-practice/./js/modules/forms.js?");

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"closeModal\": () => (/* binding */ closeModal),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"openModal\": () => (/* binding */ openModal)\n/* harmony export */ });\nconst openModal = (modalSelector, modalTimerId) => {\r\n  const modal = document.querySelector(modalSelector);\r\n  modal.classList.add(\"show\");\r\n  modal.classList.remove(\"hide\");\r\n  document.body.style.overflow = \"hidden\";\r\n\r\n  if (modalTimerId) {\r\n    clearInterval(modalTimerId);\r\n  }\r\n};\r\n\r\nconst closeModal = (modalSelector) => {\r\n  const modal = document.querySelector(modalSelector);\r\n  modal.classList.add(\"hide\");\r\n  modal.classList.remove(\"show\");\r\n  document.body.style.overflow = \"visible\";\r\n};\r\n\r\nfunction modal(triggerSelector, modalSelector, modalTimerId) {\r\n  //Modal\r\n  const modalOpenBtns = document.querySelectorAll(triggerSelector),\r\n    modal = document.querySelector(modalSelector);\r\n\r\n  modalOpenBtns.forEach((button) => {\r\n    button.addEventListener(\"click\", () =>\r\n      openModal(modalSelector, modalTimerId)\r\n    );\r\n  });\r\n\r\n  modal.addEventListener(\"click\", (event) => {\r\n    if (\r\n      event.target === modal ||\r\n      event.target.getAttribute(\"data-close\") == \"\"\r\n    ) {\r\n      closeModal(modalSelector);\r\n    }\r\n  });\r\n\r\n  document.addEventListener(\"keydown\", (event) => {\r\n    if (event.code === \"Escape\" && modal.classList.contains(\"show\")) {\r\n      closeModal(modalSelector);\r\n    }\r\n  });\r\n\r\n  const showModalByScroll = () => {\r\n    if (\r\n      window.scrollY + document.documentElement.clientHeight >=\r\n      document.documentElement.scrollHeight - 1\r\n    ) {\r\n      openModal(modalSelector, modalTimerId);\r\n      window.removeEventListener(\"scroll\", showModalByScroll);\r\n    }\r\n  };\r\n\r\n  window.addEventListener(\"scroll\", showModalByScroll);\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);\r\n\r\n\n\n//# sourceURL=webpack://js-practice/./js/modules/modal.js?");

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction slider({\r\n  container,\r\n  slide,\r\n  nextArrow,\r\n  prevArrow,\r\n  totalCounter,\r\n  currentCounter,\r\n  wrapper,\r\n  field,\r\n}) {\r\n  //Slider\r\n\r\n  const slides = document.querySelectorAll(slide),\r\n    slider = document.querySelector(container),\r\n    prevSlide = document.querySelector(prevArrow),\r\n    nextSlide = document.querySelector(nextArrow),\r\n    total = document.querySelector(totalCounter),\r\n    currentSlide = document.querySelector(currentCounter),\r\n    slidesWrapper = document.querySelector(wrapper),\r\n    slidesField = document.querySelector(field),\r\n    width = window.getComputedStyle(slidesWrapper).width,\r\n    indicators = document.createElement(\"ol\"),\r\n    dots = [];\r\n  let slideIndex = 1,\r\n    offset = 0;\r\n\r\n  const getValue = (string) => {\r\n    return +string.replace(/\\D/gi, \"\");\r\n  };\r\n\r\n  const changeSlideNumber = () => {\r\n    if (slides.length < 10) {\r\n      total.textContent = `0${slides.length}`;\r\n      currentSlide.textContent = `0${slideIndex}`;\r\n    } else {\r\n      total.textContent = slides.length;\r\n      currentSlide.textContent = slideIndex;\r\n    }\r\n  };\r\n\r\n  const changeSlide = (direction) => {\r\n    if (direction === -1) {\r\n      if (offset === 0) {\r\n        offset = getValue(width) * (slides.length - 1);\r\n      } else {\r\n        offset -= getValue(width);\r\n      }\r\n\r\n      changeSlideIndex(direction);\r\n      changeSlideNumber();\r\n      changeSliderDot();\r\n    } else if (direction === 1) {\r\n      if (offset === getValue(width) * (slides.length - 1)) {\r\n        offset = 0;\r\n      } else {\r\n        offset += getValue(width);\r\n      }\r\n\r\n      changeSlideIndex(direction);\r\n      changeSlideNumber();\r\n      changeSliderDot();\r\n    }\r\n\r\n    slidesField.style.transform = `translateX(-${offset}px)`;\r\n  };\r\n\r\n  const changeSlideByDot = () => {\r\n    offset = getValue(width) * (slideIndex - 1);\r\n    slidesField.style.transform = `translateX(-${offset}px)`;\r\n\r\n    changeSlideNumber();\r\n    changeSliderDot();\r\n  };\r\n\r\n  const changeSlideIndex = (direction) => {\r\n    if (direction === -1) {\r\n      if (slideIndex === 1) {\r\n        slideIndex = slides.length;\r\n      } else {\r\n        slideIndex--;\r\n      }\r\n    } else if (direction === 1) {\r\n      if (slideIndex === slides.length) {\r\n        slideIndex = 1;\r\n      } else {\r\n        slideIndex++;\r\n      }\r\n    }\r\n  };\r\n\r\n  const changeSliderDot = () => {\r\n    dots.forEach((dot) => {\r\n      if (dot.style.opacity === \"1\") {\r\n        dot.style.opacity = \"0.5\";\r\n      }\r\n    });\r\n    dots[slideIndex - 1].style.opacity = 1;\r\n  };\r\n\r\n  const createSliderDots = () => {\r\n    for (let i = 0; i < slides.length; i++) {\r\n      const dot = document.createElement(\"li\");\r\n      dot.setAttribute(\"data-slide-to\", i + 1);\r\n      dot.classList.add(\"dot\");\r\n\r\n      if (i === 0) {\r\n        dot.style.opacity = 1;\r\n      }\r\n\r\n      indicators.append(dot);\r\n      dots.push(dot);\r\n    }\r\n  };\r\n\r\n  const createSlider = () => {\r\n    slidesField.style.width = 100 * slides.length + \"%\";\r\n    slidesField.style.display = \"flex\";\r\n    slidesField.style.transition = \"0.8s all\";\r\n    slidesWrapper.style.overflow = \"hidden\";\r\n    slides.forEach((slide) => (slide.style.width = width));\r\n    slider.style.position = \"relative\";\r\n    indicators.classList.add(\"carousel-indicators\");\r\n    slider.append(indicators);\r\n\r\n    createSliderDots();\r\n    changeSlideNumber();\r\n  };\r\n\r\n  createSlider();\r\n\r\n  prevSlide.addEventListener(\"click\", () => {\r\n    changeSlide(-1);\r\n  });\r\n\r\n  nextSlide.addEventListener(\"click\", () => {\r\n    changeSlide(+1);\r\n  });\r\n\r\n  dots.forEach((dot) => {\r\n    dot.addEventListener(\"click\", (event) => {\r\n      slideIndex = +event.target.getAttribute(\"data-slide-to\");\r\n      changeSlideByDot();\r\n    });\r\n  });\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);\r\n\n\n//# sourceURL=webpack://js-practice/./js/modules/slider.js?");

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction tabs(\r\n  tabsSelector,\r\n  tabsContentSelector,\r\n  tabsParentSelector,\r\n  activeClass\r\n) {\r\n  //Tabs\r\n\r\n  const tabs = document.querySelectorAll(tabsSelector),\r\n    tabsContent = document.querySelectorAll(tabsContentSelector),\r\n    tabsParent = document.querySelector(tabsParentSelector);\r\n\r\n  const hideContent = () => {\r\n    tabsContent.forEach((elem) => {\r\n      elem.classList.add(\"hide\");\r\n      elem.classList.remove(\"show\", \"fade\");\r\n    });\r\n\r\n    tabs.forEach((elem) => {\r\n      elem.classList.remove(activeClass);\r\n    });\r\n  };\r\n\r\n  const showTabContent = (i = 0) => {\r\n    tabsContent[i].classList.add(\"show\", \"fade\");\r\n    tabsContent[i].classList.remove(\"hide\");\r\n    tabs[i].classList.add(activeClass);\r\n  };\r\n\r\n  tabsParent.addEventListener(\"click\", (event) => {\r\n    const target = event.target;\r\n\r\n    if (target && target.classList.contains(tabsSelector.slice(1))) {\r\n      tabs.forEach((elem, i) => {\r\n        if (target == elem) {\r\n          hideContent();\r\n          showTabContent(i);\r\n        }\r\n      });\r\n    }\r\n  });\r\n\r\n  hideContent();\r\n  showTabContent();\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);\r\n\n\n//# sourceURL=webpack://js-practice/./js/modules/tabs.js?");

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction timer(id, deadline) {\r\n  //Timer\r\n\r\n  const getTimeRemaining = (endtime) => {\r\n    let days, hours, minutes, seconds;\r\n    const t = Date.parse(endtime) - Date.parse(new Date());\r\n\r\n    if (t <= 0) {\r\n      days = 0;\r\n      hours = 0;\r\n      minutes = 0;\r\n      seconds = 0;\r\n    } else {\r\n      days = Math.floor(t / (1000 * 60 * 60 * 24));\r\n      hours = Math.floor((t / (1000 * 60 * 60)) % 24);\r\n      minutes = Math.floor((t / 1000 / 60) % 60);\r\n      seconds = Math.floor((t / 1000) % 60);\r\n    }\r\n\r\n    return {\r\n      total: t,\r\n      days: days,\r\n      hours: hours,\r\n      minutes: minutes,\r\n      seconds: seconds,\r\n    };\r\n  };\r\n\r\n  const getZero = (num) => {\r\n    if (num >= 0 && num < 10) {\r\n      return `0${num}`;\r\n    } else {\r\n      return num;\r\n    }\r\n  };\r\n\r\n  const setClock = (selector, endtime) => {\r\n    const timer = document.querySelector(selector),\r\n      days = timer.querySelector(\"#days\"),\r\n      hours = timer.querySelector(\"#hours\"),\r\n      minutes = timer.querySelector(\"#minutes\"),\r\n      seconds = timer.querySelector(\"#seconds\"),\r\n      timeInterval = setInterval(updateClock, 1000);\r\n\r\n    updateClock();\r\n\r\n    function updateClock() {\r\n      const t = getTimeRemaining(endtime);\r\n\r\n      days.innerHTML = getZero(t.days);\r\n      hours.innerHTML = getZero(t.hours);\r\n      minutes.innerHTML = getZero(t.minutes);\r\n      seconds.innerHTML = getZero(t.seconds);\r\n\r\n      if (t.total <= 0) {\r\n        clearInterval(timeInterval);\r\n      }\r\n    }\r\n  };\r\n\r\n  setClock(id, deadline);\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);\r\n\n\n//# sourceURL=webpack://js-practice/./js/modules/timer.js?");

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ \"./js/modules/tabs.js\");\n/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ \"./js/modules/modal.js\");\n/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ \"./js/modules/timer.js\");\n/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ \"./js/modules/cards.js\");\n/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calculator */ \"./js/modules/calculator.js\");\n/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ \"./js/modules/forms.js\");\n/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ \"./js/modules/slider.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\ndocument.addEventListener(\"DOMContentLoaded\", () => {\r\n  const modalTimerId = setTimeout(\r\n    () => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)(\".modal\", modalTimerId),\r\n    300000\r\n  );\r\n\r\n  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\r\n    \".tabheader__item\",\r\n    \".tabcontent\",\r\n    \".tabheader\",\r\n    \"tabheader__item_active\"\r\n  );\r\n  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\"[data-modal]\", \".modal\", modalTimerId);\r\n  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\".timer\", \"2023-01-11\");\r\n  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__[\"default\"])();\r\n  (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_4__[\"default\"])();\r\n  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(\"form\", modalTimerId);\r\n  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__[\"default\"])({\r\n    container: \".offer__slider\",\r\n    nextArrow: \".offer__slider-next\",\r\n    prevArrow: \".offer__slider-prev\",\r\n    slide: \".offer__slide\",\r\n    totalCounter: \"#total\",\r\n    currentCounter: \"#current\",\r\n    wrapper: \".offer__slider-wrapper\",\r\n    field: \".offer__slider-inner\",\r\n  });\r\n});\r\n\n\n//# sourceURL=webpack://js-practice/./js/script.js?");

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getData\": () => (/* binding */ getData),\n/* harmony export */   \"postData\": () => (/* binding */ postData)\n/* harmony export */ });\nconst postData = async (url, data) => {\r\n  const res = await fetch(url, {\r\n    method: \"POST\",\r\n    headers: {\r\n      \"Content-type\": \"application/json\",\r\n    },\r\n    body: data,\r\n  });\r\n\r\n  return await res.json();\r\n};\r\n\r\nconst getData = async (url) => {\r\n  const res = await fetch(url);\r\n\r\n  if (!res.ok) {\r\n    throw new Error(\r\n      `Couldn't fetch ${url}, status: ${res.status}, statusText: ${res.statusText}`\r\n    );\r\n  }\r\n\r\n  return await res.json();\r\n};\r\n\r\n\r\n\n\n//# sourceURL=webpack://js-practice/./js/services/services.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./js/script.js");
/******/ 	
/******/ })()
;