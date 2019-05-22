import React from 'react';
import { View, Text, Button, ActivityIndicator, WebView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { AuthSession } from 'expo';
import { colors } from '../assets/globalStyles';
import { MAIN_SCREEN } from '../../navigation/constants';
import { isUserLogged } from '../services/reducers/profile';
import { setProfile } from '../services/actions/profile';

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
                `https://login.microsoftonline.com/6b5bebd1-2726-4f17-8aed-3d3ffb415c54/oauth2/authorize?client_id=31fc597b-5bfb-4301-ae76-c91c14a63793`
                + `&redirect_uri=${encodeURIComponent(redirectUrl)}&response_type=code`,
            // authUrl:
            // "https://login.microsoftonline.com/logout.srf"
        });
        console.log(result);
        this.setState({ result });
    };

    _onLoginSuccess(profileData) {
        this.props.setProfile(profileData);
        this.props.navigation.navigate(MAIN_SCREEN);
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
        // return (
        //     <WebView
        //         source={{ uri: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=6731de76-14a6-49ae-97bc-6eba6914391e&response_type=id_token&redirect_uri=http%3A%2F%2Flocalhost%2Fmyapp%2F&scope=openid&response_mode=fragment&state=12345&nonce=678910' }}
        //         style={{ marginTop: 20 }}
        //     />
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