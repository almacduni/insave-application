import * as React from "react";
import { Svg, Rect } from "react-native-svg";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

type IHandleIcon = {
	light?: boolean;
	medium?: boolean;
};

export const HandleIcon = ({ light, medium }: IHandleIcon) => {
	const width = wp("13.6%");
	const height = wp("1.06%");

	const fill = React.useMemo(() => {
		switch (true) {
		case light: return "#ffffff";
		case medium: return "rgba(3, 6, 29, 0.1)";
		default: return "rgba(3, 6, 29, 0.1)";
		}
	}, [light, medium]);

	return (
		<Svg { ...{ width, height } } viewBox={ `0 0 ${width} ${height}` } fill="none">
			<Rect
				{ ...{ width, height } }
				rx={ height / 2 }
				fill={ fill }
			/>
		</Svg>
	);
};
