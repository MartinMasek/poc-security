import React from 'react';
import { View, Text, Button, ActivityIndicator, Image, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-navigation'
import { connect } from 'react-redux';
import { AuthSession } from 'expo';
import { colors, fonts, STANDARD_HORIZONTAL_MARGIN } from '../assets/globalStyles';
import { MAIN_SCREEN, LOGOUT_SCREEN } from '../../navigation/constants';
import { isUserLogged } from '../services/reducers/profile';
import { saveAccessTokenAsync } from '../services/actions/profile';
import BigButton from './shared/BigButton';
import { renderIf } from '../services/api/utils';
import { persistStateToLocalStorage } from '../services/api/LocalStorage';

const AVAILABLE_WIDTH = Dimensions.get('window').width - 2 * STANDARD_HORIZONTAL_MARGIN;

const AUTH_URL = "https://pocsecurity1234.azurewebsites.net/auth"
// const AUTH_URL = "https://localhost:3001"
const TENANT_ID = "3926f5f4-ca60-46de-b9f8-72639d55232d"
const CLIENT_ID = "909caae4-5065-438a-afb3-afd01c2ff8dc"

export class AuthScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isError: false,
            errorMsg: "",
            loading: false
        }
    }

    _handleLoginAsync = async () => {
        try {
            const result = await AuthSession.startAsync({
                authUrl:
                    `https://login.microsoftonline.com/${TENANT_ID}/oauth2/authorize?client_id=${CLIENT_ID}`
                    + `&redirect_uri=${encodeURIComponent(AUTH_URL)}&response_type=code`,
            });
            // User dismisses the web view
            if (result && result.type && result.type === "cancel") return;
            // User cancelled the popup
            if (result && result.errorCode && result.errorCode === "login-declined") return;
            // Error in the flow
            if (result && result.type && result.type === "error") {
                this.setState({ isError: true, errorMsg: result.errorCode })
                return;
            }
            if (result && result.params && result.params.error === true) {
                this.setState({ isError: true, errorMsg: result.params.errorMsg })
                return;
            }
            // Success
            const token = result.params.token;
            await this.props.saveAccessTokenAsync(token);
            this.props.navigation.navigate(MAIN_SCREEN);
            // TODO: remove below after proper storage implementation
            persistStateToLocalStorage();
        }
        catch (error) {
            this.setState({ isError: true, errorMsg: error.toString() })
        }
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ marginTop: 24, alignItems: 'center' }}>
                    <Text style={{ fontSize: fonts.mediumTitleSize }}>SURVEY APP</Text>
                </View>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                }}>
                    <Image
                        style={{ width: AVAILABLE_WIDTH, height: AVAILABLE_WIDTH }}
                        source={require('../assets/images/altria_logo_sq.jpg')}
                        resizeMode="contain"
                    />
                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                        {/* This section is used to display error messages */}
                        <ScrollView style={{ minHeight: 150 }} bounces={false}>
                            {renderIf(this.state.isError)(
                                <Text>{this.state.errorMsg}</Text>
                            )}
                        </ScrollView>
                        <View style={{ marginBottom: 8, marginTop: 12 }}>
                            <BigButton title="Login" style={{ width: AVAILABLE_WIDTH }} onPress={this._handleLoginAsync} />
                        </View>
                        <View style={{
                            marginBottom: 8, height: 40,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            {/* We need to have this section in case that user clicked 'Yes' to save his credentials. In that case,
                        when are not able to login with a different account because their different account is saved in cookies */}
                            {renderIf(this.state.isError)(
                                <Text
                                    style={{ fontSize: fonts.buttonFontSiz, textDecorationLine: 'underline' }}
                                    onPress={() => this.props.navigation.navigate(LOGOUT_SCREEN)}
                                >Delete cookies</Text>
                            )}
                        </View>
                    </View>
                </View>
            </SafeAreaView >
        );
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 17, marginBottom: 12 }}>AuthScreen - this should be AAD login</Text>
                <View style={{ marginBottom: 24 }}>
                    <Button
                        onPress={() => {
                            this.setState({ loading: true });
                            setTimeout(() => {
                                this.setState({ loading: false });
                                this._onLoginSuccess({
                                    accessToken: "0000-0000-0000-0000"
                                });
                            }, 1300)
                        }}
                        title="Simulate login"
                    />
                </View>
                {this.state.loading && <ActivityIndicator size="large" color={colors.primaryColor} />}
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isUserLogged: isUserLogged(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveAccessTokenAsync: (token) => dispatch(saveAccessTokenAsync(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen)