import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import AuthScreen from './AuthScreen';
import { setProfile } from '../services/actions/profile';
import { isUserLogged } from '../services/reducers/profile';

class MainScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loginSuccess: false }

        this._onLoginSuccess = this._onLoginSuccess.bind(this);
    }

    _onLoginSuccess(profileData) {
        // Mock for now
        this.props.setProfile({
            email: "joe@testCompany.com",
            accessToken: "0000-0000-0000-0000"
        });
    }

    render() {
        if (!this.props.isUserLogged) {
            return (
                <AuthScreen
                    onLoginSuccess={(profileData) => this._onLoginSuccess(profileData)}
                />
            );
        }

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
        setProfile: (profileData) => dispatch(setProfile(profileData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)