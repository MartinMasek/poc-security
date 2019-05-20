import React from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';

export default class AuthScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = { loading: false }
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 17, marginBottom: 12 }}>AuthScreen - this should be AAD login</Text>
                <View style={{ marginBottom: 24 }}>
                    <Button
                        onPress={() => {
                            this.setState({ loading: true });
                            setTimeout(() => {
                                this.setState({ loading: false });
                                this.props.onLoginSuccess();
                            }, 1700)
                        }}
                        title="Simulate login"
                    />
                </View>
                {this.state.loading && <ActivityIndicator size="large" color="gray" />}
            </View>
        );
    }
}