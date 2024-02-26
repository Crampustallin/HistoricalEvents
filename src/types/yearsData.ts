interface YearsData {
	years: { from: number; to: number };
	title: string;
	paragraphs: {
		title: string;
		content: string;
	}[];
}

export type {YearsData};
