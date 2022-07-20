import React, { FC } from "react";
import { Rect, Svg } from "react-native-svg";

type PropsType = {
	isActive: boolean;
};

export const StockStatus: FC<PropsType> = ({ isActive }) => (
	<Svg width="5" height="5" viewBox="0 0 5 5" fill="none">
		<Rect opacity="0.5" width="5" height="5" rx="2.5" fill={ isActive ? "green" : "red" } />
	</Svg>
);
