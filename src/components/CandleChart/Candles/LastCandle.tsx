import React, { useEffect, useState } from "react";
import { Line, Rect } from "react-native-svg";

import { REAL_CANDLE_WIDTH } from "../../../constants/sizes";
import { scaleBody, scaleY } from "../helpers/candleHelpers";

function getRandomArbitrary (min: number, max: number): number {
	return Math.random() * (max - min) + min;
}

export const LastCandle = ({ index, width, domain }: any) => {
	const [fill, setFill] = useState("#fff");
	const [, setOpen] = useState(0);
	const [max, setMax] = useState(0);
	const [min, setMin] = useState(0);
	const [low, setLow] = useState(0);
	const [high, setHigh] = useState(0);

	const border = (width - REAL_CANDLE_WIDTH) / 2;
	const x = Math.floor(index * width);

	useEffect(() => {
		const openValue = getRandomArbitrary(145, 150);

		setOpen(openValue);

		setInterval(() => {
			const lastPrice = getRandomArbitrary(145, 150);

			setMax(Math.max(openValue, lastPrice));
			setMin(Math.min(openValue, lastPrice));
			setHigh(getRandomArbitrary(145, 150));
			setLow(getRandomArbitrary(145, 150));
			setFill(openValue >= lastPrice ? "#0D8761" : "#EB0046");
		}, 2000);
	}, []);

	return (
		<>
			<Line
				x1={ x + border + REAL_CANDLE_WIDTH / 2 }
				y1={ scaleY(high, domain) }
				x2={ x + border + REAL_CANDLE_WIDTH / 2 }
				y2={ scaleY(low, domain) }
				stroke={ fill }
				strokeWidth={ 1 }
				clipRule="evenodd"
				strokeLinecap="round"
			/>
			<Rect
				x={ x + border }
				y={ scaleY(max, domain) }
				width={ REAL_CANDLE_WIDTH }
				height={ scaleBody(max - min, domain) }
				rx={ "0.3" }
				ry={ "0.2" }
				{ ...{ fill } }
			/>
		</>
	);
};
