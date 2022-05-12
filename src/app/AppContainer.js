import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Appearance} from 'react-native';
import {LIGHT_THEME, DARK_THEME} from './theme';
import * as routes from './constants/routes';

// Screens
import SignInScreen from './screens/common/SignIn';
import SignUpScreen from './screens/common/SignUp';
import MembershipApplication from './screens/user/MembershipApplication';
import EmailVerifyScreen from './screens/common/EmailVerify';
import EmailConfirmScreen from './screens/common/SignUp/EmailConfirm';
import PrivacyPolicy from './screens/common/SignUp/PrivacyPolicy';
import CreatePasswordScreen from './screens/common/CreatePassword';
import CheckEmailScreen from './screens/common/CheckEmail';
import ResentPasswordScreen from './screens/common/ForgotPassword';
import FaqScreen from './screens/common/Faq';
import ChatList from './screens/user/ChatList';
import ConfirmCode from './screens/common/ForgotPassword/ConfirmCodeForgot';
import StartChat from './screens/user/StartChat';
import CreateGroupScreen from './screens/user/StartChat/CreateGroupChat';
import Home from './screens/user/Home';
import MyProfile from './screens/user/MyProfile';
import Profile from './screens/user/Profile';
import EditProfile from './screens/user/EditProfile';

import Shelf from './screens/user/Shelf';
import ControllerIsAuth from './screens/ControlllerIsAuth';
import Chat from './screens/user/Chat';
import ChatMembersScreen from 'src/screens/user/ChatMembers';
import Members from './screens/admin/Members';
import Settings from './screens/user/Settings';
import NotificationsSettings from './screens/user/Notifications';
import ChangePassword from './screens/user/ChangePassword';
import HelpScreen from './screens/user/Help';
import CurrencySettingsScreen from './screens/user/CurrencySettings';
import CreateNewPasswordForgot from './screens/common/ForgotPassword/CreateNewPasswordForgot';
import ChapterDeals from './screens/user/ChapterDeals';
import ChapterIdeas from './screens/user/ChapterIdeas';
import DealsDetailsScreen from './screens/user/DealsDetails';
import IdeasDetailsScreen from './screens/user/IdeasDetails';
import Deals from './screens/user/ChapterDeals/Deals';
import ConfrirmCreateGroupdScreen from './screens/user/StartChat/ConfirmCreateGroupChat';
import GroupDetailsScreen from './screens/user/GroupDetails';
import Attacjments from './screens/user/MembershipApplication/steps/Attacjments';
import EditGroupScreen from './screens/user/EditGroup';
import CreateChapterScreen from './screens/admin/CreateChapter';
import RequestProfileScreen from './screens/admin/Members/profile';
export const navigationRef = React.createRef();
import ChapterChat from 'src/screens/common/ChapterChat';

const Stack = createStackNavigator();

const isDark = Appearance.getColorScheme() === 'dark';

const AppContainer = () => {
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={isDark ? DARK_THEME : LIGHT_THEME}>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: false,
          header: () => null,
        }}>
        <Stack.Screen
          name={routes.CHECK_IS_AUTH}
          component={ControllerIsAuth}
          options={{
            title: '',
            headerTransparent: true,
            headerLeft: null,
            animationEnabled: false,
          }}
        />
        <Stack.Screen
          name={routes.START_CHAT}
          component={StartChat}
          options={{
            title: '',
            headerTransparent: true,
            headerLeft: null,
            animationEnabled: false,
          }}
        />
        <Stack.Screen
          name={routes.CHAT}
          component={Chat}
          options={{
            title: '',
            headerTransparent: true,
            headerLeft: null,
            animationEnabled: false,
          }}
        />
        <Stack.Screen
          name={routes.MEMBERS}
          component={Members}
          options={{
            title: '',
            headerTransparent: true,
            headerLeft: null,
            animationEnabled: false,
          }}
        />

        <Stack.Screen
          name={routes.CHAT_MEMBERS}
          component={ChatMembersScreen}
          options={{
            title: '',
            headerTransparent: true,
            headerLeft: null,
            animationEnabled: false,
          }}
        />
        <Stack.Screen
          name={routes.CHAPTER_CHAT}
          component={ChapterChat}
          options={{
            title: '',
            headerTransparent: true,
            headerLeft: null,
            animationEnabled: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;
