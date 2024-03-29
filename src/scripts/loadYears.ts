import { gsap } from "gsap";


const setYearAnimation = (el: HTMLElement | null, newYear: number | undefined) => {
	if(el && newYear) {
		gsap.to(el, {
			textContent: newYear,
			duration: 1,
			ease: "power1.in",
			snap: { textContent: 1 },
			stagger: {
				each: 1.0,
			}
		});
	}
};



export default setYearAnimation;
