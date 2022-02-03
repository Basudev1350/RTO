import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from './components/Home';
/**
 * Import all
 * chapter components
 */
import Exam from './components/ChapterContents/Exam';
import Practice from './components/ChapterContents/Practice';
import Questions from './components/ChapterContents/Questions';
/**
 * Import all
 * Quiz components
 */
import ExamBank from './components/Quiz/ExamBank';
import PracticeBank from './components/Quiz/PracticeBank';
import QuestionBank from './components/Quiz/QuestionBank';
import Chapter from './components/Chapter';
// import TranslatorComponent from './components/TranslatorComponent';

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
      {
        /**
         * Home component
         */
      }
      <Stack.Screen 
        name="Home" 
        component={Home}
        options={{ title: 'Home' }}
      />
      {
        /**
         * Set all chapter
         * components
         */
      }
      <Stack.Screen 
        name="Questions" 
        component={Questions} 
        options={{ title: 'Questions Chapters' }}
      />
      <Stack.Screen 
        name="Practice" 
        component={Practice} 
        options={{ title: 'Practice Question Bank' }}
      />
      <Stack.Screen 
        name="Exam" 
        component={Exam} 
        options={{ title: 'Exam Quiz Chapters' }}
      />
      {
        /**
         * Set all Quiz
         * components
         */
      }
      <Stack.Screen 
        name="QuestionBank" 
        component={QuestionBank}
        options={{ title: 'Questions Chapters' }}
      />
      <Stack.Screen 
        name="PracticeBank" 
        component={PracticeBank} 
        options={{ title: 'Practice Question Bank' }}
      />
      <Stack.Screen 
        name="ExamBank" 
        component={ExamBank} 
        options={{ title: 'Exam Question Bank' }}
      />
      
       
      {/* <Stack.Screen 
        name="Chapter" 
        component={Chapter} 
        options={{ title: 'Chapter' }}
      /> */}
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