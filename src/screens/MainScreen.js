import React from 'react';
import { View, Text, ActivityIndicator, Button } from 'react-native';
import { connect } from 'react-redux';
import { isUserLogged } from '../services/reducers/profile';
import { loadAppData } from '../services/actions/app';
import { colors } from '../assets/globalStyles';
import { AUTH_SCREEN, APP_SCREEN } from '../../navigation/constants';
import { renderIf } from '../services/api/utils';
import { isAppDataInMemory } from '../services/reducers';

class MainScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = { error: "" }
    }

    async componentDidMount() {
        try {
            // If we have data in memory, we don't need to load data from the local DB
            // because the in memory should be always fresher
            if (!this.props.isAppDataInMemory) {
                console.debug(" --- Loading data from device storage ---")
                await this.props.loadAppData();
            }
            if (!this.props.isUserLogged) {
                this.props.navigation.navigate(AUTH_SCREEN);
                return;
            }
            // TODO: We should check how fresh are local data and compare it with the server data
            this.props.navigation.navigate(APP_SCREEN)
        }
        catch (e) {
            this.setState({ error: "Error loading app data: " + e ? e.toString() : "" })
        }
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {renderIf(this.state.error == "")(
                    <View>
                        <ActivityIndicator size="large" color={colors.primaryColor} />
                        <Text style={{ marginTop: 8 }}>Loading data ...</Text>
                    </View>
                )}
                <Text style={{ marginTop: 8, color: 'red' }}>{this.state.error}</Text>
                {renderIf(this.state.error != "")(
                    <View
                        style={{ marginTop: 24 }}
                    >
                        <Button
                            title="Refresh"
                            onPress={() => {
                                this.setState({ error: "" });
                                this.componentDidMount();
                            }}
                        />
                    </View>
                )}
            </View>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isUserLogged: isUserLogged(state),
        isAppDataInMemory: isAppDataInMemory(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadAppData: () => dispatch(loadAppData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)