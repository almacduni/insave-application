import * as React from "react";
import styled from "styled-components/native";

import { scale, verticalScale } from "../../../helpers/sizeConverter";
import { FontStyles } from "../../model";
import { Text } from "../Text";

interface ExplanationBoxProps {
	title: string;
	description: string;
	sizes?: {
		title?: {
			fontSize: number;
			lineHeight: number;
			marginBottom?: number;
		};
		description?: {
			fontSize: number;
			lineHeight: number
		}
	}
}

const defaultSizes = {
	title: {
		fontSize: 21,
		lineHeight: 28,
		marginBottom: 10,
	},
	description: {
		fontSize: 14,
		lineHeight: 20,
	}
};

export const ExplanationBox = (props: ExplanationBoxProps) => {
	const { title, description } = props;

	const titleSize = React.useMemo(() => ({
		...defaultSizes.title,
		...(props?.sizes?.title || {}),
	}), [props?.sizes?.title]);

	const descriptionSize = React.useMemo(() => ({
		...defaultSizes.description,
		...(props?.sizes?.description || {}),
	}), [props?.sizes?.description]);

	return (
		<>
			<Title
				size={ titleSize.fontSize }
				lineHeight={ titleSize.lineHeight }
				marginBottom={ titleSize.marginBottom }
				fontStyle={ FontStyles.BOLD }
			>
				{title}
			</Title>
			{
				description.split("\n").filter((row) => !!row.trim()).map((row) => (
					<Description key={ row } lineHeight={ descriptionSize.lineHeight }>
						{row.trim()}
					</Description>
				))
			}
		</>
	);
};

const DefaultText = styled(Text)<{ lineHeight: number }>`
	line-height: ${({ lineHeight }) => scale(lineHeight)}px;
	text-align: center;
`;

const Title = styled(DefaultText)<{ marginBottom: number }>`
	margin-bottom: ${({ marginBottom }) => verticalScale(marginBottom)}px;
	color: rgba(3, 6, 29, 1);
`;

const Description = styled(DefaultText)`
	letter-spacing: ${scale(0.5)}px;
`;
