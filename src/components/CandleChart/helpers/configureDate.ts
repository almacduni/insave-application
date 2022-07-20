import { CandleType } from "../../../types/commonTypes";
// FIXME:
import { ConfigDate } from "../DateContainer/DateContainer";

export const configureDateOnStart = (date: CandleType[]): ConfigDate[] => {
	const resultDate: ConfigDate[] = [];

	date.forEach((item, index) => {
		if (!date[index + 1]) {
			resultDate.push({ date: item.date, visible: false });

			return;
		}
		const dateMonthValue = new Date(item.date).getMonth();
		let nextDateMonthValue;

		if (date[index + 1]) {
			nextDateMonthValue = new Date(date[index + 1].date).getMonth();
		}
		if (dateMonthValue !== nextDateMonthValue) {
			const filteredDate = {
				date: date[index + 1].date,
				visible: true,
			};

			resultDate.push(filteredDate);
		} else {
			resultDate.push({ date: item.date, visible: false });
		}
	});

	return resultDate;
};

