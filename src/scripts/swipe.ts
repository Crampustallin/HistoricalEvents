import gsap from 'gsap';
import Swiper from 'swiper';
import { Navigation, FreeMode, Pagination } from 'swiper/modules';

let swiper: Swiper;

function updateSwiper() {
	const isMobileDevice = window.matchMedia("(max-width: 768px)").matches;
	if (swiper) {
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
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		}
	});

gsap.from(".events-swiper", { opacity: 0, y: 50, duration: 1, ease: "power2.out" });

}

updateSwiper();

window.addEventListener("resize", updateSwiper);

export default updateSwiper;
