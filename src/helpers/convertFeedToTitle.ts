export const convertFeedToTitle = (FeedBody: string): string => {
	const res = FeedBody.split("");

	res.length = 175;
	if (res[res.length] === " ") res.pop();

	return res.join("");
};
