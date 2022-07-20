import moment from "moment";

import { CandleType } from "../../../types/commonTypes";
import {
	formatterHours,
	formatterMinutes,
	formatterMonth,
	formatterThirtyMinutes,
} from "./formatterDate";
import { ConfigureDateOnTimeFrame, VisibleDataItem } from "./Model";

const NUMBER_OF_BARS = 20;

// For every case in time frame ONE_DAY, ONE_WEEK and etc. own function is written

const configureDateOnTimeFrame = (data: CandleType[]): CandleType[] | [] => {
	// helper for cut date, only use now, not in future
	const resultData: CandleType[] = [];

	data.forEach((item, index) => {
		if (index % 10 === 0) {
			resultData.push(item);
		}
	});

	return resultData;
};

const checkLastActiveDate = (data: VisibleDataItem[]): number => {
	// helper for get the latest element with flag visible: true
	const filterData = data.filter((item) => item.visible);

	return filterData[filterData.length - 1].originalIndex;
};

export const configureDateInOneWeek: ConfigureDateOnTimeFrame = ({
	sourceData,
	candleWidth,
	zoom,
}) => {
	const numberOfPoints = sourceData.length; //  Amount of points in all data
	const resultDate: VisibleDataItem[] = []; // The result that we'll return
	const interval = moment(sourceData[numberOfPoints - 1].date).diff(
		// the whole period of time
		moment(sourceData[0].date),
		"month",
	);
	const numPossiblePoints = Math.round(numberOfPoints / NUMBER_OF_BARS); // number of possible points that we can use
	let numberOfAppliedPoints = interval / numPossiblePoints; // the number of points on the whole graph
	let countPoints = 0; // counter for know, when need to add flag visible: true

	if (!Number.isInteger(numberOfAppliedPoints)) {
		// check if numberOfAppliedPoints not an integer (for example: 4.6)
		if (Number.isInteger(interval / Math.floor(numberOfAppliedPoints))) {
			numberOfAppliedPoints = Math.floor(numberOfAppliedPoints);
		} else {
			numberOfAppliedPoints = Math.ceil(numberOfAppliedPoints);
		}
	}
	sourceData.forEach((item, index) => {
		if (!sourceData[index + 1]) {
			// check if there is no next number
			resultDate.push({
				payload: item.date,
				originalIndex: index,
				x: candleWidth * index * zoom.value,
				visible: false,
			});

			return;
		}
		if (countPoints === numberOfAppliedPoints) {
			// condition for show date
			resultDate.push({
				payload: formatterMonth(item.date), // if our date has visible: true => use formatter for date
				originalIndex: index,
				x: candleWidth * index * zoom.value,
				visible: true,
			});
			countPoints = 0;

			return;
		}
		const currentMonthValue = new Date(item.date).getMonth(); // current date
		const nextDateMonthValue = new Date(sourceData[index + 1].date).getMonth(); // next date

		if (currentMonthValue !== nextDateMonthValue) {
			// moment, when check our values in expression. So, it's working our function for this time frame
			++countPoints;
		}
		resultDate.push({
			// Otherwise, we push the element into our final array
			payload: item.date,
			originalIndex: index,
			x: candleWidth * index * zoom.value,
			visible: false,
		});
	});

	return resultDate; // return the result after iteration
};

