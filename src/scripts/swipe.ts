import gsap from 'gsap';
import Swiper from 'swiper';
import { Navigation, FreeMode} from 'swiper/modules';

let swiper: Swiper;
let isMobileDevice = window.matchMedia("(max-width: 768px)").matches;

let createSwiper = (isMobileDevice: boolean) => {
	if(swiper) {
		swiper.destroy(); 
	}
	swiper = new Swiper(".events-swiper", {
		modules: [Navigation, FreeMode],
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

function updateSwiperForFlipSize() {
	isMobileDevice = window.matchMedia("(max-width: 768px)").matches;
	if (isMobileDevice) {
		createSwiper(isMobileDevice);
	}
}

createSwiper(isMobileDevice);

let updateSwiper = () => createSwiper(isMobileDevice);

window.addEventListener("resize", updateSwiperForFlipSize);

export default updateSwiper;
