import isMobileDevice from './onResize';
import Swiper from 'swiper';
import { Navigation, FreeMode, Pagination} from 'swiper/modules';

let swiper: Swiper;

let createSwiper = (isMobileDevice: boolean) => {
	if(swiper) {
		swiper.destroy(); 
	}
	swiper = new Swiper(".events-swiper", {
		modules: [Navigation, FreeMode, Pagination],
		slidesPerView: isMobileDevice ? 2 : 3,
		spaceBetween: isMobileDevice ? 50 : 30,
		grabCursor: true,
		centeredSlides: isMobileDevice,
		freeMode: true,
		effect: "overflow",
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});
}

createSwiper(isMobileDevice);

let updateSwiper = () => createSwiper(isMobileDevice);

export default updateSwiper;
