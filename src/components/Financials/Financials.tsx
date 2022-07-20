import React, { FC, useState } from "react";
import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import moment from "moment";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import { sizeConverter } from "../../helpers/sizeConverter";
import { TerminalArrow } from "../TerminalArrow/TerminalArrow";
import { FinancialsItemType } from "../../types/commonTypes";
import { convertBigNumber } from "../../helpers/convertBigNumber";
import { adjustHelper } from "../../helpers/adjustHelper";

type PropsType = {
	data: Array<FinancialsItemType>;
};

export const Financials: FC<PropsType> = ({ data }) => {
	const [isOpen, setIsOpen] = useState(false);
	const date = data[0]?.date
		? moment(data[0].date).format("MMM YYYY")
		: moment().format("MMM YYYY");

	const numberHelper = (input: number | null) => (
		<TableNumber positive={ input !== null && input > 0 } isZero={ !input }>
			{!input
				? "-"
				: `${(input > 0 ? "+" : "") + input}${
					Math.floor(input.toString().length) >= 3 ? "K" : ""
				} %`}
		</TableNumber>
	);

	return (
		<Collapse onToggle={ (isCollapsed: boolean) => setIsOpen(isCollapsed) }>
			<CollapseHeader>
				<CollapseItem isOpen={ isOpen }>
					<CollapseItemText>Financials</CollapseItemText>
					<TerminalArrow isOpen={ isOpen } />
				</CollapseItem>
			</CollapseHeader>
			<CollapseBody>
				<CollapseBodyBlock isOpen={ isOpen }>
					<Grid>
						<Row style={ { paddingVertical: 7 } }>
							<Col size={ 42 }>
								<TableText firstItem>{date}</TableText>
							</Col>
							<Col size={ 20 }>
								<TableText>(USD)</TableText>
							</Col>
							<Col size={ 20 }>
								<TableText>Q/Q</TableText>
							</Col>
							<Col size={ 20 }>
								<TableText>Y/Y</TableText>
							</Col>
						</Row>
						{data?.map((item, index) => (
							<Row style={ styles.tableRow } key={ index }>
								<Col size={ 42 }>
									<TableText firstItem>
										{item.title === "Stockholders equity" ? "Total equity" : item.title}
									</TableText>
								</Col>
								<Col size={ 20 }>
									<TableText price>{convertBigNumber(item.current)}</TableText>
								</Col>
								<Col size={ 20 }>{numberHelper(item.qq)}</Col>
								<Col size={ 20 }>{numberHelper(item.yy)}</Col>
							</Row>
						))}
					</Grid>
				</CollapseBodyBlock>
			</CollapseBody>
		</Collapse>
	);
};
const styles = StyleSheet.create({
	tableRow: {
		paddingVertical: wp("1.86%"),
		borderTopWidth: adjustHelper(0.3),
		borderTopColor: "rgba(68, 68, 68, 0.2)",
	},
});

const CollapseItem = styled.View<{ isOpen: boolean; isSearch?: boolean }>`
	${({ isOpen }) =>
		isOpen
			? `border-top-left-radius:  ${adjustHelper(6)}px; border-top-right-radius:  ${adjustHelper(
				6,
			)}px;`
			: `border-radius:  ${adjustHelper(6)}px;`};
	border-color: rgba(68, 68, 68, 0.2);
	border-width: ${adjustHelper(0.3)}px;
	${({ isOpen }) => (isOpen ? "border-bottom-color: #F4F4F4;" : "")};
	background-color: #f8f8f8;
	padding: ${wp("3.2%")}px;
	margin-top: ${wp("4%")}px;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

const CollapseItemText = styled.Text`
	font-family: ProximaNova-Bold;
	font-size: ${wp("3.7%")}px;
	color: #252525;
`;

const CollapseBodyBlock = styled.View<{ isOpen: boolean; isSearch?: boolean }>`
	background-color: #f8f8f8;
	border-color: rgba(68, 68, 68, 0.2);
	border-width: ${adjustHelper(0.3)}px;
	${(props) => (props.isOpen ? `border-top-color: #F4F4F4; margin-bottom:  ${wp("5.3%")}px;` : "")};

	border-bottom-left-radius: ${adjustHelper(6)}px;
	border-bottom-right-radius: ${adjustHelper(6)}px;
`;

const TableText = styled.Text<{ firstItem?: boolean; price?: boolean }>`
	${({ firstItem }) => (firstItem ? "padding-left: 12px" : "text-align: center;")}
	${({ price }) =>
		price ? "font-family: ProximaNova-Semibold" : "font-family: ProximaNova-Regular;"}
	font-style: normal;
	font-weight: 600;
	font-size: ${sizeConverter(14)}px;
	line-height: ${sizeConverter(16)}px;
	letter-spacing: ${sizeConverter(0.4)}px;
	font-variant: lining-nums;
`;

const TableNumber = styled.Text<{ positive?: boolean; isZero?: boolean }>`
	font-family: ProximaNova-Regular;
	font-style: normal;
	font-weight: normal;
	text-align: center;
	/* FIXME: */
	color: ${({ positive, isZero }) => (isZero ? "#252525" : positive ? "#0C7D5A" : "#E30502")};
	font-size: ${sizeConverter(13)}px;
	font-variant: lining-nums;
`;
