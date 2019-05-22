import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainScreen from '../src/screens/MainScreen';
import AuthScreen from '../src/screens/AuthScreen';
import { AUTH_SCREEN, MAIN_SCREEN, SURVEY_LIST, SURVEY_OVERVIEW, SECTION_DETAIL, APP_SCREEN } from './constants';
import SurveyList from '../src/screens/SurveyList';
import SurveyOverview from '../src/screens/SurveyOverview';
import Section from '../src/screens/Section';

const AppStack = createStackNavigator({
  [SURVEY_LIST]: SurveyList,
  [SURVEY_OVERVIEW]: SurveyOverview,
  [SECTION_DETAIL]: Section
}, {
    initialRouteName: SURVEY_LIST
  });

export default createAppContainer(createSwitchNavigator({
  [APP_SCREEN]: AppStack,
  [AUTH_SCREEN]: AuthScreen,
  [MAIN_SCREEN]: MainScreen,
},
  {
    initialRouteName: MAIN_SCREEN
  })
);