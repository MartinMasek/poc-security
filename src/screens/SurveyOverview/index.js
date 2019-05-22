import React from 'react';
import { View, Text } from 'react-native';
import { SECTION_DETAIL } from '../../../navigation/constants';

export default class SurveyOverview extends React.Component {

    render() {
        return (
            <View>
                <Text onPress={() => this.props.navigation.navigate(SECTION_DETAIL, { id: 1 })}>Section 1</Text>
            </View>
        );
    }
}