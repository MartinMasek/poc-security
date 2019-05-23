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
            case Q_TEXT: return <FreeTextInput data={input} updateInput={this._updateInput} />
            case Q_DATE: return <DateInput data={input} updateInput={this._updateInput} />
            default: return <Text>Unrecognized input type: {input.type}</Text>
        }
    }

    async _updateInput(inputId, value) {
        await this.props.updateInput(this.props.surveyId, inputId, value);
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
        data: getSectionData(state, surveyId, sectionId),
        surveyId: surveyId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateInput: (surveyId, inputId, value) => dispatch(updateInput(surveyId, inputId, value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Section)