import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class MainScreen extends React.Component {
    render() {
        if (!this.props.loginSuccess) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>
                        LOGIN SCREEN
                              </Text>
                </View>
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
        loginSuccess: true
    }
}

export default connect(mapStateToProps)(MainScreen)