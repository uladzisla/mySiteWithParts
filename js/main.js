document.addEventListener("DOMContentLoaded", () => {
  //tabs

  let tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector(".tabheader__items");

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener("click", function (event) {
    const target = event.target;
    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  //timer
  const dedLine = "2022-08-20 ";

  function getTimeRemaining(endtime) {
    let days, hours, minuts, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date());
    if (t <= 0) {
      days = hours = minuts = seconds = 0;
    } else {
      (days = Math.floor(t / (1000 * 60 * 60 * 24))),
        (hours = Math.floor((t / (1000 * 60 * 60)) % 24)),
        (minuts = Math.floor((t / 1000 / 60) % 60)),
        (seconds = Math.floor((t / 1000) % 60));
    }

    return {
      total: t,
      days: days,
      hours: hours,
      minuts: minuts,
      seconds: seconds,
    };
  }
  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }
  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minuts = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);
    updateClock();
    function updateClock() {
      const t = getTimeRemaining(endtime);
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minuts.innerHTML = getZero(t.minuts);

      seconds.innerHTML = getZero(t.seconds);
      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }
  setClock(".timer", dedLine);

  //MODAL

  const modalTrigger = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal");
  //modalClose = document.querySelector("[data-close]");
  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerId);
  }
  modalTrigger.forEach((item) => {
    item.addEventListener("click", openModal);
  });
  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }
  //modalClose.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    console.log(e.target);
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  const modalTimerId = setTimeout(openModal, 60000);
  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }
  window.addEventListener("scroll", showModalByScroll);

  //Forms

  const forms = document.querySelectorAll("form");

  const message = {
    loading: "img/form/spinner.svg",
    succes: "Мы с вами свяжемся",
    failure: "Что-то пошло не так",
  };
  forms.forEach((item) => bindPostData(item));

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    return await res.json;
  };

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
      display: block;
      margin: 0 auto`;
      //form.append(statusMessage);
      form.insertAdjacentElement("afterend", statusMessage);

      // const request = new XMLHttpRequest(); Старый формат создания запроса, сейчас используется FETCH
      // request.open("POST", "server.php");

      //request.setRequestHeader("Content-type", "multipart/form-data"); В случае если работаешь с формами, данная строка не нужна.

      //----_______________________________

      //request.setRequestHeader("Content-type", "application/json");

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      //const object = {}; заменим на новый формат JSON
      formData.forEach(function (value, key) {
        json[key] = value;
      });

      //const json = JSON.stringify(object);
      // fetch("server.php", { Заменили функцией
      //   method: "POST",
      //   headers: {
      //     "Content-type": "application/json",
      //   },
      //   body: JSON.stringify(object),
      // })
      postData("http://localhost:3000/requests", json)
        .then((data) => {
          console.log(data);
          showThanksModal(message.succes);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });

      //request.send(formData); для отправки формы
      //request.send(json);

      // request.addEventListener("load", () => {
      //   if (request.status === 200) {
      //     console.log(request.response);
      //     showThanksModal(message.succes);
      //     statusMessage.remove();
      //     form.reset();
      //   } else {
      //     showThanksModal(message.failure);
      //   }
      // });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");
    prevModalDialog.classList.add("hide");
    openModal();

    const thanksModal = document.createElement("div");
    thanksModal.classList.add(".modal__dialog");
    thanksModal.innerHTML = `
      <div class='modal__content'>
        <div class = "modal__close" data-close>×</div>
        <div class = "modal__title">${message}</div>
      </div>
    `;

    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal();
    }, 4000);
  }

  //__________________________________________________________________________
});
