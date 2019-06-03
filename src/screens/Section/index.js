import React from 'react';
import { View, Text, FlatList, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { getSectionData } from '../../services/reducers/survey';
import { STANDARD_HORIZONTAL_MARGIN, colors, fonts } from '../../assets/globalStyles';
import { renderIf } from '../../services/api/utils';
import { Q_TEXT, Q_DATE, Q_YES_NO, Q_SINGLE_SELECT, Q_MULTI_SELECT } from '../../services/constants'
import FreeTextInput from './FreeTextInput';
import DateInput from './DateInput';
import { updateInput } from '../../services/actions/survey';
import YesNoInput from './YesNoInput';
import SingleChoiceInput from './SingleChoiceInput';
import SectionProgress from './SectionProgress';
import Multiselect from './Multiselect';

export class Section extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const surveyId = navigation.getParam('surveyId', null);
        const sectionId = navigation.getParam('sectionId', null);
        return {
            title: navigation.getParam('name', "Survey"),
            headerRight: (
                <SectionProgress surveyId={surveyId} sectionId={sectionId} />
            ),
        }
    };

    constructor(props) {
        super(props);

        this._renderQuestion = this._renderQuestion.bind(this);
        this._updateInput = this._updateInput.bind(this);
    }

    _renderQuestion(question, index) {
        return (
            <View key={`q_${index}`} style={{ marginBottom: 32 }}>
                {renderIf(question.title)(
                    <Text style={{ fontSize: fonts.standardFontSize, fontWeight: fonts.semibold }}>{question.title}</Text>
                )}
                {question.inputs.map(input => renderInput(input, index, this._updateInput))}
                {renderIf(index == this.props.data.questions.length - 1)(
                    <View style={{ height: 80 }} />
                )}
            </View>
        )
    }

    async _updateInput(questionIndex, inputId, value) {
        await this.props.updateInput(this.props.surveyId, this.props.sectionId, questionIndex, inputId, value);
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding"
                style={{ flex: 1 }}>
                {renderIf(this.props.data.lastModification)(
                    <Text style={{ marginBottom: 8, marginHorizontal: STANDARD_HORIZONTAL_MARGIN, color: colors.textSecondaryColor }}>Last modified time: {new Date(this.props.data.lastModification).toLocaleString()}</Text>
                )}
                <FlatList
                    style={{ paddingTop: 24, paddingHorizontal: STANDARD_HORIZONTAL_MARGIN }}
                    extraData={this.props.data.lastModification}
                    data={this.props.data.questions}
                    renderItem={({ item, index }) => this._renderQuestion(item, index)}
                    keyExtractor={(item, index) => index.toString()}
                />
            </KeyboardAvoidingView>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const surveyId = ownProps.navigation.getParam('surveyId', null);
    const sectionId = ownProps.navigation.getParam('sectionId', null);
    return {
        data: getSectionData(state, surveyId, sectionId),
        surveyId,
        sectionId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateInput: (surveyId, sectionId, questionIndex, inputId, value) => dispatch(updateInput(surveyId, sectionId, questionIndex, inputId, value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Section)

export const renderInput = (input, questionIndex, updateInputFunction) => {
    switch (input.type) {
        case Q_TEXT: return <FreeTextInput key={input.id} data={input} questionIndex={questionIndex} updateInput={updateInputFunction} />
        case Q_YES_NO: return <YesNoInput key={input.id} data={input} questionIndex={questionIndex} updateInput={updateInputFunction} />
        case Q_SINGLE_SELECT: return <SingleChoiceInput key={input.id} data={input} questionIndex={questionIndex} updateInput={updateInputFunction} />
        case Q_MULTI_SELECT: return <Multiselect key={input.id} data={input} questionIndex={questionIndex} updateInput={updateInputFunction} />
        case Q_DATE: return <DateInput key={input.id} data={input} questionIndex={questionIndex} updateInput={updateInputFunction} />
        default: return <Text>Unrecognized input type: {input.type}</Text>
    }
}