import { gsap } from "gsap";
import compose from './common';

const getPrevYear = ([el, prevYear, newYear]: [HTMLElement, number, number]) => {
	el.innerHTML = prevYear.toString();
	return [newYear, el];
}

const setYearAnimation = ([newYear, el]: [number, HTMLElement]) => gsap.to(el, {
	textContent: newYear,
		duration: 1,
		ease: "power1.in",
		snap: { textContent: 1 },
		stagger: {
			each: 1.0,
		}
});


let setAnimationToYear =  (...args: any[]) => compose(getPrevYear, 
						     setYearAnimation)(args);

export default setAnimationToYear;
