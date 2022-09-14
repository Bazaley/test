window.onload = function () {
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 2,
    grid: {
      rows: 2,
    },
    spaceBetween: 30,
  });

  return swiper;
};
