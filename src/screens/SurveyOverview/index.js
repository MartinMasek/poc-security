import React from 'react';
import { View, Text, FlatList, TouchableHighlight } from 'react-native';
import { SECTION_DETAIL } from '../../../navigation/constants';
import { connect } from 'react-redux';
import { getSurveySections } from '../../services/reducers/survey';
import { colors, STANDARD_HORIZONTAL_MARGIN } from '../../assets/globalStyles';

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

    _renderArea(item) {
        return (
            <View style={{ marginTop: 24 }}>
                <Text style={{ fontSize: 22, fontWeight: '500' }}>{item.area}</Text>
                {this._renderSections(item.sections)}
            </View>
        );
    }

    _renderSections(sections) {
        return sections.map((s, index) => {
            return (
                <TouchableHighlight onPress={() => this.props.navigation.navigate(SECTION_DETAIL,
                    { surveyId: this.props.survey.id, sectionId: s.id, name: s.code + " " + s.name })}
                    underlayColor={colors.buttonLightPressedAreaColor}>
                    <View style={{
                        height: 60, alignItems: 'center', flexDirection: 'row',
                        borderTopWidth: index == 0 ? 1 : 0,
                        borderLeftWidth: 1, borderRightWidth: 1,
                        borderBottomWidth: 1, borderColor: colors.navigationUIColor
                    }}>
                        <Text style={{ fontSize: 17 }}>{s.code} {s.name}</Text>
                    </View>
                </TouchableHighlight>
            );
        }
        );
    }

    render() {
        return (
            <View style={{ flex: 1, paddingHorizontal: STANDARD_HORIZONTAL_MARGIN }}>
                <FlatList
                    style={{ paddingTop: 24 }}
                    data={this.props.survey.data}
                    renderItem={({ item }) => this._renderArea(item)}
                    keyExtractor={(item, index) => index}
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