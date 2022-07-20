import moment from "moment";

export const getYear = (date: string | null) => {
	if (!date) return null;

	const newDate = new Date(date);

	return moment(newDate).format("YYYY");
};

export const getMonth = (date: string) => {
	const newDate = new Date(date);

	return moment(newDate).format("MMMM");
};

export const monthNames = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

export const normalizeDate = (date: Date) => {
	"worklet";
	const normalizeMonth = () => monthNames[date.getMonth()];
	const normalizeDay = (day: number) => (day < 10 ? "0" + day : day);
	const normalizeHour = (hours: number) => {
		const postfix = hours >= 12 ? "pm" : "am";

		return `${hours % 12 || 12}${postfix}`;
	};

	return `${normalizeMonth()} ${normalizeDay(date.getDate())}, ${normalizeHour(date.getHours())}`;
};
