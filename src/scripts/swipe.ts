import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

const swiper = new Swiper(".events-swiper", {
	modules: [Navigation, Pagination],
	slidesPerView: 4,
	spaceBetween: 30,
	grabCursor: true,
	freeMode: true,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
});

export default swiper;
