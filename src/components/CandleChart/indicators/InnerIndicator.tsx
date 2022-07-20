import { Indicators } from "../../../types/commonTypes";
import { withIndicatorWrapper } from "./withIndicatorWrapper";
import { EMA } from "./EMA";
import { BB } from "./BB";

const indicators = {
	[Indicators.EMA]: EMA,
	[Indicators.BB]: BB,
};

export const InnerIndicator = withIndicatorWrapper({
	indicators,
});
