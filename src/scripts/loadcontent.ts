const yearsContainer: HTMLElement | null = document.querySelector(".years-container");
const dotsListRow: HTMLElement | null = document.querySelector('.dots-list-row');
interface YearsData {
  years: { from: number; to: number };
  title: string;
  paragraphs: {
    title: string;
    content: string;
  }[];
}
	var movieData: YearsData[] = [{

		years: { "from": 2010, "to": 2015 },
		title: "Книги",
		paragraphs: [
			{ title: "2010", content: "Описание книг, выпущенных в 2010 году..." },
			{ title: "2011", content: "Описание книг, выпущенных в 2011 году..." },
			{ title: "2012", content: "Описание книг, выпущенных в 2012 году..." },
			{ title: "2013", content: "Описание книг, выпущенных в 2013 году..." },
			{ title: "2014", content: "Описание книг, выпущенных в 2014 году..." },
			{ title: "2015", content: "Описание книг, выпущенных в 2015 году..." }
		]
	},{
		years: { from: 2005, to: 2010 },
		title: "Фильмы",
		paragraphs: [
			{ title: "2005", content: "Описание фильмов, выпущенных в 2005 году..." },
			{ title: "2006", content: "Описание фильмов, выпущенных в 2006 году..." },
			{ title: "2007", content: "Описание фильмов, выпущенных в 2007 году..." },
			{ title: "2008", content: "Описание фильмов, выпущенных в 2008 году..." },
			{ title: "2009", content: "Описание фильмов, выпущенных в 2009 году..." },
			{ title: "2010", content: "Описание фильмов, выпущенных в 2010 году..." }
		]
	},{
		years: { from: 1990, to: 2000 },
		title: "Музыка",
		paragraphs: [
			{ title: "1990", content: "Описание альбомов, выпущенных в 1990 году..." },
			{ title: "1991", content: "Описание альбомов, выпущенных в 1991 году..." },
			{ title: "1992", content: "Описание альбомов, выпущенных в 1992 году..." },
			{ title: "1993", content: "Описание альбомов, выпущенных в 1993 году..." },
			{ title: "1994", content: "Описание альбомов, выпущенных в 1994 году..." },
			{ title: "1995", content: "Описание альбомов, выпущенных в 1995 году..." },
			{ title: "1996", content: "Описание альбомов, выпущенных в 1996 году..." },
			{ title: "1997", content: "Описание альбомов, выпущенных в 1997 году..." },
			{ title: "1998", content: "Описание альбомов, выпущенных в 1998 году..." },
			{ title: "1999", content: "Описание альбомов, выпущенных в 1999 году..." },
			{ title: "2000", content: "Описание альбомов, выпущенных в 2000 году..." }
		]
	},{
		years: { from: 2018, to: 2022 },
		title: "Мероприятия",
		paragraphs: [
			{ title: "2018", content: "Описание мероприятий, проведенных в 2018 году..." },
			{ title: "2019", content: "Описание мероприятий, проведенных в 2019 году..." },
			{ title: "2020", content: "Описание мероприятий, проведенных в 2020 году..." },
			{ title: "2021", content: "Описание мероприятий, проведенных в 2021 году..." },
			{ title: "2022", content: "Описание мероприятий, роведенных в 022 году..." }
		]
	},{
		years: { from: 2000, to: 2010 },
		title: "Инновации",
		paragraphs: [
			{ title: "2000", content: "Описание технических инноваций за 2000 год..." },
			{ title: "2001", content: "Описание технических инноваций за 2001 год..." },
			{ title: "2002", content: "Описание технических инноваций за 2002 год..." },
			{ title: "2003", content: "Описание технических инноваций за 2003 год..." },
			{ title: "2004", content: "Описание технических инноваций за 2004 год..." },
			{ title: "2005", content: "Описание технических инноваций за 2005 год..." },
			{ title: "2006", content: "Описание технических инноваций за 2006 год..." },
			{ title: "2007", content: "Описание технических инноваций за 2007 год..." },
			{ title: "2008", content: "Описание технических инноваций за 2008 год..." },
			{ title: "2009", content: "Описание технических инноваций за 2009 год..." },
			{ title: "2010", content: "Описание технических инноваций за 2010 год..." }
		]
	},{
		years: { from: 2015, to: 2020 },
		title: "Спорт",
		paragraphs: [
			{ title: "2015", content: "Описание спортивных событий, произошедших в 2015 году..." },
			{ title: "2016", content: "Описание спортивных событий, произошедших в 2016 году..." },
			{ title: "2017", content: "Описание спортивных событий, произошедших в 2017 году..." },
			{ title: "2018", content: "Описание спортивных событий, произошедших в 2018 году..." },
			{ title: "2019", content: "Описание спортивных событий, произошедших в 2019 году..." },
			{ title: "2020", content: "Описание спортивных событий, произошедших в 2020 году..." }
		]
	}];

let load = () => {

	let generateFront = (Obj: YearsData, i: number) => {

		let loadDots = () => {
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
				dots.setAttribute("date", "period" + i)
				dateList.append(innerText);
				dots.append(dateList);
				dotsListRow.append(dots);

			}
		};

		let loadYears = () => {
			if(yearsContainer) {
				const startYear: HTMLElement = document.createElement('h2');
				const endYear: HTMLElement = document.createElement('h2');
				startYear.className = "start-year";
				startYear.innerHTML = Obj.years.from.toString();
				endYear.className = "end-year";
				endYear.innerHTML = Obj.years.to.toString();
				const years = document.createElement('div');
				years.className = "years";
				if(i === 1) {
					years.classList.add('active');
				}
				years.setAttribute("date", "period" + i);
				years.append(startYear);
				years.append(endYear);
				yearsContainer.append(years);
			}
		}

		let loadSliderObjects = () => {
			const eventsSwiper: HTMLElement = document.createElement("div");
			eventsSwiper.className = "swiper";
			eventsSwiper.classList.add("events-swiper");
				const swiperWrapper: HTMLElement = document.createElement('div');
				swiperWrapper.className = "swiper-wrapper";
				if(i === 1) {
					eventsSwiper.classList.add('active');
				}
				Obj.paragraphs.map(content => {
					const swiperSlide: HTMLElement = document.createElement('div');
					swiperSlide.className = "swiper-slide";
					const header: HTMLElement = document.createElement('h3');
					header.innerHTML = content.title;
					swiperSlide.append(header);
					const paragraph: HTMLElement = document.createElement('p');
					paragraph.innerHTML = content.content;
					swiperSlide.append(paragraph);
					swiperWrapper.append(swiperSlide);
				});
				eventsSwiper.setAttribute("date", "period" + i);
				eventsSwiper.appendChild(swiperWrapper);
				document.querySelector(".years-container")?.insertAdjacentElement('afterend',eventsSwiper);
		}

		return [loadDots, loadYears, loadSliderObjects];
	};
	movieData.map((d, i) => generateFront(d, i).map(f => f()));
}

load();
