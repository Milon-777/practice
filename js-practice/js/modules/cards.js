import { getData } from "../services/services";

function cards() {
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
}

export default cards;
