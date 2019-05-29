import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { colors, STANDARD_HORIZONTAL_MARGIN } from '../../assets/globalStyles';

export default class BigButton extends React.Component {

    render() {
        return (
            <TouchableHighlight onPress={this.props.onPress}
                underlayColor={colors.buttonLightPressedAreaColor}>
                <View
                    style={[{
                        height: 44, alignItems: 'center', justifyContent: 'center',
                        borderRadius: 5,
                        backgroundColor: colors.primaryColor,
                        marginHorizontal: STANDARD_HORIZONTAL_MARGIN
                    },this.props.style]}>
                    <Text style={{ fontSize: 18, color: 'white', fontWeight: '500' }}>{this.props.title}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}