export const configureDateInOneDay: ConfigureDateOnTimeFrame = ({
	sourceData,
	candleWidth,
	zoom,
}) => {
	let numPossiblePoints = Math.round(sourceData.length / NUMBER_OF_BARS); //  Amount of points in all data
	const numberOfPoints = sourceData.length; // The result that we'll return
	const interval = moment(sourceData[sourceData.length - 1].date).diff(
		// the whole period of time
		moment(sourceData[0].date),
		"month",
	);
	let countPoints = 0; // counter for know, when need to add flag visible: true
	const resultDate: VisibleDataItem[] = []; // The result that we'll return

	sourceData.forEach((item, index) => {
		if (numberOfPoints !== interval) {
			// in time frame OND_DAY our mission is get all dates like 1 jun, 1 feb and etc. and this expression help us
			numPossiblePoints = interval;
		}

		if (countPoints === numPossiblePoints) {
			// expression for end doing function
			resultDate.push({
				payload: item.date,
				originalIndex: index,
				x: candleWidth * index * zoom.value,
				visible: false,
			});

			return;
		}
		if (!sourceData[index + 1]) {
			// check, do we have the next item
			resultDate.push({
				payload: item.date,
				originalIndex: index,
				x: candleWidth * index * zoom.value,
				visible: false,
			});

			return;
		}
		if (index === 0) {
			// in this case, we should use it for have first date
			resultDate.push({
				payload: formatterMonth(item.date),
				originalIndex: index,
				x: candleWidth * index * zoom.value,
				visible: true,
			});

			return;
		}

		const currentMonthValue = new Date(item.date).getMonth(); // current date
		const nextDateMonthValue = new Date(sourceData[index + 1].date).getMonth(); // next date

		if (currentMonthValue !== nextDateMonthValue) {
			// expression for case, when we can have 16 and the next element is 16
			const filteredDate: VisibleDataItem = {
				payload: formatterMonth(sourceData[index + 1].date), // using formatter date, if visible: true
				originalIndex: index,
				x: candleWidth * index * zoom.value,
				visible: true,
			};

			++countPoints; // increase our count for know when we should end this function
			resultDate.push(filteredDate);
		} else {
			// Otherwise, we push the element into our final array
			resultDate.push({
				payload: item.date,
				originalIndex: index,
				x: candleWidth * index * zoom.value,
				visible: false,
			});
		}
	});

	return resultDate; // return the result after iteration
};

export const configureDateInFourHour: ConfigureDateOnTimeFrame = ({
	sourceData,
	candleWidth,
	zoom,
}) => {
	const numberOfPoints = sourceData.length; //  Amount of points in all data
	const interval = moment(sourceData[numberOfPoints - 1].date).diff(
		// the whole period of time
		moment(sourceData[0].date),
		"days",
	);
	const resultDate: VisibleDataItem[] = []; // The result that we'll return
	const numPossiblePoints = Math.round(numberOfPoints / NUMBER_OF_BARS); // number of possible points that we can use
	let numberOfAppliedPoints = interval / numPossiblePoints; // the number of points on the whole graph

	if (!Number.isInteger(numberOfAppliedPoints)) {
		// check if numberOfAppliedPoints not an integer (for example: 4.6)
		if (Number.isInteger(interval / Math.floor(numberOfAppliedPoints))) {
			numberOfAppliedPoints = Math.floor(numberOfAppliedPoints);
		} else {
			numberOfAppliedPoints = Math.ceil(numberOfAppliedPoints);
		}
	}
	sourceData.forEach((item, index) => {
		if (!sourceData[index + 1]) {
			// check if there is no next number
			resultDate.push({
				payload: item.date,
				originalIndex: index,
				x: candleWidth * index * zoom.value,
				visible: false,
			});

			return;
		}
		if (!sourceData[index - 1]) {
			// check if there is no prev number
			resultDate.push({
				payload: item.date,
				originalIndex: index,
				x: candleWidth * index * zoom.value,
				visible: false,
			});

			return;
		}
		const prevDateDayValue = new Date(sourceData[index - 1].date).getDate(); // prev date

		const currentDayValue = new Date(item.date).getDate(); // current date
		const nextDateDayValue = new Date(sourceData[index + 1].date).getDate(); // next date
		const averageNumBetweenDates = (prevDateDayValue + currentDayValue) / 2; // average value  between prev date and current date
		const isRoundnessValue = // check if our date value divide whole
			Math.ceil(averageNumBetweenDates) % numberOfAppliedPoints === 0 ||
			Math.floor(averageNumBetweenDates) % numberOfAppliedPoints === 0;
		let checkIsDuplicateValues;
		let lastIndexVisibleData;
		let lastElementInResultDate;

		if (resultDate.length > numberOfAppliedPoints * 3) {
			// expression, which help us with get the latest value
			lastIndexVisibleData = checkLastActiveDate(resultDate); // get the latest index in our resultDate array
			lastElementInResultDate = new Date(resultDate[lastIndexVisibleData].payload).getDate(); // the last element in result date
			checkIsDuplicateValues = // value for filter date
				lastElementInResultDate !== prevDateDayValue &&
				currentDayValue !== lastIndexVisibleData &&
				currentDayValue - lastElementInResultDate >= numberOfAppliedPoints; // it let us know if current date more, then number of applied points. So, when
			// we don't have a round number, we can put the closest
		}
		if (currentDayValue % numberOfAppliedPoints === 0 && currentDayValue !== nextDateDayValue) {
			// Check current date, for example:  if 16 % 16 === 0 && 16 !== 17
			resultDate.push({
				payload: formatterHours(item.date),
				originalIndex: index,
				x: candleWidth * index * zoom.value,
				visible: true,
			});
		}
		if (
			prevDateDayValue !== currentDayValue && // check on inequality prev date and current date
			!!lastElementInResultDate && // check, do we have in our resultDate last element with flag visible: true
			checkIsDuplicateValues &&
			Math.abs(prevDateDayValue - lastElementInResultDate) > numberOfAppliedPoints &&
			isRoundnessValue
		) {
			resultDate.push({
				payload: formatterHours(item.date),
				originalIndex: index,
				x: candleWidth * index * zoom.value,
				visible: true,
			});

			return;
		}
		resultDate.push({
			payload: item.date,
			originalIndex: index,
			x: candleWidth * index * zoom.value,
			visible: false,
		});
	});

	return resultDate;
};

