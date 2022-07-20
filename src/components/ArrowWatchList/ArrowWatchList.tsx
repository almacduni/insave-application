import React, { FC } from "react";
import Svg, { Path } from "react-native-svg";

type PropsType = {
	isIncrease: boolean;
};

export const ArrowWatchList: FC<PropsType> = ({ isIncrease }) => (
	<Svg
		width="14"
		height="7"
		viewBox="0 0 14 7"
		fill="none"
		style={ isIncrease ? null : { transform: [{ rotate: "180deg" }] } }
	>
		<Path d="M13 6L7 2L1 6" stroke={ isIncrease ? "#0ABA85" : "#E30502" } stroke-width="2" />
	</Svg>
);
