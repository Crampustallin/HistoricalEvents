import { YearsData } from "../types/yearsData";
import periodData from "./loadcontent";


let loadDots = (Obj: YearsData, i: number) => {
	const dotsListRow: HTMLElement | null = document.querySelector('.dots-list-row');
	const dotsListRow2: HTMLElement | null = document.querySelector('.dots-list-row2');
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
		const innerText: HTMLElement = document.createElement('span');
		innerText.className = "inner-text";
		if(i === 0) {
			dots.classList.add('active');
			title.classList.add('active');
			innerText.classList.add('active');
		}
		innerText.innerHTML = (++i).toString();
		const dotsContainer: HTMLElement = document.createElement('div');
		dotsContainer.className = "dots-container";
		dateList.append(innerText);
		dots.setAttribute('number', i.toString());
		dotsContainer.append(dots);
		dotsContainer.append(dateList)
		dotsListRow.append(dotsContainer);
		dotsListRow2?.append(title);

	}
};

periodData.map((data, i) => loadDots(data, i));