export const configureDateInOneHour: ConfigureDateOnTimeFrame = ({
	sourceData,
	candleWidth,
	zoom,
}) => {
	const numberOfPoints = sourceData.length; //  Amount of points in all data
	const interval = moment(sourceData[numberOfPoints - 1].date).diff(
		moment(sourceData[0].date),
		// the whole period of time
		"days",
	);
	const numPossiblePoints = Math.round(numberOfPoints / NUMBER_OF_BARS); // number of possible points that we can use
	const numberOfAppliedPoints = Math.round(interval / numPossiblePoints) * 2; // the number of points on the whole graph
	const resultDate: VisibleDataItem[] = []; // The result that we'll return

	sourceData.forEach((item, index) => {
		if (!sourceData[index + 1]) {
			// check if there is no next number
			resultDate.push({
				payload: item.date,
				originalIndex: index,
				x: candleWidth * index * zoom.value,
				visible: false,
			});

			return;
		}
		if (!sourceData[index - 1]) {
			// check if there is no prev number
			resultDate.push({
				payload: item.date,
				originalIndex: index,
				x: candleWidth * index * zoom.value,
				visible: false,
			});

			return;
		}
		const prevDateDayValue = new Date(sourceData[index - 1].date).getDate(); // prev date
		const currentDayValue = new Date(item.date).getDate(); // current date
		const nextDateDayValue = new Date(sourceData[index + 1].date).getDate(); // next date
		const averageNumBetweenDates = (prevDateDayValue + currentDayValue) / 2; // average value  between prev date and current date
		const isRoundnessValue = // check if our date value divide whole
			Math.ceil(averageNumBetweenDates) % numberOfAppliedPoints === 0 ||
			Math.floor(averageNumBetweenDates) % numberOfAppliedPoints === 0;
		let checkIsDuplicateValues; // value for filter date
		let lastIndexVisibleData; // get the latest index in our resultDate array
		let lastElementInResultDate; // last element in our resultDate, which has flag visible: true

		if (resultDate.length > numberOfAppliedPoints * 6) {
			// expression, which help us with get the latest value
			lastIndexVisibleData = checkLastActiveDate(resultDate); // get the latest index in our resultDate array
			lastElementInResultDate = new Date(sourceData[lastIndexVisibleData].date).getDate();

			checkIsDuplicateValues =
				lastElementInResultDate !== prevDateDayValue &&
				currentDayValue !== lastIndexVisibleData &&
				prevDateDayValue - lastElementInResultDate > numberOfAppliedPoints;
			// it let us know if current date more, then number of applied points. So, when
			// we don't have a round number, we can put the closest
		}
		if (currentDayValue % numberOfAppliedPoints === 0 && nextDateDayValue !== currentDayValue) {
			// check current date for inequality others date
			resultDate.push({
				payload: formatterHours(item.date),
				originalIndex: index,
				x: candleWidth * index * zoom.value,
				visible: true,
			});

			return;
		}

		if (
			prevDateDayValue !== currentDayValue && // check on inequality prev date and current date
			!!lastElementInResultDate && // check, do we have in our resultDate last element with flag visible: true
			checkIsDuplicateValues &&
			isRoundnessValue
		) {
			resultDate.push({
				payload: formatterHours(item.date),
				originalIndex: index,
				x: candleWidth * index * zoom.value,
				visible: true,
			});

			return;
		}
		// Otherwise, we push the element into our final array
		resultDate.push({
			payload: item.date,
			originalIndex: index,
			x: candleWidth * index * zoom.value,
			visible: false,
		});
	});

	return resultDate; // return the result after iteration
};

