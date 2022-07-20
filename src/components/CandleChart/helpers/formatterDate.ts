import moment from "moment";

const RANGE_FOR_DAYS = 5;
const latestDaysOfMonth = [30, 31];

export const formatterMonth = (date: string): string => {
	if (moment(date).format("MMMM") === "January") {
		return moment(date).format("YYYY");
	}

	return moment(date).format("MMMM");
};

export const formatterHours = (date: string): string => {
	if (moment(date).format("MMMM") === "January") {
		return moment(date).format("YYYY");
	}
	if (+moment(date).format("D") <= RANGE_FOR_DAYS) {
		return moment(date).format("MMMM");
	}

	return moment(date).format("D");
};

export const formatterMinutes = (date: string): string => {
	if (moment(date).format("MMMM") === "January") {
		return moment(date).format("YYYY");
	}

	return moment(date).format("h:mm");
};

export const formatterThirtyMinutes = (date: string): string => {
	if (moment(date).format("MMMM") === "January") {
		return moment(date).format("YYYY");
	}
	if (
		+moment(date).format("D") === latestDaysOfMonth[0] ||
		+moment(date).format("D") === latestDaysOfMonth[1]
	) {
		return moment(date).format("MMMM");
	}

	return moment(date).format("D");
};
