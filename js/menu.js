"use strict";
document.addEventListener("DOMContentLoaded", () => {
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 62;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement("div");

      if (this.classes.length === 0) {
        this.classes = "menu__item";
        element.classList.add(this.classes);
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }

      element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span> от ${this.price}</span> руб/ед</div>
            </div>
        `;
      this.parent.append(element);
    }
  }
  new MenuCard(
    "img/tabs/motor_olis.png",
    "oils",
    "Моторные масла и тех жидкости",
    "Широкий выбор моторных масел и технических жидкостей для Вашего авто",
    3,
    ".menu .container",
    "menu__item"
  ).render();
  new MenuCard(
    "img/tabs/zapchsti.jpg",
    "parts",
    "Широкий ассортимент автозапчастей различных брендов",
    "Тормозные системы, элементы подвески, фильтры, инструмент и аксессуары",
    2,
    ".menu .container",
    "menu__item"
  ).render();
  new MenuCard(
    "img/tabs/BYparts.jpg",
    "useParts",
    "Широкий ассортимент запчастей из Европы от лучших разборок",
    "Если Вас не устраивает цена новой запчасти, то можно попробовать поискать б/у деталь",
    1,
    ".menu .container",
    "menu__item"
  ).render();
});