export const configureDateInThirtyMinutes: ConfigureDateOnTimeFrame = ({
	sourceData,
	candleWidth,
	zoom,
}) => {
	const numberOfPoints = sourceData.length; //  Amount of points in all data
	const interval = moment(sourceData[numberOfPoints - 1].date).diff(
		// the whole period of time
		moment(sourceData[0].date),
		"days",
	);
	const numPossiblePoints = Math.round(numberOfPoints / NUMBER_OF_BARS);
	const numberOfAppliedPoints = Math.round(interval / numPossiblePoints);
	const resultDate: VisibleDataItem[] = []; // The result that we'll return

	sourceData.forEach((item, index) => {
		if (!sourceData[index + 1]) {
			// check if there is no next number
			resultDate.push({
				payload: item.date,
				originalIndex: index,
				x: candleWidth * index * zoom.value,
				visible: false,
			});

			return;
		}
		const currentDayValue = new Date(item.date).getDate(); // current date
		const nextDateMonthValue = new Date(sourceData[index + 1].date).getDate(); // next date

		if (currentDayValue % numberOfAppliedPoints === 0 && nextDateMonthValue !== currentDayValue) {
			// check current date for inequality others date
			resultDate.push({
				payload: formatterThirtyMinutes(item.date),
				originalIndex: index,
				x: candleWidth * index * zoom.value,
				visible: true,
			});

			return;
		}
		// Otherwise, we push the element into our final array
		resultDate.push({
			payload: item.date,
			originalIndex: index,
			x: candleWidth * index * zoom.value,
			visible: false,
		});
	});

	return resultDate; // return the result after iteration
};

export const configureDateInFiveMinutes: ConfigureDateOnTimeFrame = ({
	sourceData,
	candleWidth,
	zoom,
}) => {
	const configureSourceData = configureDateOnTimeFrame(sourceData); // helper for cut our date. Right now length of date 5k, but in future won't use it (when backend'll  be ready)
	const resultDate: VisibleDataItem[] = []; // The result that we'll return
	const numberOfPoints = configureSourceData.length; //  Amount of points in all data
	const interval = moment(configureSourceData[numberOfPoints - 1].date).diff(
		// the whole period of time
		moment(configureSourceData[0].date),
		"hours",
	);
	const numPossiblePoints = Math.round(numberOfPoints / NUMBER_OF_BARS); // number of possible points that we can use
	const numberOfAppliedPoints = Math.round(interval / numPossiblePoints); // the number of points on the whole graph

	configureSourceData.forEach((item, index) => {
		if (!configureSourceData[index + 1]) {
			// check if there is no next number
			resultDate.push({
				payload: item.date,
				originalIndex: index,
				x: candleWidth * index * zoom.value,
				visible: false,
			});

			return;
		}
		const currentDateValue = new Date(item.date).getHours(); // current date
		const nextDateValue = new Date(configureSourceData[index + 1].date).getHours(); // next date

		if (index % numberOfAppliedPoints === 0 && nextDateValue !== currentDateValue) {
			// check current date for inequality others date
			resultDate.push({
				payload: formatterMinutes(item.date),
				originalIndex: index,
				x: candleWidth * index * zoom.value,
				visible: true,
			});

			return;
		}
		// Otherwise, we push the element into our final array
		resultDate.push({
			payload: item.date,
			originalIndex: index,
			x: candleWidth * index * zoom.value,
			visible: false,
		});
	});

	return resultDate;
};
