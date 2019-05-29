import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import ProgressCircle from 'react-native-progress-circle'
import { colors } from '../../assets/globalStyles';

const PROGRESS_BG = 'white'
const PRIMARY_COLOR = colors.primaryColor;
const PRIMARY_COLOR_FADED = colors.primaryColorFaded;

export default class ProgressIndicator extends React.Component {

    render() {
        const percent = this.props.percent;
        return (
            <View>
                <View>
                    <ProgressCircle
                        percent={percent}
                        radius={this.props.radius ? this.props.radius : 13}
                        borderWidth={this.props.borderWidth ? this.props.borderWidth : 5}
                        color={this.props.color ? this.props.color : PRIMARY_COLOR}
                        shadowColor={colors.navigationUIColor}
                        bgColor={PROGRESS_BG}
                    >
                    </ProgressCircle>
                </View>
            </View >
        );
    }
}