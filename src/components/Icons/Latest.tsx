import React, { FC } from "react";
import { Path, Svg } from "react-native-svg";

import { scale } from "../../helpers/sizeConverter";

type IconProps = {
	isActive: boolean;
};

export const LatestIcon: FC<IconProps> = ({ isActive }) => (
	<Svg width={ scale(24) } height={ scale(24) } viewBox="0 0 24 24" fill="none">
		<Path
			d="M7 11.5789L14.0833 4L12.8333 9.89474L17 11.5789L9.08333 20L10.75 13.2632L7 11.5789Z"
			stroke={ isActive ? "#344CD3" : "#252525" }
			strokeWidth="2"
		/>
	</Svg>
);
