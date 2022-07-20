import React, { FC, ReactComponentElement } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";

import { scale, verticalScale } from "../../helpers/sizeConverter";
import { getFeedData, setSection } from "../../redux/feedSlice";
import { PAGE_LIMIT } from "../../screens/FeedScreen/FeedScreen";
import { FontStyles } from "../../shared/model";
import { Text } from "../../shared/ui";

type PropsType = {
	index: number;
	header: string;
	icon: ReactComponentElement<"svg">;
	section?: string;
	active: boolean;
	setActive: (index: number) => any;
};
export const SectionBtn: FC<PropsType> = ({
	index,
	header,
	icon,
	section,
	active,
	setActive,
}) => {
	const dispatch = useDispatch();

	const handleOnPress = () => {
		if (!active && section) {
			dispatch(setSection(section));
			dispatch(getFeedData({ section, page: 1, pageLimit: PAGE_LIMIT }));

			setActive(index);

			return;
		}
		if (!active) {
			setActive(index);
		}
	};

	return (
		<RectangleElement onPress={ handleOnPress }>
			<Wrapper>
				{icon}
				<RectangleHeader size={ 17 } fontStyle={ FontStyles.BOLD } active={ active }>{header}</RectangleHeader>
			</Wrapper>
		</RectangleElement>
	);
};

const RectangleElement = styled.TouchableOpacity`
	margin: ${scale(5)}px;
	border-radius: ${scale(6)}px;
	background-color: #f4f4f4;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	position: relative;
`;
const Wrapper = styled.View`
	flex-direction: row;
	align-items: center;
	margin: ${verticalScale(10)}px ${scale(23)}px;
`;

const RectangleHeader = styled(Text)<{ active: boolean }>`
	color: ${({ active }) => (active ? "#344CD3" : "#252525")};
	line-height: ${verticalScale(20)}px;
	margin-left: ${scale(10)}px;
`;
