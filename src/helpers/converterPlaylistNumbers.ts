export const convertAmgNumber = (number: number) => {
	const resultNumber = number.toFixed(1);

	number.toFixed(1);
	if (number >= 1000) {
		return `${resultNumber}K`;
	}
	if (number >= 1000000) {
		return `${resultNumber}M`;
	}

	return resultNumber;
};
