import { YearsData } from "../types/yearsData";
import periodData from "./loadcontent";

const dotsListRow: HTMLElement | null = document.querySelector('.dots-list-row');

let loadDots = (Obj: YearsData, i: number) => {
	if(dotsListRow) {
		const dots: HTMLElement = document.createElement('span');
		dots.className = "dots";
		if(i === 0) {
			dots.classList.add('active');
		}
		const dateList: HTMLElement = document.createElement('span');
		dateList.className = "date-list";
		const innerText: HTMLElement = document.createElement('span');
		innerText.className = "inner-text";
		innerText.innerHTML = (++i).toString();
		dots.setAttribute("period-title", Obj.title);
		dateList.append(innerText);
		dots.append(dateList);
		dotsListRow.append(dots);

	}
};

periodData.map((data, i) => loadDots(data, i));
