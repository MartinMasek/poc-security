import React from 'react';
import { View, Text, TextInput } from 'react-native';
import InputTemplate from './InputTemplate';
import { colors, fonts } from '../../assets/globalStyles';

export default class FreeTextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: '' };

        this._onTextChange = this._onTextChange.bind(this);
    }

    _onTextChange(text) {
        console.log(text);
    }

    render() {
        const data = this.props.data;
        return (
            <InputTemplate text={data.text}>
                <TextInput
                    style={{ height: 34, fontSize: fonts.standardFontSize, borderColor: 'gray', backgroundColor: colors.navigationUIColor, borderWidth: 1 }}
                    onChangeText={(text) => this.setState({ text })}
                    value={this.state.text}
                    autoCorrect={false}
                    onEndEditing={({ nativeEvent }) => this._onTextChange(nativeEvent.text)}
                />
            </InputTemplate>
        );
    }
}