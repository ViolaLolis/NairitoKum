import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/Navigation/AppNavigator';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AppNavigator />
    </>
  );
}
