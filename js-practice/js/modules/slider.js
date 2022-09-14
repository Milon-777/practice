function slider({
  container,
  slide,
  nextArrow,
  prevArrow,
  totalCounter,
  currentCounter,
  wrapper,
  field,
}) {
  //Slider

  const slides = document.querySelectorAll(slide),
    slider = document.querySelector(container),
    prevSlide = document.querySelector(prevArrow),
    nextSlide = document.querySelector(nextArrow),
    total = document.querySelector(totalCounter),
    currentSlide = document.querySelector(currentCounter),
    slidesWrapper = document.querySelector(wrapper),
    slidesField = document.querySelector(field),
    width = window.getComputedStyle(slidesWrapper).width,
    indicators = document.createElement("ol"),
    dots = [];
  let slideIndex = 1,
    offset = 0;

  const getValue = (string) => {
    return +string.replace(/\D/gi, "");
  };

  const changeSlideNumber = () => {
    if (slides.length < 10) {
      total.textContent = `0${slides.length}`;
      currentSlide.textContent = `0${slideIndex}`;
    } else {
      total.textContent = slides.length;
      currentSlide.textContent = slideIndex;
    }
  };

  const changeSlide = (direction) => {
    if (direction === -1) {
      if (offset === 0) {
        offset = getValue(width) * (slides.length - 1);
      } else {
        offset -= getValue(width);
      }

      changeSlideIndex(direction);
      changeSlideNumber();
      changeSliderDot();
    } else if (direction === 1) {
      if (offset === getValue(width) * (slides.length - 1)) {
        offset = 0;
      } else {
        offset += getValue(width);
      }

      changeSlideIndex(direction);
      changeSlideNumber();
      changeSliderDot();
    }

    slidesField.style.transform = `translateX(-${offset}px)`;
  };

  const changeSlideByDot = () => {
    offset = getValue(width) * (slideIndex - 1);
    slidesField.style.transform = `translateX(-${offset}px)`;

    changeSlideNumber();
    changeSliderDot();
  };

  const changeSlideIndex = (direction) => {
    if (direction === -1) {
      if (slideIndex === 1) {
        slideIndex = slides.length;
      } else {
        slideIndex--;
      }
    } else if (direction === 1) {
      if (slideIndex === slides.length) {
        slideIndex = 1;
      } else {
        slideIndex++;
      }
    }
  };

  const changeSliderDot = () => {
    dots.forEach((dot) => {
      if (dot.style.opacity === "1") {
        dot.style.opacity = "0.5";
      }
    });
    dots[slideIndex - 1].style.opacity = 1;
  };

  const createSliderDots = () => {
    for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement("li");
      dot.setAttribute("data-slide-to", i + 1);
      dot.classList.add("dot");

      if (i === 0) {
        dot.style.opacity = 1;
      }

      indicators.append(dot);
      dots.push(dot);
    }
  };

  const createSlider = () => {
    slidesField.style.width = 100 * slides.length + "%";
    slidesField.style.display = "flex";
    slidesField.style.transition = "0.8s all";
    slidesWrapper.style.overflow = "hidden";
    slides.forEach((slide) => (slide.style.width = width));
    slider.style.position = "relative";
    indicators.classList.add("carousel-indicators");
    slider.append(indicators);

    createSliderDots();
    changeSlideNumber();
  };

  createSlider();

  prevSlide.addEventListener("click", () => {
    changeSlide(-1);
  });

  nextSlide.addEventListener("click", () => {
    changeSlide(+1);
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", (event) => {
      slideIndex = +event.target.getAttribute("data-slide-to");
      changeSlideByDot();
    });
  });
}

export default slider;
