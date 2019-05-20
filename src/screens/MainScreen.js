import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import AuthScreen from './AuthScreen';

class MainScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loginSuccess: false }
    }

    render() {
        if (!this.state.loginSuccess) {
            return (
                <AuthScreen
                    onLoginSuccess={() => this.setState({ loginSuccess: true })}
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
        // loginSuccess: true
    }
}

export default connect(mapStateToProps)(MainScreen)