import moment from "moment";

export const weeksSince = (dateString: string) => {
	const unixDate = moment(dateString).unix();

	const date = new Date(unixDate * 1000);

	const today = new Date();
	const resultDate = today - date;

	return `${Math.floor((resultDate) / (1000 * 60 * 60 * 24 * 7))}w`;
};
