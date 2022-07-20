import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;

export const convertBigNumber = (labelValue: number) => {
	let output; let letter;

	switch (true) {
	case Math.abs(Number(labelValue)) >= 1.0e12: {
		output = Math.abs(Number(labelValue)) / 1.0e12;
		letter = "T";
		break;
	}
	case Math.abs(Number(labelValue)) >= 1.0e9: {
		output = Math.abs(Number(labelValue)) / 1.0e9;
		letter = "B";
		break;
	}
	case Math.abs(Number(labelValue)) >= 1.0e6: {
		output = Math.abs(Number(labelValue)) / 1.0e6;
		letter = "M";
		break;
	}
	case Math.abs(Number(labelValue)) >= 1.0e3: {
		output = Math.abs(Number(labelValue)) / 1.0e3;
		letter = "K";
		break;
	}
	default:
		output = labelValue;
		letter = "";
		break;
	}
	if (labelValue < 0) output = -Math.abs(output);

	if (width <= 310) return Math.trunc(Math.round(output * 10) / 10) + letter;
	else return Math.round(output * 10) / 10 + letter;
};
