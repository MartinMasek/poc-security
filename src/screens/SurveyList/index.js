import React from 'react';
import { View, Text, FlatList, TouchableHighlight, ActivityIndicator, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { SURVEY_OVERVIEW, SETTINGS } from '../../../navigation/constants';
import { getSurveyList } from '../../services/reducers/survey';
import { STANDARD_HORIZONTAL_MARGIN, colors, fonts } from '../../assets/globalStyles';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { fetchSurveys } from '../../services/actions/survey';
import ProgressIndicator from '../shared/ProgressIndicator';
import AvatarImage from './AvatarImage';
import { renderIf } from '../../services/api/utils';

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
        this._fetchSurveys = this._fetchSurveys.bind(this);

        this.state = { fetchingSurveys: false };
    }

    async componentDidMount() {
        // this.props.navigation.navigate(SURVEY_OVERVIEW, { id: "1" })
        // this.props.navigation.navigate(SETTINGS, { id: "c63d7d11-734c-4a3f-a480-cde8d867209c" })
        await this._fetchSurveys();
    }

    async _fetchSurveys() {
        try {
            this.setState({ fetchingSurveys: true })
            await this.props.fetchSurveys();
            this.setState({ fetchingSurveys: false })
        }
        catch (error) {
            alert(error);
        }
    }

    _renderItem(item) {
        return (
            <TouchableHighlight onPress={() => this.props.navigation.navigate(SURVEY_OVERVIEW, { id: item.id, name: item.name })}
                underlayColor={colors.buttonLightPressedAreaColor} key={item.id}
                style={{ marginBottom: 48 }}>
                <View key={item.id}
                    style={{
                        paddingHorizontal: STANDARD_HORIZONTAL_MARGIN,
                        paddingVertical: 8,
                        borderColor: colors.navigationUIColor,
                        borderBottomWidth: 1,
                        borderTopWidth: 1,
                        alignItems: 'center',
                        flexDirection: 'row'
                    }}>
                    <View style={{ flex: 1 }}>
                        <View
                            style={{
                                marginBottom: 12,
                            }}>
                            <Text style={{ fontSize: 17, fontWeight: fonts.semibold }}>{item.name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ alignItems: 'center', marginTop: 4, width: 120 }}>
                                <ProgressIndicator percent={item.progress} radius={31} borderWidth={13} color={item.progress == 100 ? colors.successColor : undefined} />
                                <Text style={{ color: 'gray', marginTop: 4, fontSize: fonts.miniFont }}>
                                    {item.progress}% completed
                                </Text>
                            </View>
                            {renderIf(item.id == 1)(
                                <View style={{ marginTop: 0, width: 120, marginLeft: 24 }}>
                                    <Text style={{ color: 'gray', fontSize: fonts.miniFont, marginBottom: 4 }}>Assigned to:</Text>
                                    <View style={{ marginLeft: 12 }}>
                                        <AvatarImage id={1} imageUri="../../../assets/images/rachel.png" />
                                    </View>
                                    <Text style={{ color: 'gray', marginTop: 4, fontSize: fonts.miniFont }}>
                                        Rachel Davis
                                    </Text>
                                </View>
                            )}
                            {renderIf(item.id == 2)(
                                <View style={{ marginTop: 0, width: 120, marginLeft: 24 }}>
                                    <Text style={{ color: 'gray', fontSize: fonts.miniFont, marginBottom: 4 }}>Assigned to:</Text>
                                    <View style={{ marginLeft: 12 }}>
                                        <AvatarImage id={2} imageUri="../../../assets/images/rachel.png" />
                                    </View>
                                    <Text style={{ color: 'gray', marginTop: 4, fontSize: fonts.miniFont }}>
                                        Sharat Karra
                                    </Text>
                                </View>
                            )}
                            {renderIf(item.id == 3)(
                                <View style={{ marginTop: 0, width: 120, marginLeft: 24 }}>
                                    <Text style={{ color: 'gray', fontSize: fonts.miniFont, marginBottom: 4 }}>Assigned to:</Text>
                                    <View style={{ marginLeft: 12 }}>
                                        <AvatarImage id={3} imageUri="../../../assets/images/rachel.png" />
                                    </View>
                                    <Text style={{ color: 'gray', marginTop: 4, fontSize: fonts.miniFont }}>
                                    Rajaram Mohanraj
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>
                    <View>
                        <Entypo name="chevron-small-right" size={32} style={{ color: 'gray', marginTop: 5 }} />
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    style={{ paddingTop: 24 }}
                    data={this.props.surveyList}
                    renderItem={({ item }) => this._renderItem(item)}
                    keyExtractor={(item) => item.id}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.fetchingSurveys}
                            onRefresh={this._fetchSurveys}
                            tintColor={colors.primaryColor}
                            titleColor={colors.primaryColor}
                            colors={[colors.primaryColor]}
                        />
                    }
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
        fetchSurveys: () => dispatch(fetchSurveys())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyList)