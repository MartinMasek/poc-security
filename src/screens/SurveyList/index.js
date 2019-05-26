import React from 'react';
import { View, Text, FlatList, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { SURVEY_OVERVIEW, SETTINGS } from '../../../navigation/constants';
import { getSurveyList } from '../../services/reducers/survey';
import { STANDARD_HORIZONTAL_MARGIN, colors } from '../../assets/globalStyles';
import { Ionicons, Entypo } from '@expo/vector-icons';

export class SurveyList extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Surveys',
            // We have to do this so we have nice center alignment on Android
            headerLeft: (
                <TouchableHighlight
                    style={{
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                        color: 'transparent',
                        marginLeft: STANDARD_HORIZONTAL_MARGIN,
                        marginTop: 4
                    }}
                    disabled={true}
                >
                    <Ionicons name="md-settings" style={{ color: 'transparent' }} size={28} />
                </TouchableHighlight>
            ),
            headerRight: (
                <TouchableHighlight
                    style={{
                        alignItems: 'center',
                        backgroundColor: 'rgba(52, 52, 52, 0.0)',
                        marginRight: STANDARD_HORIZONTAL_MARGIN,
                        marginTop: 4
                    }}
                    onPress={() => navigation.navigate(SETTINGS)}
                    underlayColor='rgba(52, 52, 52, 0.0)'
                >
                    <Ionicons name="md-settings" style={{ color: colors.primaryColor }} size={28} />
                </TouchableHighlight>
            ),
        }
    };

    constructor(props) {
        super(props);
        this._renderItem = this._renderItem.bind(this);
    }

    componentDidMount() {
        // this.props.navigation.navigate(SURVEY_OVERVIEW, { id: "c63d7d11-734c-4a3f-a480-cde8d867209c" })
        // this.props.navigation.navigate(SETTINGS, { id: "c63d7d11-734c-4a3f-a480-cde8d867209c" })
    }

    _renderItem(item) {
        return (
            <TouchableHighlight onPress={() => this.props.navigation.navigate(SURVEY_OVERVIEW, { id: item.id, name: item.name })}
                underlayColor={colors.buttonLightPressedAreaColor} key={item.id}>
                <View key={item.id}
                    style={{
                        height: 60, alignItems: 'center', flexDirection: 'row',
                        paddingHorizontal: STANDARD_HORIZONTAL_MARGIN,
                        borderColor: colors.navigationUIColor,
                        borderBottomWidth: 1,
                        borderTopWidth: 1,
                    }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 17 }}>{item.name}</Text>
                    </View>
                    <View>
                        <Entypo name="chevron-small-right" size={28} style={{ color: 'gray', marginTop: 5 }} />
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text style={{ marginHorizontal: STANDARD_HORIZONTAL_MARGIN }}>NOTE: We can directly redirect the user to the survey if they have only 1</Text>
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