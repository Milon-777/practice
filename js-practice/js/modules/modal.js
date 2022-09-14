const openModal = (modalSelector, modalTimerId) => {
  const modal = document.querySelector(modalSelector);
  modal.classList.add("show");
  modal.classList.remove("hide");
  document.body.style.overflow = "hidden";

  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
};

const closeModal = (modalSelector) => {
  const modal = document.querySelector(modalSelector);
  modal.classList.add("hide");
  modal.classList.remove("show");
  document.body.style.overflow = "visible";
};

function modal(triggerSelector, modalSelector, modalTimerId) {
  //Modal
  const modalOpenBtns = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);

  modalOpenBtns.forEach((button) => {
    button.addEventListener("click", () =>
      openModal(modalSelector, modalTimerId)
    );
  });

  modal.addEventListener("click", (event) => {
    if (
      event.target === modal ||
      event.target.getAttribute("data-close") == ""
    ) {
      closeModal(modalSelector);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.code === "Escape" && modal.classList.contains("show")) {
      closeModal(modalSelector);
    }
  });

  const showModalByScroll = () => {
    if (
      window.scrollY + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener("scroll", showModalByScroll);
    }
  };

  window.addEventListener("scroll", showModalByScroll);
}

export default modal;
export { closeModal, openModal };
