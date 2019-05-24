import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { getSectionData } from '../../services/reducers/survey';
import { STANDARD_HORIZONTAL_MARGIN, colors, fonts } from '../../assets/globalStyles';
import { renderIf } from '../../services/api/utils';
import { Q_TEXT, Q_DATE } from '../../services/constants'
import FreeTextInput from './FreeTextInput';
import DateInput from './DateInput';
import { updateInput } from '../../services/actions/survey';

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
        console.log("_renderQuestion()");
        return (
            <View style={{ marginBottom: 24 }}>
                {renderIf(question.title)(
                    <Text style={{ fontSize: fonts.standardFontSize, fontWeight: fonts.semibold }}>{question.title}</Text>
                )}
                {question.inputs.map(input => this._renderInput(input, index))}
            </View>
        )
    }

    _renderInput(input, index) {
        switch (input.type) {
            case Q_TEXT: return <FreeTextInput data={input} questionIndex={index} updateInput={this._updateInput} />
            case Q_DATE: return <DateInput data={input} questionIndex={index} updateInput={this._updateInput} />
            default: return <Text>Unrecognized input type: {input.type}</Text>
        }
    }

    async _updateInput(questionIndex, inputId, value) {
        await this.props.updateInput(this.props.surveyId, this.props.sectionId, questionIndex, inputId, value);
    }


    render() {
        console.log("Section render()");
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    style={{ paddingTop: 24, paddingHorizontal: STANDARD_HORIZONTAL_MARGIN }}
                    data={this.props.data.questions}
                    renderItem={({ item, index }) => this._renderQuestion(item, index)}
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