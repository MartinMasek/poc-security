import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import InputTemplate from './InputTemplate';
import { INPUT_HEIGHT, fonts } from '../../assets/globalStyles';
import { renderIf } from '../../services/api/utils';

export default class SingleChoiceInput extends React.Component {
    constructor(props) {
        super(props);

        this._onPress = this._onPress.bind(this);
    }

    _onPress(index) {
        this.props.updateInput(this.props.questionIndex, this.props.data.id, this.props.data.options[index]);
    }

    _renderOptions(options) {
        return options.map((o, index) => {
            return (
                <TouchableWithoutFeedback onPress={() => this._onPress(index)}>
                    <View key={o} style={{
                        height: INPUT_HEIGHT + 8,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <View>
                            {renderIf(this.props.data.value!=o)(<Ionicons name="md-radio-button-off" size={28} color="gray" />)}
                            {renderIf(this.props.data.value==o)(<Ionicons name="md-radio-button-on" size={28} color="gray" />)}
                        </View>
                        <View style={{ marginLeft: 8 }}>
                            <Text style={{ fontSize: fonts.standardFontSize }}>{o}</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            );
        })
    }

    render() {
        const data = this.props.data;
        return (
            <InputTemplate text={data.text}>
                <View style={{ marginLeft: 8, marginTop: 8 }}>
                    {this._renderOptions(data.options)}
                </View>
            </InputTemplate>
        );
    }
}