"use strict";
document.addEventListener("DOMContentLoaded", () => {
  class MenuCard {
    constructor(
      src,
      alt,
      title,
      descr,
      price,
      parentSelector,
      manufacturer,
      viscosity,
      oilComposition,
      volume,
      engineType,
      ...classes
    ) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.manufacturer = manufacturer;
      this.viscosity = viscosity;
      this.oilComposition = oilComposition;
      this.volume = volume;
      this.engineType = engineType;

      this.transfer = 0.42;
      this.changeToRUB();
    }

    changeToRUB() {
      this.price = (this.price / this.transfer) * 10;
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
            <img src=${this.src} alt=${this.alt} style="width: 29%; /* Ширина */
            float: left; /* Выстраиваем элементы по горизонтали */
            margin: 0 20px 0 20px; /* Отступ слева */
            background: #f0f0f0; /* Цвет фона */
            border-radius: 5px; /* Радиус скругления */
            ">
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost ">Цена:</div>
                <div class="menu__item-total"><span> от ${this.price.toFixed()}</span> руб/л</div>
            </div>
            <div class="pparams"> <dl><dt>Производитель:</dt><dd>${
              this.manufacturer
            }</dd></dl> 
            <dl><dt>Вязкость:</dt><dd>${
              this.viscosity
            }</dd></dl> <dl><dt>Состав масла:</dt><dd>${
        this.oilComposition
      }</dd></dl> 
            <dl><dt>Объем:</dt><dd>${
              this.volume
            }</dd></dl> <dl><dt>Тип двигателя:</dt><dd>${
        this.engineType
      }</dd></dl> </div>
        `;
      this.parent.append(element);
    }
  }
  new MenuCard(
    "https://davinagaz.by/media/files/products/inside-placeholder-152573.jpg",
    "oils",
    "Моторное масло",
    "Масло моторное синтетическое Mobil Super 3000 X1 Diesel 5W-40, 1л",
    13,
    ".menu .container__item",
    // "menu__item",
    "Mobil",
    "5W-40",
    "Синтетика",
    "1 л",
    "Дизельный"
  ).render();
  new MenuCard(
    "https://davinagaz.by/media/files/products/inside-placeholder-1469186115-XFF1L.jpg",
    "oils",
    "Моторное масло",
    "Масло моторное полусинтетическое - COMMA 5W30 X-FLOW TYPE F 1л ",
    28,
    ".menu .container__item",
    // "menu__item",
    "Comma",
    "5W-30",
    "Полусинтетика",
    "1 л",
    "Бензиновый"
  ).render();
  new MenuCard(
    "https://davinagaz.by/media/files/products/inside-placeholder-1469186624-XFF5L.jpg",
    "oils",
    "Моторное масло",
    "Масло моторное полусинтетическое - COMMA 5W30 X-FLOW TYPE F 5л  ",
    130,
    ".menu .container__item",
    // "menu__item",
    "Comma",
    "5W-30",
    "Полусинтетика",
    "5 л",
    "Бензиновый"
  ).render();
  new MenuCard(
    "https://davinagaz.by/media/files/products/inside-placeholder-1503989940-COMMA%205W30%20X-FLOW%20TYPE%20LL%204%D0%BB,%D0%9C%D0%B0%D1%81%D0%BB%D0%BE%20Comma,%20%D0%BC%D0%B0%D1%81%D0%BB%D0%BE%20%D0%BA%D0%BE%D0%BC%D0%BC%D0%B0,%20%D0%9A%D1%83%D0%BF%D0%B8%D1%82%D1%8C%20%D0%B2%20%D0%93%D0%BE%D0%BC%D0%B5%D0%BB%D0%B5,%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%BD%D0%B5%D1%82%20%D0%BC%D0%B0%D0%B3%D0%B0%D0%B7%D0%B8%D0%BD%20%D0%B0%D0%B2%D1%82%D0%BE%D0%B7%D0%B0%D0%BF%D1%87%D0%B0%D1%81%D1%82%D0%B5%D0%B9.jpg",
    "oils",
    "Моторное масло",
    "Масло моторное полусинтетическое - COMMA 5W30 X-FLOW TYPE F 5л  ",
    110,
    ".menu .container__item",
    // "menu__item",
    "Comma",
    "5W-30",
    "Синтетика",
    "4 л",
    "Универсальное"
  ).render();
  new MenuCard(
    "https://davinagaz.by/media/files/products/inside-placeholder-1561456987-10.jpg",
    "oils",
    "Моторное масло",
    "Масло моторное синтетическое - Aral HighTronic C 5W-30 1л",
    50,
    ".menu .container__item",
    // "menu__item",
    "Aral",
    "5W-30",
    "Синтетика",
    "1 л",
    "Универсальное"
  ).render();
  new MenuCard(
    "https://davinagaz.by/media/files/products/inside-placeholder-15667c.jpg",
    "oils",
    "Моторное масло",
    "Масло моторное синтетическое - Castrol Edge 5W-30 LL 1л ",
    55,
    ".menu .container__item",
    // "menu__item",
    "Castrol",
    "5W-30",
    "Синтетика",
    "1 л",
    "Универсальное"
  ).render();
});
