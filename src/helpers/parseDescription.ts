export const parseDescription = (description: string) => {
	const arrayOfSentences = description.match(/[^\.!\?]+[\.!\?]+/g);
	let newDescription = "";

	if (!arrayOfSentences) return "";

	for (const sentence of arrayOfSentences) {
		if (sentence.includes("Wikipedia")) break;

		newDescription += sentence;
	}

	return newDescription;
};
