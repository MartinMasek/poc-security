import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import AuthScreen from './AuthScreen';
import { setProfile } from '../services/actions/profile';
import { isUserLogged } from '../services/reducers/profile';
import { loadAppData } from '../services/actions/app';
import { colors } from '../assets/globalStyles';

class MainScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loadingData: false }

        this._onLoginSuccess = this._onLoginSuccess.bind(this);
    }

    async _onLoginSuccess(profileData) {
        // Mock for now
        this.props.setProfile({
            email: "joe@testCompany.com",
            accessToken: "0000-0000-0000-0000"
        });
        this.setState({ loadingData: true });
        try {
            await this.props.loadAppData();
            this.setState({ loadingData: false });
        }
        catch (e) {
            this.setState({ loadingData: false });
            alert("Error loading app data: " + e ? e.toString() : "");
        }
    }

    render() {
        if (!this.props.isUserLogged) {
            return (
                <AuthScreen
                    onLoginSuccess={(profileData) => this._onLoginSuccess(profileData)}
                />
            );
        }

        if (this.state.loadingData) return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" color={colors.primaryColor} />
                <Text style={{ marginTop: 8 }}>Loading data ...</Text>
            </View>
        )

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>
                    Main app
            </Text>
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
        loadAppData: () => dispatch(loadAppData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)