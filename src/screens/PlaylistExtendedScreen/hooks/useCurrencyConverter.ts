const useCurrencyConverter = () => (str: string) => {
	const array = str.split(".");

	array[1] = array[1]?.slice(2, 3);
	if (!array[1]) {
		return str;
	}
	const concatStr = array.join("");

	const numericalPart = concatStr.substring(0, concatStr.length - 1);
	const currencyNumber = Number(numericalPart) / 100;

	return `${currencyNumber}${array[array.length - 1]}`;
};

export { useCurrencyConverter };
