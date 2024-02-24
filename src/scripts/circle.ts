import gsap from 'gsap'
import setAnimationToYear from './gsapYears';
import updateSwiper from './swipe';

let circle:HTMLElement | null = document.querySelector(".circle");
let dots: HTMLElement[] = gsap.utils.toArray<HTMLElement>(".dots");
let dateList: HTMLElement[] = gsap.utils.toArray<HTMLElement>(".date-list");
let slice = 360 / dots.length;
let curRotation = 0;
let currentDot: NodeListOf<HTMLElement> = document.querySelectorAll(".active");
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
		rotation: i => -(i * slice),
	});
}

setup();



let removeCurrentActive = (current: HTMLElement) => {
	if(current)
		{
			current.classList.remove('active');
			current.firstElementChild?.classList.remove('active');
		}
}


const rotationBtnComplete = (dot: HTMLElement | null | undefined) => {
	  if(dot) {
		  let prevYears = currentDot[1];
		  currentDot = document.querySelectorAll(`[date=${dot.getAttribute('date')}]`);
		  currentDot.forEach(elem => elem.classList.add('active'));
		  updateSwiper();
		  setAnimationToYear(currentDot[1].firstChild, prevYears.firstChild?.textContent, currentDot[1].firstChild?.textContent);
		  setAnimationToYear(currentDot[1].lastChild, prevYears.lastChild?.textContent, currentDot[1].lastChild?.textContent);
	  }
};


let onClickCard = (event: MouseEvent) => {
	let dot = event.target as HTMLElement;
			currentDot.forEach((current:HTMLElement) => removeCurrentActive(current));
	if(dot && currentDot[0] !== dot)
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
				let prevDot = currentDot[0]?.nextElementSibling as HTMLElement;
			currentDot.forEach((current:HTMLElement) => removeCurrentActive(current));
			rotationBtnComplete(prevDot);
				curRotation += slice;
				gsap.to(circle, {
					duration: 0.25,
					ease: "power1.inOut",
					rotation: curRotation - 150,
				});
				updateButtonState(prevDot);
			}
	});
}

if(nextBtn) {
	nextBtn.addEventListener("click", () => {
		if(nextBtn.getAttribute('disabled') !== 'true')
			{
				let nextDot = currentDot[0]?.previousElementSibling as HTMLElement;
			currentDot.forEach((current:HTMLElement) => removeCurrentActive(current));
			rotationBtnComplete(nextDot);
				curRotation -= slice;
				gsap.to(circle, {
					duration: 0.25,
					ease: "power1.inOut",
					rotation: curRotation - 150,
				});
				updateButtonState(nextDot);
			}
	});
}
