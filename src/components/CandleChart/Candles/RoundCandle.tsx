import React, { FC } from "react";
import { Path } from "react-native-svg";

import { CandleProps, PriceColors } from "../../../types/commonTypes";
import { useCandleCalculation } from "../helpers/useCandleCalculation";
import { ROUND_CANDLE_WIDTH } from "../../../constants/sizes";

export const RoundCandle: FC<CandleProps> = (props) => {
	const { open, close } = props.candle;
	const fill = close >= open ? PriceColors.BULLISH : PriceColors.BEARISH;
	const { beginPoint, highLine, lowLine, body } = useCandleCalculation(ROUND_CANDLE_WIDTH, props);

	return (
		<Path
			d={ `
				${beginPoint}
				${highLine.rightSide}
				${body.rightSide}
				${lowLine.rightSide}
				${lowLine.leftSide}
				${body.leftSide}
				${highLine.leftSide}
				Z
		      	` }
			fill={ fill }
		/>
	);
};
