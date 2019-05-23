import React from 'react';
import { View, Text } from 'react-native';
import { fonts } from '../../assets/globalStyles';

export default class InputTemplate extends React.Component {

    render() {
        return (
            <View style={{ marginTop: 8 }}>
                <Text style={{ fontSize: fonts.standardFontSize, marginBottom: 4 }}>{this.props.text}</Text>
                {this.props.children}
            </View>
        );
    }
}