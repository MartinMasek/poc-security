import React from 'react';
import { View, Text, FlatList, TouchableHighlight } from 'react-native';
import { SECTION_DETAIL } from '../../../navigation/constants';
import { connect } from 'react-redux';
import { getSurveySections } from '../../services/reducers/survey';
import { colors, STANDARD_HORIZONTAL_MARGIN, fonts } from '../../assets/globalStyles';
import { renderIf } from '../../services/api/utils';

export class SurveyOverview extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('name', "Survey")
        }
    };

    constructor(props) {
        super(props);

        this._renderArea = this._renderArea.bind(this);
        this._renderSections = this._renderSections.bind(this);
    }

    componentDidMount() {
        // this.props.navigation.navigate(SECTION_DETAIL,
        //     { surveyId: this.props.survey.id, sectionId: "458b7aec-4494-4f86-b0a1-b8ea79399c2b" });
    }

    _renderArea(item, index) {
        return (
            <View style={{ marginBottom: 44 }}>
                <Text style={{ fontSize: 22, marginBottom: 8, fontWeight: '500' }}>{item.area}</Text>
                {this._renderSections(item.sections)}
                {renderIf(index == this.props.survey.data.length - 1)(
                    <View style={{ height: 40 }} />
                )}
            </View>
        );
    }

    _renderProgressText(data) {
        const completed = data.completedQuestions;
        const total = data.totalQuestions;
        if (total == completed) {
            return (<Text style={{ fontSize: fonts.miniFont, color: "#659D68" }}>Completed</Text>);
        }
        if (completed != 0) {
            return (<Text style={{ fontSize: fonts.miniFont, color: colors.primaryColor }}>In progress {Math.ceil(completed/total*100)}%</Text>);
        }
        return (<Text style={{ fontSize: fonts.miniFont, color: 'lightgray' }}>Not started</Text>);
    }

    _renderSections(sections) {
        return sections.map((s, index) => {
            return (
                <TouchableHighlight onPress={() => this.props.navigation.navigate(SECTION_DETAIL,
                    { surveyId: this.props.survey.id, sectionId: s.id, name: s.code + " " + s.name })}
                    underlayColor={colors.buttonLightPressedAreaColor}
                    key={s.id}>
                    <View>
                        <View key={s.id}
                            style={{
                                minHeight: 45, alignItems: 'center', flexDirection: 'row',
                                borderTopWidth: index == 0 ? 1 : 0,
                                borderLeftWidth: 1, borderRightWidth: 1,
                                borderColor: colors.navigationUIColor,
                                paddingVertical: 4
                            }}>
                            <View style={{ width: 40, paddingLeft: 4 }}>
                                <Text style={{ fontSize: 17 }}>{s.code}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: fonts.standardFontSize }}>{s.name}</Text>
                            </View>
                        </View>
                        <View style={{
                            borderBottomWidth: 1,
                            borderLeftWidth: 1, borderRightWidth: 1,
                            borderColor: colors.navigationUIColor,
                            paddingLeft: 40
                        }}>
                            {this._renderProgressText(s)}
                        </View>
                    </View>
                </TouchableHighlight>
            );
        }
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    style={{ paddingTop: 24, paddingHorizontal: STANDARD_HORIZONTAL_MARGIN }}
                    data={this.props.survey.data}
                    renderItem={({ item, index }) => this._renderArea(item, index)}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.navigation.getParam('id', null);
    return {
        survey: getSurveySections(state, id)
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyOverview)