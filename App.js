import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
// import * as Location from "expo-location";

import Home from './components/Home';
/**
 * Import all
 * Chapters
 */
 import Exam from './components/Chapters/Exam';
 import Practice from './components/Chapters/Practice';
 import Questions from './components/Chapters/Questions';
/**
 * Import all
 * chapter components
 */
import ExamContent from './components/ChapterContents/ExamContent';
import PracticeContent from './components/ChapterContents/PracticeContent';
import QuestionsContent from './components/ChapterContents/QuestionsContent';
/**
 * Import all
 * Quiz components
 */
import ExamBank from './components/Quiz/ExamBank';
import PracticeBank from './components/Quiz/PracticeBank';
import QuestionBank from './components/Quiz/QuestionBank';
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
        options={{ title: 'Casa' }}
       
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
        options={{ title: 'Capitoli di domande' }}
      />
      <Stack.Screen 
        name="Practice" 
        component={Practice} 
        options={{ title: 'Capitoli di pratica' }}
      />
      <Stack.Screen 
        name="Exam" 
        component={Exam} 
        options={{ title: "Capitoli del quiz d' esame" }}
      />
      {
        /**
         * Set all chapter
         * components
         */
      }
      <Stack.Screen 
        name="QuestionsContent" 
        component={QuestionsContent} 
        options={{ title: 'Contenuto delle domande' }}
      />
      <Stack.Screen 
        name="PracticeContent" 
        component={PracticeContent} 
        options={{ title: 'Contenuti pratici' }}
      />
      <Stack.Screen 
        name="ExamContent" 
        component={ExamContent} 
        options={{ title: "Contenuto del quiz d'esame " }}
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
        options={{ title: 'Capitoli di domande' }}
      />
      <Stack.Screen 
        name="PracticeBank" 
        component={PracticeBank} 
        options={{ title: 'Pratica banca delle domande' }}
      />
      <Stack.Screen 
        name="ExamBank" 
        component={ExamBank} 
        options={{ title: "Banca delle domande d'esame " }}
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