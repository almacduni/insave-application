import React, { FC } from "react";
import { Svg, G, Defs, ClipPath, Rect, Path } from "react-native-svg";

import { scale } from "../../helpers/sizeConverter";

type IconProps = {
	isActive: boolean;
};

export const TrendingIcon: FC<IconProps> = ({ isActive }) => (
	<Svg width={ scale(24) } height={ scale(24) } viewBox="0 0 24 24" fill="none">
		<G clip-path="url(#clip0)">
			<Path
				d="M12.5911 2.7375C3.50032 9.61913 3.05405 17.7818 8.67441 19.2877L11.572 20.0641C17.5429 21.664 20.6316 14.2094 17.1271 7.05874C14.2896 9.92191 12.1685 6.24773 12.5911 2.7375Z"
				stroke={ isActive ? "#344CD3" : "#252525" }
				strokeWidth="2"
			/>
		</G>
		<Defs>
			<ClipPath id="clip0">
				<Rect width="24" height="24" fill="white" />
			</ClipPath>
		</Defs>
	</Svg>
);
