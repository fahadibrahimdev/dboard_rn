import { useEffect, useState } from 'react';
import {
  Appearance,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View
} from 'react-native';

import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';

import { Provider } from 'react-redux';
import { DarkTheme, LightTheme } from './src/helpers/Themes';
import AppContextProvider from './src/system/AppContextProvider';
import RootNavigator from './src/system/navigation/RootNavigator';
import { store } from './src/system/redux/store/store';
import NotificationController from './src/system/pushNotification/NotificationController';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'black' : 'white',
    flex: 1,
  };

  const navigationRef = createNavigationContainerRef();

  const [myAppTheme, setMyAppTheme] = useState(LightTheme);

  const scheme = Appearance.getColorScheme();

  useEffect(() => {

    setMyAppTheme(scheme === 'dark' ? DarkTheme : LightTheme);

    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      // Updated Scheme Color
      setMyAppTheme(colorScheme === 'dark' ? DarkTheme : LightTheme);
    });

  }, [])

  useEffect(() => {
    console.log('Fahad Theme changes: ', myAppTheme);
  }, [myAppTheme]);

  return (
    <SafeAreaView style={backgroundStyle}>


      <View style={{
        flex: 1,
      }}>
        <Provider store={store}>

          <AppContextProvider>
            <NavigationContainer
              theme={scheme === 'dark' ? DarkTheme : LightTheme}
              ref={navigationRef}>
              <StatusBar
                backgroundColor={myAppTheme.colors.appStatusBarColor}
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              />
              <NotificationController />
              <RootNavigator />


            </NavigationContainer>
          </AppContextProvider>
        </Provider>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
