import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import InputTemplate from './InputTemplate';
import { INPUT_HEIGHT, fonts } from '../../assets/globalStyles';
import { renderIf } from '../../services/api/utils';

export default class Multiselect extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = { selected: new Array(props.data.options ? props.data.options.length : 0) }
        if (props.data.options && props.data.options.length > 0 && props.data.value !== null) {
            for (let i = 0; i < props.data.options.length; i++) {
                this.state.selected[i] = props.data.value.some(x => x == props.data.options[i]);
            }
        }
        this._onPress = this._onPress.bind(this);
        this._isSelected = this._isSelected.bind(this);
    }

    _onPress(index) {
        const newValue = [...this.state.selected];
        newValue[index] = !newValue[index];
        this.setState({ selected: newValue });
        const options = this.props.data.options ? this.props.data.options : [];
        const selectedInputs = [];
        for (let i = 0; i < options.length; i++) {
            if (newValue[i]) selectedInputs.push(options[i]);
        } 
        this.props.updateInput(this.props.questionIndex, this.props.data.id, selectedInputs);
    }

    _isSelected(value) {
        if (this.props.value == null) return false;
        return this.props.value.some(x => x == value);
    }

    _renderOptions(options) {
        if (!options) return null;
        return options.map((o, index) => {
            return (
                <TouchableWithoutFeedback onPress={() => this._onPress(index)}>
                    <View key={o} style={{
                        height: INPUT_HEIGHT + 8,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <View style={{ width: 24 }}>
                            {renderIf(this.state.selected[index])(<Ionicons name="md-checkbox" size={28} color="gray" />)}
                            {renderIf(!this.state.selected[index])(<Ionicons name="ios-square-outline" size={32} color="gray" />)}
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