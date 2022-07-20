import React from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";

import { HEIGHT } from "../../constants/sizes";
import BackIcon from "../../assets/backArrowIconWhite.svg";

export class ImageGallery extends React.Component<{ route: any; navigation: any }> {
	render () {
		return (
			<>
				<StatusBar backgroundColor={ "#000" } barStyle={ "light-content" } />
				<View
					style={ {
						height: HEIGHT,
						paddingBottom: 10,
						backgroundColor: "#000",
					} }
				>
					<View
						style={ {
							height: 50,
							paddingLeft: 16,
							paddingTop: 10,
						} }
					>
						<TouchableOpacity
							style={ {
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
							} }
							onPress={ () => this.props.navigation.goBack() }
						>
							<BackIcon />
							<Text
								style={ {
									fontFamily: "ProximaNova-Regular",
									color: "#fff",
								} }
							>
								Back
							</Text>
						</TouchableOpacity>
					</View>
					<ImageViewer
						renderIndicator={ () => <></> }
						imageUrls={ this.props.route.params.params.images }
						enableSwipeDown
						onSwipeDown={ () => this.props.navigation.goBack() }
					/>
				</View>
			</>
		);
	}
}
