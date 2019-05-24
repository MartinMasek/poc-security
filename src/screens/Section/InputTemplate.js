import React from 'react';
import { View, Text } from 'react-native';
import { fonts, INPUT_TITLE_BOTTOM_MARGIN, INPUT_TOP_MARGIN } from '../../assets/globalStyles';
import { renderIf } from '../../services/api/utils';

export default class InputTemplate extends React.Component {

    render() {
        return (
            <View style={{ marginTop: INPUT_TOP_MARGIN }}>
                {renderIf(this.props.text && this.props.text != '')(
                    <Text style={{ fontSize: fonts.standardFontSize, marginBottom: INPUT_TITLE_BOTTOM_MARGIN }}>{this.props.text}</Text>
                )}
                {this.props.children}
            </View>
        );
    }
}