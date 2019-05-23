import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { getSurveyData, getSectionData } from '../../services/reducers/survey';
import { STANDARD_HORIZONTAL_MARGIN, colors, fonts } from '../../assets/globalStyles';
import { renderIf } from '../../services/api/utils';
import { Q_TEXT, Q_DATE } from '../../services/constants'
import FreeTextInput from './FreeTextInput';
import DateInput from './DateInput';

export class Section extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('name', "Survey")
        }
    };

    constructor(props) {
        super(props);

        this._renderQuestion = this._renderQuestion.bind(this);
    }

    _renderQuestion(question) {
        return (
            <View style={{ marginBottom: 24 }}>
                {renderIf(question.title)(
                    <Text style={{ fontSize: fonts.standardFontSize, fontWeight: fonts.semibold }}>{question.title}</Text>
                )}
                {question.inputs.map(this._renderInput)}
            </View>
        )
    }

    _renderInput(input) {
        switch (input.type) {
            case Q_TEXT: return <FreeTextInput data={input} />
            case Q_DATE: return <DateInput data={input} />
            default: return <Text>Unrecognized input type: {input.type}</Text>
        }
    }


    render() {
        const notNumberedItems = this.props.data ? this.props.data.initialQuestions.map(input => Object.assign({}, input, { notNumbered: true })) : []
        const questions = notNumberedItems.concat(this.props.data.numberedQuestions);
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    style={{ paddingTop: 24, paddingHorizontal: STANDARD_HORIZONTAL_MARGIN }}
                    data={questions}
                    renderItem={({ item }) => this._renderQuestion(item)}
                    keyExtractor={(item, index) => index}
                />
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const surveyId = ownProps.navigation.getParam('surveyId', null);
    const sectionId = ownProps.navigation.getParam('sectionId', null);
    return {
        data: getSectionData(state, surveyId, sectionId)
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Section)