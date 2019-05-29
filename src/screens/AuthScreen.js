import React from 'react';
import { View, Text, Button, ActivityIndicator, WebView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { AuthSession } from 'expo';
import { colors } from '../assets/globalStyles';
import { MAIN_SCREEN } from '../../navigation/constants';
import { isUserLogged } from '../services/reducers/profile';
import { setProfile } from '../services/actions/profile';
import { saveAppStateToLocalStorage } from '../services/actions/app';

export class AuthScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = { loading: false, result: null }
    }

    _handlePressAsync = async () => {
        let redirectUrl = AuthSession.getRedirectUrl();
        console.log(redirectUrl);
        let result = await AuthSession.startAsync({
            authUrl:
                `https://login.microsoftonline.com/3926f5f4-ca60-46de-b9f8-72639d55232d/oauth2/authorize?client_id=909caae4-5065-438a-afb3-afd01c2ff8dc`
                + `&redirect_uri=${encodeURIComponent("https://pocsecurity1234.azurewebsites.net/auth")}&response_type=code`,
                // `https://login.microsoftonline.com/3926f5f4-ca60-46de-b9f8-72639d55232d/oauth2/authorize?client_id=909caae4-5065-438a-afb3-afd01c2ff8dc`
                // + `&redirect_uri=${encodeURIComponent("http://localhost:3001")}&response_type=code`,
                // "https://login.microsoftonline.com/logout.srf"
        });
        console.log(result);
        const authCode = result.params.code;
        console.log(authCode);
        this.setState({ result });
    };

    _onLoginSuccess(profileData) {
        this.props.setProfile(profileData);
        this.props.navigation.navigate(MAIN_SCREEN);
        saveAppStateToLocalStorage();
    }

    render() {
        // return (
        //     <View style={styles.container}>
        //         <Button title="Open AAD Auth" onPress={this._handlePressAsync} />
        //         {this.state.result ? (
        //             <Text>{JSON.stringify(this.state.result)}</Text>
        //         ) : null}
        //     </View>
        // );
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
                                    email: "joe@testCompany.com",
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
        setProfile: (profileData) => dispatch(setProfile(profileData)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});