import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { colors, fonts, INPUT_HEIGHT, INPUT_TOP_MARGIN, INPUT_TITLE_BOTTOM_MARGIN } from '../../assets/globalStyles';
import { renderIf } from '../../services/api/utils';
import { renderInput } from '.';

export default class YesNoInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: props.data.value };
        this._onSelect = this._onSelect.bind(this);
    }

    _onSelect(isYes) {
        // This is user clicking to the form and away without changing anything
        if (this.props.data.value == isYes) return;
        this.props.updateInput(this.props.questionIndex, this.props.data.id, isYes);
    }

    _renderConditionalInput(data) {
        if (!data) return null;
        return renderInput(data, this.props.questionIndex, this.props.updateInput);
    }

    render() {
        const data = this.props.data;
        return (
            <View>
                <View style={{ flexDirection: "row", alignItems: 'center', marginTop: INPUT_TOP_MARGIN }}>
                    <View style={{ flex: 4, paddingRight: 12 }}>
                        <Text style={{ fontSize: fonts.standardFontSize, marginBottom: INPUT_TITLE_BOTTOM_MARGIN }}>{data.text}</Text>
                    </View>
                    <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginVertical: 4 }}>
                        <TouchableHighlight
                            onPress={() => this._onSelect(true)}
                            underlayColor="#F6F5ED"
                            disabled={data.value}
                            style={[styles.button, data.value ? styles.selected : styles.notSelected]}>
                            <Text style={{ fontSize: fonts.standardFontSize, color: data.value == null ? 'black' : data.value == true ? 'white' : 'gray' }}>YES</Text>
                        </TouchableHighlight>

                        <TouchableHighlight style={[styles.button, data.value == false ? styles.selected : styles.notSelected]}
                            onPress={() => this._onSelect(false)}
                            disabled={data.value == false}
                            underlayColor="#F6F5ED">
                            <Text style={{ fontSize: fonts.standardFontSize, color: data.value == null ? 'black' : data.value == false ? 'white' : 'gray' }}>NO</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                {renderIf(data.conditional && data.value == data.conditionValue)(
                    <View style={{ marginTop: INPUT_TOP_MARGIN }}>
                        {this._renderConditionalInput(data.conditionalInput)}
                    </View>)}
            </View>
        );
    }
}

styles = StyleSheet.create({
    button: {
        width: 64,
        height: INPUT_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: INPUT_HEIGHT / 2
    },
    selected: {
        backgroundColor: 'gray'
    },
    notSelected: {
    }
})