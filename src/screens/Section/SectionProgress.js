import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import ProgressIndicator from '../shared/ProgressIndicator';
import { STANDARD_HORIZONTAL_MARGIN, fonts, colors } from '../../assets/globalStyles';
import { getSectionData } from '../../services/reducers/survey';
import { renderIf } from '../../services/api/utils';

export class SectionProgress extends React.Component {

    render() {
        const completed = this.props.data.completedQuestions;
        const total = this.props.data.totalQuestions;
        const percent = Math.ceil(completed / total * 100)
        return (
            <View style={{ flexDirection: 'row', marginRight: STANDARD_HORIZONTAL_MARGIN }}>
                {renderIf(percent<100)(
                    <ProgressIndicator percent={percent} radius={12} borderWidth={4} />
                )}
                {renderIf(percent==100)(
                    <Ionicons name="md-checkmark-circle" size={25} color={colors.successColor} />
                )}
                <Text style={{ color: 'gray', marginTop: 4, marginLeft: 4, fontSize: fonts.miniFont }}>
                    {percent}%
                </Text>
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        data: getSectionData(state, ownProps.surveyId, ownProps.sectionId)
    }
}

export default connect(mapStateToProps)(SectionProgress)