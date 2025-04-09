import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Home from '../screens/Home';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Pets from '../screens/Pets';
import Appointments from '../screens/Appointments';
import Services from '../screens/Services';
import Profile from '../screens/Profile';
import PetDetail from '../screens/PetDetail';
import AddEditPet from '../screens/AddEditPet';
import ServiceDetail from '../screens/ServiceDetail';
import PaymentMethods from '../screens/PaymentMethods';
import Settings from '../screens/Settings';
import Help from '../screens/Help';
import About from '../screens/About';
import PrivacySettings from '../screens/PrivacySettings';
import LanguageSettings from '../screens/LanguageSettings';
import ChatSupport from '../screens/ChatSupport';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Inicio') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Mascotas') {
            iconName = focused ? 'paw' : 'paw-outline';
          } else if (route.name === 'Citas') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Servicios') {
            iconName = focused ? 'medkit' : 'medkit-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4A90E2',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          paddingBottom: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
      })}
    >
      <Tab.Screen name="Inicio" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Mascotas" component={Pets} options={{ headerShown: false }} />
      <Tab.Screen name="Citas" component={Appointments} options={{ headerShown: false }} />
      <Tab.Screen name="Servicios" component={Services} options={{ headerShown: false }} />
      <Tab.Screen name="Perfil" component={Profile} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'white',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: '#4A90E2',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Register" 
          component={Register} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Main" 
          component={MainTabs} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen name="PetDetail" component={PetDetail} options={{ title: 'Detalle de Mascota' }} />
        <Stack.Screen name="AddEditPet" component={AddEditPet} options={{ title: 'Agregar/Editar Mascota' }} />
        <Stack.Screen name="ServiceDetail" component={ServiceDetail} options={{ title: 'Detalle de Servicio' }} />
        <Stack.Screen name="PaymentMethods" component={PaymentMethods} options={{ title: 'Métodos de Pago' }} />
        <Stack.Screen name="Settings" component={Settings} options={{ title: 'Configuración' }} />
        <Stack.Screen name="Help" component={Help} options={{ title: 'Ayuda' }} />
        <Stack.Screen name="About" component={About} options={{ title: 'Acerca de' }} />
        <Stack.Screen name="PrivacySettings" component={PrivacySettings} options={{ title: 'Privacidad' }} />
        <Stack.Screen name="LanguageSettings" component={LanguageSettings} options={{ title: 'Idioma' }} />
        <Stack.Screen name="ChatSupport" component={ChatSupport} options={{ title: 'Chat de Soporte' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}