import { gsap } from "gsap";
import compose from './common';

const getPrevYear = ([el, newYear]: [HTMLElement, number]) => {
	console.log(el);
	console.log(newYear);
	let prevYear:Number = Number.parseInt(el.innerText);
	el.innerHTML = newYear.toString();
	return [prevYear, el];
}

const setYearAnimation = ([prevYear, el]: [number, HTMLElement]) => gsap.from(el, {
		textContent: prevYear,
		duration: 1,
		ease: "power1.in",
		snap: { textContent: 1 },
		stagger: {
			each: 1.0,
		}
});


let setAnimationToYear = async (...args: any[]) => compose(getPrevYear, 
						     setYearAnimation)(args);

export default setAnimationToYear;
