import {
	configureDateInFiveMinutes,
	configureDateInFourHour,
	configureDateInOneDay,
	configureDateInOneHour,
	configureDateInOneWeek,
	configureDateInThirtyMinutes,
} from "./configureDateInTimeFrame";
import { VisiblePointCalculator } from "./Model";

export enum NameTimeFrame {
	FIVE_MINUTES = "FIVE_MINUTES",
	THIRTY_MINUTES = "THIRTY_MINUTES",
	ONE_HOUR = "ONE_HOUR",
	FOUR_HOUR = "FOUR_HOUR",
	ONE_DAY = "ONE_DAY",
	ONE_WEEK = "ONE_WEEK",
}

export const configureDate: VisiblePointCalculator = ({
	sourceData,
	candleWidth,
	zoom,
	timeFrame,
}) => {
	"worklet";
	switch (timeFrame) {
	case NameTimeFrame.ONE_WEEK:
		return configureDateInOneWeek({ sourceData, candleWidth, zoom });
	case NameTimeFrame.ONE_DAY:
		return configureDateInOneDay({ sourceData, candleWidth, zoom });
	case NameTimeFrame.FOUR_HOUR:
		return configureDateInFourHour({ sourceData, candleWidth, zoom });
	case NameTimeFrame.ONE_HOUR:
		return configureDateInOneHour({ sourceData, candleWidth, zoom });
	case NameTimeFrame.THIRTY_MINUTES:
		return configureDateInThirtyMinutes({ sourceData, candleWidth, zoom });
	case NameTimeFrame.FIVE_MINUTES:
		return configureDateInFiveMinutes({ sourceData, candleWidth, zoom });
	default:
		return sourceData;
	}
};
