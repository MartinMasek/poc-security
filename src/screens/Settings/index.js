import React from 'react';
import { View, Text, TouchableHighlight, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { STANDARD_HORIZONTAL_MARGIN, colors, fonts } from '../../assets/globalStyles';
import { LOCAL_STORAGE_KEY } from '../../services/constants';
import { renderIf } from '../../services/api/utils';
import { clearProfileData } from '../../services/actions/profile';
import { LOGOUT_SCREEN } from '../../../navigation/constants';
import { loadAppData } from '../../services/actions/app';
import BigButton from '../shared/BigButton';
import { getProfileFromToken } from '../../services/reducers/profile';

export class Settings extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Settings"
        }
    };

    constructor(props) {
        super(props);

        this.state = { resetingData: false };
    }

    async _resetData() {
        await AsyncStorage.removeItem(LOCAL_STORAGE_KEY);
        await AsyncStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(require("../../../assets/data/mock_v2.json")));
        await this.props.loadAppData();
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{
                    paddingHorizontal: STANDARD_HORIZONTAL_MARGIN,
                    paddingBottom:8,
                    marginBottom: 24,
                    borderBottomWidth: 1,
                    borderColor: colors.navigationUIColor
                }}>
                    <Text style={{ fontSize: fonts.standardFontSize }}>{this.props.userProfile.name}</Text>
                </View>
                <BigButton
                    onPress={async () => {
                        try {
                            this.setState({ resetingData: true });
                            await this._resetData();
                            this.setState({ resetingData: false });
                        }
                        catch (e) {
                            this.setState({ resetingData: false })
                            alert(e)
                        }
                    }}
                    title="Reset data"
                />

                <BigButton
                    onPress={async () => { this.props.navigation.navigate(LOGOUT_SCREEN); }}
                    style={{ marginTop: 24 }}
                    title="Logout"
                />

                {renderIf(this.state.resetingData)(
                    <Text style={{ marginBottom: 8 }}>Reseting . . .</Text>
                )}
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        userProfile: getProfileFromToken(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clearProfileData: () => dispatch(clearProfileData()),
        loadAppData: () => dispatch(loadAppData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)