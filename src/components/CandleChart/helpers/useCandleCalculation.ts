import { CandleProps, CandleType } from "../../../types/commonTypes";
import { scaleY } from "./candleHelpers";

interface CandlePixels {
	min: number;
	max: number;
}

type CalcCandleResult = { leftSide: string; rightSide: string };

const convertToPixels = (
	{ high, low, open, close }: CandleType,
	domain: [number, number],
): {
	line: CandlePixels;
	body: CandlePixels;
} => {
	const bodyOpen = scaleY(open, domain);
	const bodyClose = scaleY(close, domain);
	const lineHigh = scaleY(low, domain);
	const lineLow = scaleY(high, domain);

	return {
		line: {
			max: Math.max(lineHigh, lineLow),
			min: Math.min(lineHigh, lineLow),
		},
		body: {
			min: Math.min(bodyOpen, bodyClose),
			max: Math.max(bodyOpen, bodyClose),
		},
	};
};

const calcHighLine = (bodyMax: number, lineMax: number, curveSize: number): CalcCandleResult => {
	if (lineMax - bodyMax === 0) {
		return {
			leftSide: "",
			rightSide: "",
		};
	}

	let calcDiff = 0;

	if (lineMax - bodyMax < 2 * curveSize) {
		calcDiff = lineMax - bodyMax;

		return {
			leftSide: `
				q ${curveSize} 0 ${curveSize} ${-calcDiff / 2}
				q ${0} ${-calcDiff / 2} ${curveSize} ${-calcDiff / 2}
			`,
			rightSide: `
				q ${curveSize} 0 ${curveSize} ${calcDiff / 2}
				q ${0} ${calcDiff / 2} ${curveSize} ${calcDiff / 2}
			`,
		};
	}

	calcDiff = lineMax - bodyMax - 2 * curveSize;

	return {
		leftSide: `
			q ${curveSize} 0 ${curveSize} ${-curveSize}
			v ${-calcDiff}
			q ${0} ${-curveSize} ${curveSize} ${-curveSize}
		`,
		rightSide: `
			q ${curveSize} 0 ${curveSize} ${curveSize}
			v ${calcDiff}
			q ${0} ${curveSize} ${curveSize} ${curveSize}
		`,
	};
};

const calcLowLine = (lineMin: number, bodyMin: number, curveSize: number): CalcCandleResult => {
	if (bodyMin - lineMin === 0) {
		return {
			leftSide: "",
			rightSide: "",
		};
	}

	let calcDiff = 0;

	if (bodyMin - lineMin < 2 * curveSize) {
		calcDiff = bodyMin - lineMin;

		return {
			leftSide: `
				q ${-curveSize}, 0 ${-curveSize}, ${-calcDiff / 2}
				q 0, ${-calcDiff / 2} ${-curveSize}, ${-calcDiff / 2}
			`,
			rightSide: `
				q ${-curveSize}, 0 ${-curveSize}, ${calcDiff / 2}
				q 0 ${calcDiff / 2}, ${-curveSize}, ${calcDiff / 2}
			`,
		};
	}

	calcDiff = bodyMin - lineMin - 2 * curveSize;

	return {
		leftSide: `
      q ${-curveSize}, 0 ${-curveSize}, ${-curveSize}
      v ${-calcDiff}
      q 0, ${-curveSize} ${-curveSize}, ${-curveSize}
    `,
		rightSide: `
      q ${-curveSize}, 0 ${-curveSize}, ${curveSize}
      v ${calcDiff}
      q 0 ${curveSize}, ${-curveSize}, ${curveSize}
    `,
	};
};

const calcBody = (bodyMin: number, bodyMax: number, curveSize: number): CalcCandleResult => {
	let calcDiff = 0;

	if (bodyMax - bodyMin < 2 * curveSize) {
		calcDiff = bodyMax - bodyMin;

		return {
			leftSide: `
      q ${-curveSize}, 0 ${-curveSize}, ${-calcDiff / 2}
      q 0 ${-calcDiff / 2}, ${curveSize}, ${-calcDiff / 2}
    `,
			rightSide: `
      q ${curveSize}, 0 ${curveSize}, ${calcDiff / 2}
      q 0 ${calcDiff / 2}, ${-curveSize}, ${calcDiff / 2}
    `,
		};
	}

	calcDiff = bodyMax - bodyMin - 2 * curveSize;

	return {
		leftSide: `
      q ${-curveSize}, 0 ${-curveSize}, ${-curveSize}
      v ${-calcDiff}
      q 0 ${-curveSize}, ${curveSize}, ${-curveSize}
    `,
		rightSide: `
      q ${curveSize}, 0 ${curveSize}, ${curveSize}
      v ${calcDiff}
      q 0 ${curveSize}, ${-curveSize}, ${curveSize}
    `,
	};
};

export const useCandleCalculation = (candleWidth: number, props: CandleProps) => {
	const { line, body } = convertToPixels(props.candle, props.domain);
	const curveSize = candleWidth / 2;

	return {
		beginPoint: `M ${props.width * (props.index + 1 / 2)} ${line.min}`,
		highLine: calcHighLine(line.min, body.min, curveSize),
		lowLine: calcLowLine(body.max, line.max, curveSize),
		body: calcBody(body.min, body.max, curveSize),
	};
};
