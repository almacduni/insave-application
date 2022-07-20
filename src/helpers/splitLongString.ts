export const splitLongString = (longString: string) => {
	const split = longString.split(".");
	const string = split.slice(0, 2).join(".") + ".";

	return string;
};
