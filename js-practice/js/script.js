document.addEventListener("DOMContentLoaded", () => {
  //Tabs
  const tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector(".tabheader");

  const hideContent = () => {
    tabsContent.forEach((elem) => {
      elem.classList.add("hide");
      elem.classList.remove("show", "fade");
    });

    tabs.forEach((elem) => {
      elem.classList.remove("tabheader__item_active");
    });
  };

  const showTabContent = (i = 0) => {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  };

  tabsParent.addEventListener("click", (event) => {
    const target = event.target;

    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((elem, i) => {
        if (target == elem) {
          hideContent();
          showTabContent(i);
        }
      });
    }
  });

  hideContent();
  showTabContent();

  //Timer
  const deadline = "2021-09-23";

  const getTimeRemaining = (endtime) => {
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date());

    if (t <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(t / (1000 * 60 * 60 * 24));
      hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      minutes = Math.floor((t / 1000 / 60) % 60);
      seconds = Math.floor((t / 1000) % 60);
    }

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  };

  const getZero = (num) => {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  };

  const setClock = (selector, endtime) => {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  };

  setClock(".timer", deadline);

  //Modal
  const modalOpenBtns = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal");

  const openModal = () => {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerId);
  };

  const closeModal = () => {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "visible";
  };

  const showModalByScroll = () => {
    if (
      window.scrollY + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  };

  const modalTimerId = setTimeout(openModal, 50000);

  modalOpenBtns.forEach((button) => {
    button.addEventListener("click", openModal);
  });

  modal.addEventListener("click", (event) => {
    if (
      event.target === modal ||
      event.target.getAttribute("data-close") == ""
    ) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.code === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  window.addEventListener("scroll", showModalByScroll);

  //MenuCards

  class MenuCard {
    constructor(
      title,
      description,
      imageSrc,
      imageAlt,
      price,
      parentSelector,
      ...classes
    ) {
      this.title = title;
      this.description = description;
      this.imageSrc = imageSrc;
      this.imageAlt = imageAlt;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.classes = classes;
      this.transfer = 27;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement("div");

      if (this.classes.length === 0) {
        this.element = "menu__item";
        element.classList.add();
      } else {
        this.classes.forEach((className) => {
          element.classList.add(className);
        });
      }

      element.innerHTML = `
          <img src=${this.imageSrc} alt=${this.imageAlt} />
          <h3 class="menu__item-subtitle">${this.title}</h3>
          <div class="menu__item-descr">${this.description}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
          </div>`;

      this.parent.append(element);
    }
  }

  const getData = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(
        `Couldn't fetch ${url}, status: ${res.status}, statusText: ${res.statusText}`
      );
    }

    return await res.json();
  };

  // getData("http://localhost:3000/menu").then((data) => {
  //   data.forEach(({ title, descr, img, altimg, price }) => {
  //     new MenuCard(
  //       title,
  //       descr,
  //       img,
  //       altimg,
  //       price,
  //       ".menu .container",
  //       "menu__item"
  //     ).render();
  //   });
  // });

  axios.get("http://localhost:3000/menu").then((response) => {
    response.data.forEach(({ title, descr, img, altimg, price }) => {
      new MenuCard(
        title,
        descr,
        img,
        altimg,
        price,
        ".menu .container",
        "menu__item"
      ).render();
    });
  });

  //Forms

  const forms = document.querySelectorAll("form");

  const message = {
    loading: "icons/spinner.svg",
    success: "Спасибо! Скоро мы с вами свяжемся",
    failure: "Что-то пошло не так...",
  };

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: data,
    });

    return await res.json();
  };

  const bindPostData = (form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      form.insertAdjacentElement("afterend", statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData("http://localhost:3000/requests", json)
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });
    });
  };

  const showThanksModal = (message) => {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");
    prevModalDialog.classList.remove("show");
    openModal();

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close>&times;</div>
        <div class="modal__title">${message}</div>
      </div>
    `;

    document.querySelector(".modal").append(thanksModal);

    setTimeout(() => {
      thanksModal.remove();

      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");

      closeModal();
    }, 4000);
  };

  forms.forEach((form) => {
    bindPostData(form);
  });

  //Slider

  const slides = document.querySelectorAll(".offer__slide"),
    prevSlide = document.querySelector(".offer__slider-prev"),
    nextSlide = document.querySelector(".offer__slider-next"),
    total = document.querySelector("#total"),
    currentSlide = document.querySelector("#current"),
    slidesWrapper = document.querySelector(".offer__slider-wrapper"),
    slidesField = document.querySelector(".offer__slider-inner"),
    width = window.getComputedStyle(slidesWrapper).width;
  let slideIndex = 1,
    offset = 0;

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    currentSlide.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    currentSlide.textContent = slideIndex;
  }

  slidesField.style.width = 100 * slides.length + "%";
  slidesField.style.display = "flex";
  slidesField.style.transition = "0.8s all";

  slidesWrapper.style.overflow = "hidden";

  slides.forEach((slide) => (slide.style.width = width));

  prevSlide.addEventListener("click", () => {
    if (offset == 0) {
      offset = +width.slice(0, -2) * (slides.length - 1);
    } else {
      offset -= +width.slice(0, -2);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    if (slides.length < 10) {
      currentSlide.textContent = `0${slideIndex}`;
    } else {
      currentSlide.textContent = slideIndex;
    }
  });

  nextSlide.addEventListener("click", () => {
    if (offset == +width.slice(0, -2) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +width.slice(0, -2);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    if (slides.length < 10) {
      currentSlide.textContent = `0${slideIndex}`;
    } else {
      currentSlide.textContent = slideIndex;
    }
  });
});
