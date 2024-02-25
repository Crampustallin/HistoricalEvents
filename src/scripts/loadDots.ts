import { YearsData } from "../types/yearsData";
import periodData from "./loadcontent";

const dotsListRow: HTMLElement | null = document.querySelector('.dots-list-row');
const dotsListRow2: HTMLElement | null = document.querySelector('.dots-list-row2');

let loadDots = (Obj: YearsData, i: number) => {
	if(dotsListRow) {
		const dots: HTMLElement = document.createElement('span');
		dots.className = "dots";
		const dateList: HTMLElement = document.createElement('span');
		dateList.className = "date-list";
		dots.setAttribute("period-title", Obj.title);
		const title: HTMLElement = document.createElement('span');
		title.className = "title";
		title.innerHTML = Obj.title;
		title.setAttribute("period-title", Obj.title);
		if(i === 0) {
			dots.classList.add('active');
			title.classList.add('active');
		}
		const innerText: HTMLElement = document.createElement('span');
		innerText.className = "inner-text";
		innerText.innerHTML = (++i).toString();
		dateList.append(innerText);
		dots.append(dateList);
		dotsListRow.append(dots);
		dotsListRow2?.append(title);

	}
};

periodData.map((data, i) => loadDots(data, i));
