import React, { FC, useState } from "react";
import styled from "styled-components/native";
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import { TerminalArrow } from "../TerminalArrow/TerminalArrow";
import { EPSChart } from "../EPSChart/EPSChart";
import { scale, verticalScale } from "../../helpers/sizeConverter";

type ItemType = {
	name: string;
	value: number | string;
};

type PropsType = {
	data: Array<ItemType>;
	title: string;
	isSearch?: boolean;
};

export const CollapseBlock: FC<PropsType> = ({ data, title, isSearch }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Collapse onToggle={ (isCollapsed: boolean) => setIsOpen(isCollapsed) }>
			<CollapseHeader>
				<CollapseItem isOpen={ isOpen } isSearch={ isSearch }>
					<CollapseItemText isSearch={ isSearch }>{title}</CollapseItemText>
					<TerminalArrow isOpen={ isOpen } />
				</CollapseItem>
			</CollapseHeader>
			<CollapseBody>
				<CollapseBodyBlock isOpen={ isOpen } isSearch={ isSearch }>
					{data.map((item, index) => (
						<CollapseItemBlock key={ index } isSearch={ isSearch } isLast={ data.length - 1 === index }>
							<CollapseItemInfo isSearch={ isSearch }>{item.name}</CollapseItemInfo>
							<CollapseItemValue isSearch={ isSearch }>{item.value}</CollapseItemValue>
						</CollapseItemBlock>
					))}
					{isSearch && <EPSChart />}
				</CollapseBodyBlock>
			</CollapseBody>
		</Collapse>
	);
};

const CollapseItem = styled.View<{ isOpen: boolean; isSearch?: boolean }>`
	${(props) =>
		props.isOpen
			? "border-top-left-radius: 6px; border-top-right-radius: 6px;"
			: "border-radius: 6px;"};
	${(props) => (props.isSearch ? "border-color: rgba(68, 68, 68, 0.2); border-width: 0.3px" : "")};
	${(props) => (props.isSearch && props.isOpen ? "border-bottom-color: #F4F4F4;" : "")};
	background-color: ${(props) => (props.isSearch ? "#F8F8F8" : "#F4F4F4")};
	padding: ${(props) => (props.isSearch ? ` ${wp("3.2%")}px` : ` ${wp("4%")}px`)};
	margin-top: ${wp("4%")}px;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

const CollapseItemText = styled.Text<{ isSearch?: boolean }>`
	font-family: ${({ isSearch }) => (isSearch ? "ProximaNova-Bold" : "ProximaNova-Semibold")};
	font-size: ${({ isSearch }) => (isSearch ? `${wp("3.7%")}px` : `${wp("4.8%")}px`)};
	color: #252525;
`;

const CollapseItemBlock = styled.View<{ isSearch?: boolean; isLast: boolean }>`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: ${wp("2.6%")}px ${wp("4%")}px;
	${({ isSearch }) =>
		isSearch ? "border-bottom-width: 0.3px;	border-bottom-color: rgba(37, 37, 37, 0.2);" : ""}
`;

const CollapseItemInfo = styled.Text<{ isSearch?: boolean }>`
	color: #000000;
	font-family: ProximaNova-Regular;
	font-size: ${({ isSearch }) => (isSearch ? `${wp("3.7%")}px` : `${wp("4.8%")}px`)};
	line-height: ${({ isSearch }) => (isSearch ? `${wp("3.73%")}px` : `${wp("5.6%")}px`)};
	font-variant: lining-nums;
`;

const CollapseItemValue = styled.Text<{ isSearch?: boolean }>`
	color: #000000;
	font-family: ProximaNova-Semibold;
	font-size: ${({ isSearch }) => (isSearch ? `${wp("3.7%")}px` : `${wp("4.8%")}px`)};
	line-height: ${({ isSearch }) => (isSearch ? `${wp("3.73%")}px` : `${wp("5.6%")}px`)};
	font-variant: lining-nums;
`;

const CollapseBodyBlock = styled.View<{ isOpen: boolean; isSearch?: boolean }>`
	background-color: ${(props) => (props.isSearch ? "#F8F8F8" : "#F4F4F4")};
	${(props) => (props.isSearch ? "border-color: rgba(68, 68, 68, 0.2); border-width: 0.3px" : "")};
	${(props) =>
		props.isSearch && props.isOpen ? "border-top-color: #F4F4F4; " : ""};
	padding-top: ${verticalScale(2)}px;
	border-bottom-left-radius: ${scale(6)}px;
	border-bottom-right-radius: ${scale(6)}px;
`;
