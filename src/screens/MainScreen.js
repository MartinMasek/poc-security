import React from 'react';
import { View, Text, ActivityIndicator, Button } from 'react-native';
import { connect } from 'react-redux';
import { setProfile } from '../services/actions/profile';
import { isUserLogged } from '../services/reducers/profile';
import { loadAppData } from '../services/actions/app';
import { colors } from '../assets/globalStyles';
import SurveyList from './SurveyList';
import { AUTH_SCREEN, APP_SCREEN } from '../../navigation/constants';
import { renderIf } from '../services/api/utils';

class MainScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = { error: "" }
    }

    async componentDidMount() {
        console.log("IS logged " + this.props.isUserLogged);
        if (!this.props.isUserLogged) {
            this.props.navigation.navigate(AUTH_SCREEN);
            return;
        }
        try {
            await this.props.loadAppData();
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