export const PercentRatio = (a: number, b: number) => {
	switch (true) {
	case a > b: {
		return `(+${Math.round((a / b) * 100 - 100)}%)`;
	}
	case a < b: {
		return `(-${Math.round(100 - (a / b) * 100)}%)`;
	}
	default:
		return "(0%)";
	}
};

export const numberToPercent = (input: number) => {
	const inputLength = Math.abs(input).toString().split(".")[1].length;

	const output = (Math.abs(input) * Math.pow(10, inputLength)).toPrecision(inputLength);

	return output;
};

export const numberWithCommas = (x: number) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
