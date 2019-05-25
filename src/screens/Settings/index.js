import React from 'react';
import { View, Text, TouchableHighlight, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { STANDARD_HORIZONTAL_MARGIN, colors } from '../../assets/globalStyles';
import { LOCAL_STORAGE_KEY } from '../../services/constants';
import { renderIf } from '../../services/api/utils';
import { clearProfileData } from '../../services/actions/profile';
import { AUTH_SCREEN } from '../../../navigation/constants';
import { saveAppStateToLocalStorage, loadAppData } from '../../services/actions/app';

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

    async _onLogout() {
        this.props.clearProfileData();
        await saveAppStateToLocalStorage();
        this.props.navigation.navigate(AUTH_SCREEN)
    }

    render() {
        return (
            <View style={{ flex: 1, paddingTop: 24 }}>
                <TouchableHighlight onPress={async () => {
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
                    underlayColor={colors.buttonLightPressedAreaColor}>
                    <View
                        style={{
                            height: 44, alignItems: 'center', justifyContent: 'center',
                            borderColor: colors.navigationUIColor,
                            borderWidth: 1,
                            backgroundColor: colors.primaryColor,
                            marginHorizontal: STANDARD_HORIZONTAL_MARGIN
                        }}>
                        <Text style={{ fontSize: 18, color: 'white', fontWeight: '500' }}>Reset data</Text>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight onPress={async () => {
                    await this._onLogout();
                }}
                    underlayColor={colors.buttonLightPressedAreaColor}>
                    <View
                        style={{
                            height: 44, alignItems: 'center', justifyContent: 'center',
                            borderColor: colors.navigationUIColor,
                            borderWidth: 1,
                            marginTop: 24,
                            backgroundColor: colors.primaryColor,
                            marginHorizontal: STANDARD_HORIZONTAL_MARGIN
                        }}>
                        <Text style={{ fontSize: 18, color: 'white', fontWeight: '500' }}>Logout</Text>
                    </View>
                </TouchableHighlight>

                {renderIf(this.state.resetingData)(
                    <Text style={{ marginBottom: 8 }}>Reseting . . .</Text>
                )}
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clearProfileData: () => dispatch(clearProfileData()),
        loadAppData:()=>dispatch(loadAppData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)