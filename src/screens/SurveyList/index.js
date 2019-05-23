import React from 'react';
import { View, Text, FlatList, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { SURVEY_OVERVIEW } from '../../../navigation/constants';
import { getSurveyList } from '../../services/reducers/survey';
import { STANDARD_HORIZONTAL_MARGIN, colors } from '../../assets/globalStyles';

export class SurveyList extends React.Component {
    static navigationOptions = {
        title: 'Surveys',
        headerLeft: null,
        headerRight: null
    };

    constructor(props) {
        super(props);
        this._renderItem = this._renderItem.bind(this);
    }

    componentDidMount() {
        this.props.navigation.navigate(SURVEY_OVERVIEW, { id: "c63d7d11-734c-4a3f-a480-cde8d867209c" })
    }

    _renderItem(item) {
        return (
            <TouchableHighlight onPress={() => this.props.navigation.navigate(SURVEY_OVERVIEW, { id: item.id, name: item.name })}
                underlayColor={colors.buttonLightPressedAreaColor}>
                <View style={{
                    height: 60, alignItems: 'center', flexDirection: 'row',
                    paddingHorizontal: STANDARD_HORIZONTAL_MARGIN,
                    borderColor: colors.navigationUIColor,
                    borderBottomWidth: 1,
                    borderTopWidth: 1
                }}>
                    <Text style={{ fontSize: 17 }}>{item.name}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text style={{marginHorizontal:STANDARD_HORIZONTAL_MARGIN}}>NOTE: We can directly redirect the user to the survey if they have only 1</Text>
                <FlatList
                    style={{ paddingTop: 24 }}
                    data={this.props.surveyList}
                    renderItem={({ item }) => this._renderItem(item)}
                    keyExtractor={(item) => item.id}
                />
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        surveyList: getSurveyList(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyList)