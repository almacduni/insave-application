import React from "react";
import Animated from "react-native-reanimated";
import { Line, Rect } from "react-native-svg";

import { scaleBody, scaleY } from "../../../../../components/CandleChart/helpers/candleHelpers";
import { scale } from "../../../../../helpers/sizeConverter";
import { CandleType } from "../../../../../types/commonTypes";

interface ICandleProps {
	candle: CandleType;
	index: number;
	width: number;
	domain: [number, number];
	scaleX: Animated.SharedValue<number>;
}

export const Candle: React.FC<ICandleProps> = ({ candle, index, width, domain, scaleX }) => {
	const { close, open, high, low } = candle;

	const fill = close >= open ? "#0D8761" : "#EB0046";
	const candleWidth = scale(3.75);
	const border = (width - candleWidth) / 2;
	const x = Math.floor(index * width);
	const max = Math.max(open, close);
	const min = Math.min(open, close);

	return (
		<>
			<Line
				x1={ 0 }
				y1={ scaleY(high, domain) }
				x2={ 0 }
				y2={ scaleY(low, domain) }
				transform={ `translate(${(x + border + candleWidth / 2) * scaleX.value}, 0)` }
				stroke={ fill }
				strokeWidth={ 1 }
				clipRule="evenodd"
				strokeLinecap="round"
				vectorEffect="non-scaling-stroke"
			/>
			{!scaleBody(max - min, domain) ? (
				<Line
					x1={ x + border }
					y1={ scaleY(max, domain) }
					x2={ x + border + candleWidth }
					y2={ scaleY(max, domain) }
					stroke={ fill }
					strokeWidth={ 1 }
					clipRule="evenodd"
					strokeLinecap="round"
				/>
			) : (
				<Rect
					x={ x + border }
					y={ scaleY(max, domain) }
					width={ candleWidth }
					height={ scaleBody(max - min, domain) }
					rx={ "0.3" }
					ry={ "0.2" }
					{ ...{ fill } }
				/>
			)}
		</>
	);
};
