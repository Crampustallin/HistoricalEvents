import './loadDots';
import periodData from './loadcontent';
import gsap from 'gsap'
import setAnimationToYear from './loadYears';
import updateSwiper from './swipe';
import { YearsData } from '../types/yearsData';

let circle:HTMLElement | null = document.querySelector(".circle");
let dots: HTMLElement[] = gsap.utils.toArray<HTMLElement>(".dots");
let dateList: HTMLElement[] = gsap.utils.toArray<HTMLElement>(".date-list");
let swiperWrapper: HTMLElement | null = document.querySelector('.swiper-wrapper');
let startYear: HTMLElement | null = document.querySelector('.start-year');
let endYear: HTMLElement | null = document.querySelector('.end-year');
let slice = 360 / dots.length;
let curRotation = 0;
let currentDot: HTMLElement | null = document.querySelector('.active');
const prevBtn = document.getElementById("prev-button");
const nextBtn = document.getElementById("next-button");

let updateButtonState = (nextDot : HTMLElement) => {
	prevBtn?.setAttribute("disabled", `${!nextDot?.previousElementSibling}`);
	nextBtn?.setAttribute("disabled", `${!nextDot?.nextElementSibling}`);
}

function setup() {
	let radius: number = circle?.offsetWidth ?? 0;
	let DEG2RAD: number = Math.PI / 180;
	radius /= 2;
	gsap.set(dots, {
		x: i => radius * Math.sin(i * slice * DEG2RAD),
		y: i => radius * Math.cos(i * slice * DEG2RAD),
		rotation: i => i * slice,
		xPercent: -50,
		yPercent: -50
	});
	gsap.set(dateList, {
		rotation: i => -(i * slice),
	});
}

setup();



let removeCurrentActive = (current: HTMLElement | null) => {
	if(current)
		{
			current.classList.remove('active');
			current.firstElementChild?.classList.remove('active');
		}
}


const rotationBtnComplete = (dot: HTMLElement | null | undefined) => {
	if(dot) {
		console.log(typeof dot.getAttribute('period-title'));
		let filtered: YearsData | undefined = periodData.filter(p => p.title == dot.getAttribute('period-title')).pop();
		if(filtered) {
			console.log(filtered);
			console.log(startYear);
			setAnimationToYear(startYear, filtered.years.from);
			setAnimationToYear(endYear, filtered.years.to);
			if(swiperWrapper) {
				swiperWrapper.innerHTML = "";
				filtered.paragraphs.map(paragraph => {
					let header = document.createElement('h3');
					header.innerHTML = paragraph.title;
					let content = document.createElement('p');
					content.innerHTML = paragraph.content;
					let slide = document.createElement('div');
					slide.className = "swiper-slide";
					slide.appendChild(header);
					slide.appendChild(content);
					swiperWrapper?.appendChild(slide);
				});
			}
			updateSwiper();
		}
		dot.classList.add('active');
		currentDot = dot;
	}
};


let onClickCard = (event: MouseEvent) => {
	let dot = event.target as HTMLElement;
	removeCurrentActive(currentDot);
	if(dot && currentDot !== dot)
		{
			let style = dot.getAttribute('style');
			let deg: number = 0;
			if(style) {
				let s = style.match(/rotate\((\d+)deg\)/);
				if(s && s[1]) {
					deg = Number.parseInt(s[1]);
				}
			}
			curRotation = deg;
			rotationBtnComplete(dot);

			gsap.to(circle, {
				duration: 0.75,
				ease: "none",
				rotation:  deg - 150, 
				overwrite: "auto",
			});
			updateButtonState(dot);
		}
};

dots.forEach((dot) => dot.addEventListener("click", onClickCard));

if(prevBtn) {
	prevBtn.addEventListener("click", () => {
		if(prevBtn.getAttribute('disabled') !== 'true')
			{
				let prevDot = currentDot?.previousElementSibling as HTMLElement;
				removeCurrentActive(currentDot);
				console.log(prevDot);
				rotationBtnComplete(prevDot);
				curRotation -= slice;
				gsap.to(circle, {
					duration: 0.25,
					ease: "power1.inOut",
					rotation: curRotation - 150,
				});
				updateButtonState(prevDot);
			}
	});
	prevBtn.addEventListener('dblclick', (event) => {
		event.preventDefault();
	});
}

if(nextBtn) {
	nextBtn.addEventListener("click", () => {
		if(nextBtn.getAttribute('disabled') !== 'true')
			{
				let nextDot = currentDot?.nextElementSibling as HTMLElement;
				removeCurrentActive(currentDot);
				rotationBtnComplete(nextDot);
				curRotation += slice;
				gsap.to(circle, {
					duration: 0.25,
					ease: "power1.inOut",
					rotation: curRotation - 150,
				});
				updateButtonState(nextDot);
			}
	});
	nextBtn.addEventListener('dblclick', (event) => {
		event.preventDefault();
	});
}
