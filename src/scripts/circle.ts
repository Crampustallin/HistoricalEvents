import './loadDots';
import periodData from './loadcontent';
import gsap from 'gsap'
import updateSwiper from './swipe';
import setAnimationToYear from './loadYears';
import { YearsData } from '../types/yearsData';

let circle:HTMLElement | null = document.querySelector(".circle");
let dots: HTMLElement[] = gsap.utils.toArray<HTMLElement>(".dots");
let dateList: HTMLElement[] = gsap.utils.toArray<HTMLElement>(".date-list");
let dateList2: HTMLElement[] = gsap.utils.toArray<HTMLElement>(".title");
let swiperWrapper: HTMLElement | null = document.querySelector('.swiper-wrapper');
let startYear: HTMLElement | null = document.querySelector('.start-year');
let endYear: HTMLElement | null = document.querySelector('.end-year');
const dotsCount = dots.length;
let slice = 360 / dotsCount;
let curRotation = 0;
let currentDot: HTMLElement | null = document.querySelector('.active');
let currentTitle: HTMLElement | null = document.querySelector('.title.active');
const prevBtn = document.getElementById("prev-button");
const nextBtn = document.getElementById("next-button");
const btnLabel: HTMLElement | null = document.querySelector(".button-labels");

let removeCurrentActive = (current: HTMLElement | null) => {
	if(current) {
			current.classList.remove('active');
			current.firstElementChild?.classList.remove('active');
			currentTitle?.classList.remove('active');
		}
}


const rotationBtnComplete = (dot: HTMLElement | null | undefined, filtered: YearsData | undefined) => {
	if(dot) {
			let currentNumber = dot.querySelector('.inner-text')?.innerHTML;
		if(btnLabel && currentNumber) {
			btnLabel.innerHTML = `${parseInt(currentNumber) > 9 ? currentNumber : 0 + currentNumber}/${dotsCount > 9 ? dotsCount : '0' + dotsCount}`;
		}
		if(filtered) {
			currentTitle = (dateList2.find(t => t.getAttribute('period-title') === filtered?.title) ?? null);
			currentTitle?.classList.add('active');
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
				gsap.fromTo(swiperWrapper, {
					opacity: 0,
					y: 100,
					ease: "power2.inOut"
			}, {opacity: 1, y: 0});
			}
			updateSwiper();
		}
		dot.classList.add('active');
		currentDot = dot;
	}
};

let updateButtonState = (nextDot : HTMLElement) => {
	prevBtn?.setAttribute("disabled", `${!nextDot?.previousElementSibling}`);
	nextBtn?.setAttribute("disabled", `${!nextDot?.nextElementSibling}`);
}
let activateDot = (dot: HTMLElement) => {
			let style = dot.getAttribute('style');
			let deg: number = 0;
			if(style) {
				let s = style.match(/rotate\((\d+)deg\)/);
				if(s && s[1]) {
					deg = Number.parseInt(s[1]);
				}
			}
			curRotation = deg;	
			let filtered: YearsData | undefined = periodData.filter(p => p.title == dot.getAttribute('period-title')).pop();
			setAnimationToYear(startYear, filtered?.years.from);
			setAnimationToYear(endYear, filtered?.years.to);
			if(swiperWrapper) {
				swiperWrapper.style.opacity = "0";
			}
			//rotationBtnComplete(dot);
			gsap.to(circle, {
				duration: 0.75,
				ease: "none",
				rotation:  deg - 150, 
				overwrite: "auto",
				onComplete: () => rotationBtnComplete(dot, filtered),
			});
			gsap.to(dateList2, {
				rotation: -deg + 150,
				duration: 0.75,
				overwrite: "auto",
			});
			updateButtonState(dot);
};

let onClickCard = (event: MouseEvent) => {
	let dot = event.target as HTMLElement;
	if(dot !== currentDot) {
		removeCurrentActive(currentDot);
		activateDot(dot);
	}
};

dots.forEach((dot) => dot.addEventListener("click", onClickCard));


if(prevBtn) {
	prevBtn.addEventListener("click", () => {
		if(prevBtn.getAttribute('disabled') !== 'true')
			{
				let prevDot = currentDot?.previousElementSibling as HTMLElement;
				let filtered: YearsData | undefined = periodData.filter(p => p.title == prevDot.getAttribute('period-title')).pop();
				setAnimationToYear(startYear, filtered?.years.from);
				setAnimationToYear(endYear, filtered?.years.to);
				removeCurrentActive(currentDot);
				console.log(prevDot);
				rotationBtnComplete(prevDot, filtered);
				curRotation -= slice;
				gsap.to(circle, {
					duration: 0.25,
					ease: "power1.inOut",
					rotation: curRotation - 150,
				});
				gsap.to(dateList2, {
					rotation: -(curRotation - 150) ,
					duration: 0.75,
					overwrite: "auto",
				});
				updateButtonState(prevDot);
			}
	});
}

if(nextBtn) {
	nextBtn.addEventListener("click", () => {
		if(nextBtn.getAttribute('disabled') !== 'true')
			{
				let nextDot = currentDot?.nextElementSibling as HTMLElement;
				let filtered: YearsData | undefined = periodData.filter(p => p.title == nextDot.getAttribute('period-title')).pop();
				setAnimationToYear(startYear, filtered?.years.from);
				setAnimationToYear(endYear, filtered?.years.to);
				removeCurrentActive(currentDot);
				rotationBtnComplete(nextDot, filtered);
				curRotation += slice;
				gsap.to(circle, {
					duration: 0.25,
					ease: "power1.inOut",
					rotation: curRotation - 150,
				});
				gsap.to(dateList2, {
					rotation: -(curRotation - 150),
					duration: 0.75,
					overwrite: "auto",
				});
				updateButtonState(nextDot);
			}
	});
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
		rotation: 150,
	});
	gsap.set(dateList2, {
		x: i => (radius * 1.30) * Math.sin(i * slice * DEG2RAD),
			y: i => (radius * 1.30) * Math.cos(i * slice * DEG2RAD),
		xPercent: -50,
		yPercent: -50
	});
	if(currentDot) {
		activateDot(currentDot);
	}
}

setup();
