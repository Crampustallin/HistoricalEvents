import { gsap } from "gsap";
import './common';

const getPrevYear = (el:HTMLElement, newYear: number) => {
	let prevYear:Number = Number.parseInt(el.innerText);
	el.innerHTML = newYear.toString();
	return [prevYear, el];
}

const setYearAnimation = ([prevYear, el]: [number, HTMLElement]) => gsap.from(el, {
		textContent: prevYear,
		duration: 4,
		ease: "power1.in",
		snap: { textContent: 1 },
		stagger: {
			each: 1.0,
		}
});


let setAnimationToYear = (...args: any[]) => compose(getPrevYear, 
						     setYearAnimation)(args);
