import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeComponent from './components/HomeComponent';
import QuizComponent from './components/QuizComponent';
import QuestionbankComponent from './components/QuestionbankComponent';

const Stack = createStackNavigator();

function StackRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
      <Stack.Screen 
        name="HomeComponent" 
        component={HomeComponent} 
        options={{ title: 'Home' }}
      />
      <Stack.Screen 
        name="QuizComponent" 
        component={QuizComponent} 
        options={{ title: 'Quiz' }}
      />
       <Stack.Screen 
        name="QuestionbankComponent" 
        component={QuestionbankComponent} 
        options={{ title: 'Question Bank' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StackRoutes />
    </NavigationContainer>
  );
}