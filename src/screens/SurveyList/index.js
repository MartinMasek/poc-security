import React from 'react';
import { View, Text } from 'react-native';
import { SURVEY_OVERVIEW } from '../../../navigation/constants';

export default class SurveyList extends React.Component {

    render() {
        return (
            <View>
                <Text onPress={() => this.props.navigation.navigate(SURVEY_OVERVIEW, { id: 1 })}>Survey 1</Text>
            </View>
        );
    }
}