import Swiper from 'swiper';
import { Navigation, FreeMode } from 'swiper/modules';

const swiper = new Swiper(".events-swiper", {
	modules: [Navigation, FreeMode],
	slidesPerView: 3,
	spaceBetween: 30,
	grabCursor: true,
	freeMode: true,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
});

export default swiper;
