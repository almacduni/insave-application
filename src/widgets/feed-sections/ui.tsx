import React, { useState } from "react";
import { Col, Grid } from "react-native-easy-grid";
import styled from "styled-components/native";

import { verticalScale } from "../../helpers/sizeConverter";
import { HeartCategoryIcon } from "../../components/Icons/HeartCategoryIcon";
import { LatestIcon } from "../../components/Icons/Latest";
import { TrendingIcon } from "../../components/Icons/Trending";
import { MoreIcon } from "../../components/Icons/More";
import { SectionBtn } from "../../features/section-btn";

export const FeedSections: React.FC = () => {

	const [active, setActive] = useState(1);

	const isActive = (index: number): boolean => active === index;

	return (
		<Wrapper>
			<Grid>
				<Col>
					<SectionBtn
						index={ 1 }
						header={ "For you" }
						icon={ <HeartCategoryIcon isActive={ isActive(1) } /> }
						section="forYou"
						active={ isActive(1) }
						setActive={ setActive }
					/>
					<SectionBtn
						index={ 3 }
						header={ "Latest" }
						icon={ <LatestIcon isActive={ isActive(3) } /> }
						section="latest"
						active={ isActive(3) }
						setActive={ setActive }
					/>
				</Col>
				<Col>
					<SectionBtn
						index={ 2 }
						header={ "Trending" }
						icon={ <TrendingIcon isActive={ isActive(2) } /> }
						section="trending"
						active={ isActive(2) }
						setActive={ setActive }
					/>
					<SectionBtn
						index={ 4 }
						header={ "Portfolio" }
						icon={ <MoreIcon isActive={ isActive(4) } /> }
						active={ isActive(4) }
						setActive={ setActive }
					/>
				</Col>
			</Grid>
		</Wrapper>
	);
};

const Wrapper = styled.View`
	height: ${verticalScale(97)}px;
	margin: 12px 11px 20px 11px;
`;
