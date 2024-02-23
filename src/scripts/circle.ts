import gsap from 'gsap'

let wheel:HTMLElement | null = document.querySelector(".circle");
let dots: HTMLElement[] = gsap.utils.toArray<HTMLElement>(".dots");
let slice = 360 / dots.length;
let currentDot:HTMLElement | null = document.querySelector(".active"); // keep track of last clicked card so we can put it back


function setup() {
	let radius: number = wheel?.offsetWidth ?? 0;
	let DEG2RAD: number = Math.PI / 180;
	radius /= 2;
	let center: number = radius;
	gsap.set(dots, {
		x: i => radius * Math.sin(i * slice * DEG2RAD),
		y: i => radius * Math.cos(i * slice * DEG2RAD),
		rotation: i => i * slice,
		xPercent: -50,
		yPercent: -50
	});
}

setup();

  const rotationBtnComplete = () => {
	  let dot = document.querySelector('.active');
	  dot?.classList.remove('active');
};

let onClickCard = (event: MouseEvent) => {
	let dot = event.target as HTMLElement;
	let style = dot?.getAttribute('style');
	let deg: number = 0;
	if(style) {
		let s = style.match(/rotate\((\d+)deg\)/);
		if(s && s[1]) {
			deg = Number.parseInt(s[1]);
		}
	}
	gsap.to(wheel, {
		duration: 0.25,
		ease: "power1.inOut",
		rotation:  deg - 150, 
		overwrite: "auto",
		onComplete: rotationBtnComplete,
	}).then(() => {
		dot.classList.add('active');
		currentDot = dot;
	});
};


dots.forEach((dot) => dot.addEventListener("click", onClickCard));



