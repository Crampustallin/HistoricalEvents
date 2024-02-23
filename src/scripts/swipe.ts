import Swiper from 'swiper';
import { Navigation, FreeMode, Pagination } from 'swiper/modules';

const swiper = new Swiper(".events-swiper", {
	modules: [Navigation, FreeMode, Pagination],
	slidesPerView: 3,
	spaceBetween: 30,
	grabCursor: true,
	freeMode: true,
	effect: "overflow",
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	}
});

export default swiper;
