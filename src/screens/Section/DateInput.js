import React from 'react';
import { View, Text } from 'react-native';
import DatePicker from 'react-native-datepicker'
import { INPUT_HEIGHT, colors, fonts, INPUT_TITLE_BOTTOM_MARGIN, INPUT_TOP_MARGIN } from '../../assets/globalStyles';

export default class DateInput extends React.Component {
    constructor(props) {
        super(props);

        this._onDateChange = this._onDateChange.bind(this);
    }

    _onDateChange(date) {
        this.props.updateInput(this.props.questionIndex, this.props.data.id, date);

    }

    render() {
        const data = this.props.data;
        return (
            <View style={{ flexDirection: "row", alignItems: 'center', marginTop: INPUT_TOP_MARGIN }}>
                <View style={{ flex: 3 }}>
                    <Text style={{ fontSize: fonts.standardFontSize, marginBottom: INPUT_TITLE_BOTTOM_MARGIN }}>{data.text}</Text>
                </View>
                <DatePicker
                    style={{ flex: 2 }}
                    date={data.value}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    showIcon={false}
                    customStyles={{
                        dateInput: {
                            height: INPUT_HEIGHT,
                            backgroundColor: colors.navigationUIColor,
                            borderColor: 'gray',
                            color: 'black',
                            borderRadius: 5,
                            paddingLeft: 4,
                        },
                        dateText: {
                            fontSize: fonts.standardFontSize,
                            color: 'black'
                        },
                        btnTextConfirm: {
                            color: colors.primaryColor,
                        }
                    }}
                    onDateChange={this._onDateChange}
                />
            </View>
        );
    }
}