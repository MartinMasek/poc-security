import React from 'react';
import { View, Text, TextInput } from 'react-native';
import InputTemplate from './InputTemplate';
import { colors, fonts, INPUT_HEIGHT } from '../../assets/globalStyles';

export default class FreeTextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: props.data.value };
        this._onTextChange = this._onTextChange.bind(this);
    }

    _onTextChange(text) {
        // This is user clicking to the form and away without changing anything
        if (this.props.data.value == text) return;
        // Empty form and user is just clicking around
        if (this.props.data.value == null && text == '') return;
        this.props.updateInput(this.props.questionIndex, this.props.data.id, text);
    }

    render() {
        const data = this.props.data;
        return (
            <InputTemplate text={data.text}>
                <TextInput
                    style={{
                        height: INPUT_HEIGHT,
                        fontSize: fonts.standardFontSize,
                        borderColor: 'gray',
                        backgroundColor: colors.navigationUIColor,
                        borderWidth: 1,
                        borderRadius: 5,
                        paddingLeft: 4
                    }}
                    onChangeText={(text) => this.setState({ text })}
                    value={this.state.text}
                    autoCorrect={false}
                    onEndEditing={({ nativeEvent }) => this._onTextChange(nativeEvent.text)}
                />
            </InputTemplate>
        );
    }
}