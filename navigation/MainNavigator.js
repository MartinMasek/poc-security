import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'
import MainScreen from '../src/screens/MainScreen';
import AuthScreen from '../src/screens/AuthScreen';
import { AUTH_SCREEN, MAIN_SCREEN, SURVEY_LIST, SURVEY_OVERVIEW, SECTION_DETAIL, APP_SCREEN, SETTINGS, LOGOUT_SCREEN } from './constants';
import SurveyList from '../src/screens/SurveyList';
import SurveyOverview from '../src/screens/SurveyOverview';
import Section from '../src/screens/Section';
import { STANDARD_HORIZONTAL_MARGIN, fonts, colors } from '../src/assets/globalStyles';
import Settings from '../src/screens/Settings';
import LogoutScreen from '../src/screens/LogoutScreen';

const AppStack = createStackNavigator({
  [SURVEY_LIST]: SurveyList,
  [SURVEY_OVERVIEW]: SurveyOverview,
  [SECTION_DETAIL]: Section,
  [SETTINGS]: Settings
}, {
    initialRouteName: SURVEY_LIST,
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerStyle: {
          borderBottomWidth: 0,
          shadowColor: 'transparent',
          elevation: 0,
          shadowOpacity: 0,
          // backgroundColor: colors.primaryColor
        },
        headerTitleStyle: {
          fontWeight: fonts.semibold,
          fontSize: fonts.headerFontSize,
          textAlign: "center",
          flex: 1
        },
        headerLeft:
          <TouchableOpacity
            style={{
              alignItems: 'center',
              marginLeft: STANDARD_HORIZONTAL_MARGIN
            }}
            onPress={() => navigation.pop()}
          >
            <AntDesign name="arrowleft" size={28} style={{ color: colors.primaryColor }} />
          </TouchableOpacity>,
        // We have to add right item so the text header is properly aligned to the middle
        // (It has flex:1 => no right item means bad alignment)
        headerRight:
          <TouchableOpacity
            style={{
              alignItems: 'center',
              marginLeft: STANDARD_HORIZONTAL_MARGIN
            }}
            onPress={() => { }}
          >
            <AntDesign name="arrowleft" size={28} style={{ color: 'transparent' }} />
          </TouchableOpacity>
      }
    }
  });

export default createAppContainer(createSwitchNavigator({
  [APP_SCREEN]: AppStack,
  [AUTH_SCREEN]: AuthScreen,
  [MAIN_SCREEN]: MainScreen,
  [LOGOUT_SCREEN]: LogoutScreen
},
  {
    initialRouteName: MAIN_SCREEN
  })
);