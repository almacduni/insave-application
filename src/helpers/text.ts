export const smallCaps = (word: string) => `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`;

export const cutEmail = (email: string | null): string => {
	const [beginSubstring, endSubstring] = email ? email.split("@") : ["example", "example.example"];
	const firstLetter = beginSubstring[0];
	const lastLetter = beginSubstring[beginSubstring.length - 1];

	return `${firstLetter}*****${lastLetter}@${endSubstring}`;
};

const MAX_COMPANY_NAME_LENGTH = 25;

export const processCompanyName = (name: string, defaultString: string): string => name.length > MAX_COMPANY_NAME_LENGTH ? defaultString : name.replace(/[,|.]/g, "");
