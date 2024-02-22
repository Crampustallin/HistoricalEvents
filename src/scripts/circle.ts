import gsap from 'gsap'
let wheel:HTMLElement | null = document.querySelector(".circle");
let active:HTMLElement | null = document.querySelector(".active");
let dots: HTMLElement[] = gsap.utils.toArray<HTMLElement>(".dots");
let	slice = 360 / dots.length;
let	curRotation = 0;
let	currentDot:HTMLElement | null = document.querySelector(".active"); // keep track of last clicked card so we can put it back
let center: number;
let DEG2RAD: number;
let radius: number;


function setup() {
	radius = wheel?.offsetWidth ?? 0,
		DEG2RAD = Math.PI / 180;
	radius /= 2;
	center = radius;
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
  let desiredDot = 45;
  let dot = event.target as HTMLElement;
let clientRect = currentDot?.getBoundingClientRect();
  if(currentDot && clientRect)
	  {
		  let dRect = dot.getBoundingClientRect();
		  let AB = { x: (clientRect?.x + clientRect.width) - center,
			  y: (clientRect.y + clientRect.height) - center
		  }
		  let AC = { x: (dRect.x + dRect.width) - center,
			  y: (dRect.y + dRect.height) - center
		  }

		  console.log(clientRect.y + " " + clientRect.x);

		  const distance = Math.sqrt(Math.pow(AB.x - AC.x, 2) + Math.pow(AB.y - AC.y, 2));
		  const cosAlpha = (2 * Math.pow(radius, 2) - Math.pow(distance, 2)) / (2 * Math.pow(radius, 2));

		desiredDot = Math.acos(cosAlpha);  
		console.log(desiredDot);
	  }
  console.log(curRotation);
  gsap.to(wheel, {
    duration: 0.25,
    ease: "power1.inOut",
    rotation: desiredDot * DEG2RAD , 
    overwrite: "auto",
    onComplete: rotationBtnComplete,
  }).then(() => {
	  if(currentDot) {
	  }
	  dot.classList.add('active');
	  console.log(currentDot);
	  currentDot = dot;
  });
};


dots.forEach((dot) => dot.addEventListener("click", onClickCard));



