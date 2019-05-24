import React from 'react';
import { View, Text, FlatList, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { getSectionData } from '../../services/reducers/survey';
import { STANDARD_HORIZONTAL_MARGIN, colors, fonts } from '../../assets/globalStyles';
import { renderIf } from '../../services/api/utils';
import { Q_TEXT, Q_DATE, Q_YES_NO } from '../../services/constants'
import FreeTextInput from './FreeTextInput';
import DateInput from './DateInput';
import { updateInput } from '../../services/actions/survey';
import YesNoInput from './YesNoInput';

export class Section extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('name', "Survey")
        }
    };

    constructor(props) {
        super(props);

        this._renderQuestion = this._renderQuestion.bind(this);
        this._renderInput = this._renderInput.bind(this);
        this._updateInput = this._updateInput.bind(this);
    }

    _renderQuestion(question, index) {
        return (
            <View key={`q_${index}`} style={{ marginBottom: 24 }}>
                {renderIf(question.title)(
                    <Text style={{ fontSize: fonts.standardFontSize, fontWeight: fonts.semibold }}>{question.title}</Text>
                )}
                {question.inputs.map(input => this._renderInput(input, index))}
                {renderIf(index == this.props.data.questions.length - 1)(
                    <View style={{ height: 80 }} />
                )}
            </View>
        )
    }

    _renderInput(input, index) {
        switch (input.type) {
            case Q_TEXT: return <FreeTextInput key={input.id} data={input} questionIndex={index} updateInput={this._updateInput} />
            case Q_YES_NO: return <YesNoInput key={input.id} data={input} questionIndex={index} updateInput={this._updateInput} />
            case Q_DATE: return <DateInput key={input.id} data={input} questionIndex={index} updateInput={this._updateInput} />
            default: return <Text>Unrecognized input type: {input.type}</Text>
        }
    }

    async _updateInput(questionIndex, inputId, value) {
        await this.props.updateInput(this.props.surveyId, this.props.sectionId, questionIndex, inputId, value);
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding"
                style={{ flex: 1 }}>
                <Text style={{ marginBottom: 8, marginHorizontal: STANDARD_HORIZONTAL_MARGIN, color: colors.textSecondaryColor }}>Last modified time:{new Date(this.props.data.lastModification).toLocaleString()}</Text>
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