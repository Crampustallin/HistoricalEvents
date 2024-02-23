import gsap from 'gsap'
import setAnimationToYear from './gsapYears';
import updateSwiper from './swipe';

let circle:HTMLElement | null = document.querySelector(".circle");
let dots: HTMLElement[] = gsap.utils.toArray<HTMLElement>(".dots");
let dateList: HTMLElement[] = gsap.utils.toArray<HTMLElement>(".date-list");
let slice = 360 / dots.length;
let curRotation = 0;
let currentDot:HTMLElement | null = document.querySelector("div .active");
let startYear: HTMLElement | null = document.querySelector(".start-year");
let endYear: HTMLElement | null = document.querySelector(".end-year");
const prevBtn = document.getElementById("prev-button");
const nextBtn = document.getElementById("next-button");

let updateButtonState = (nextDot : HTMLElement) => {
	prevBtn?.setAttribute("disabled", `${!nextDot?.nextElementSibling}`);
	nextBtn?.setAttribute("disabled", `${!nextDot?.previousElementSibling}`);
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
		ease: "power1.in"
	});
}

setup();


let removeCurrentActive = () => {
	if(currentDot)
		{
			currentDot.classList.remove('active');
			currentDot.firstElementChild?.classList.remove('active');
		}
}

removeCurrentActive();

const rotationBtnComplete = (dot: HTMLElement | null | undefined) => {
	  if(dot) {
		  dot.classList.add('active');
		  dot.firstElementChild?.classList.add('active');
		  currentDot = dot;
	  }
};

let updateYears = (dot: HTMLElement) => {
			let prevYear = parseInt(currentDot?.querySelector('.date-text')?.innerHTML ?? '0');
			setAnimationToYear(startYear, prevYear);

			let nextYear = parseInt(dot.querySelector('.date-text')?.innerHTML ?? '0');
			setAnimationToYear(endYear, nextYear);
			updateSwiper();
}

let onClickCard = (event: MouseEvent) => {
	let dot = event.target as HTMLElement;
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
			updateYears(dot);
			removeCurrentActive();

			gsap.to(circle, {
				duration: 0.75,
				ease: "none",
				rotation:  deg - 150, 
				overwrite: "auto",
			}).then(() => rotationBtnComplete(dot));
			updateButtonState(dot);
		}
};


dots.forEach((dot) => dot.addEventListener("click", onClickCard));

if(prevBtn) {
	prevBtn.addEventListener("click", () => {
		if(prevBtn.getAttribute('disabled') !== 'true')
			{
				let prevDot = currentDot?.nextElementSibling as HTMLElement;
				updateYears(prevDot);
				removeCurrentActive();
				curRotation += slice;
				gsap.to(circle, {
					duration: 0.25,
					ease: "power1.inOut",
					rotation: curRotation - 150,
				}).then(() => rotationBtnComplete(prevDot));
				updateButtonState(prevDot);
			}
	});
}

if(nextBtn) {
	nextBtn.addEventListener("click", () => {
		if(nextBtn.getAttribute('disabled') !== 'true')
			{
				let nextDot = currentDot?.previousElementSibling as HTMLElement;
				updateYears(nextDot);
				removeCurrentActive();
				curRotation -= slice;
				gsap.to(circle, {
					duration: 0.25,
					ease: "power1.inOut",
					rotation: curRotation - 150,
				}).then(() => rotationBtnComplete(nextDot));
				updateButtonState(nextDot);
			}
	});
}
