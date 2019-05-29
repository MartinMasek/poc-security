import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { AuthSession, WebBrowser } from 'expo';
import { connect } from 'react-redux';
import { clearProfileData } from '../services/actions/profile';
import { colors } from '../assets/globalStyles';
import { MAIN_SCREEN } from '../../navigation/constants';
import { saveAppStateToLocalStorage } from '../services/actions/app';

export class LogoutScreen extends React.Component {

    async componentDidMount() {
        try {
            await this._triggerLogout();
        }
        catch (error) {
            alert(error);
            this.props.navigation.navigate(MAIN_SCREEN);
        }
    }

    _triggerLogout = async () => {
        // Using WebBrowser instead of AuthSession is slightly better experience
        // const result = await AuthSession.startAsync({
        //     authUrl:
        //         "https://login.microsoftonline.com/logout.srf"
        // });
        const result = await WebBrowser.openAuthSessionAsync("https://login.microsoftonline.com/logout.srf");
        console.log(result);

        // The sections below are when using AuthSession but using WebBrowser to clear data is 
        // a slightly better experience
        // // User cancelled the popup
        // if (result && result.errorCode && result.errorCode == "login-declined") {
        //     this.props.navigation.navigate(MAIN_SCREEN);
        // }
        // // Error in the flow
        // if (result && result.type && result.type == "error") {
        //     alert(result.errorCode);
        //     this.props.navigation.navigate(MAIN_SCREEN);
        // }

        // Success
        this.props.clearProfileData();
        await saveAppStateToLocalStorage();
        this.props.navigation.navigate(MAIN_SCREEN);
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={colors.primaryColor} />
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
        clearProfileData: () => dispatch(clearProfileData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutScreen)