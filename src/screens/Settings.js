import React from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Settings({ navigation }) {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

  // Cambiar el tema de la app según el modo oscuro
  React.useEffect(() => {
    if (darkModeEnabled) {
      StatusBar.setBarStyle('light-content'); // Cambiar estilo de barra de estado
    } else {
      StatusBar.setBarStyle('dark-content');
    }
  }, [darkModeEnabled]);

  const settingsOptions = [
    {
      title: 'Notificaciones',
      icon: 'notifications',
      action: (
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          trackColor={{ false: '#767577', true: '#4A90E2' }}
          thumbColor={notificationsEnabled ? '#f4f3f4' : '#f4f3f4'}
        />
      ),
    },
    {
      title: 'Modo Oscuro',
      icon: 'moon',
      action: (
        <Switch
          value={darkModeEnabled}
          onValueChange={setDarkModeEnabled}
          trackColor={{ false: '#767577', true: '#4A90E2' }}
          thumbColor={darkModeEnabled ? '#f4f3f4' : '#f4f3f4'}
        />
      ),
    },
    {
      title: 'Privacidad',
      icon: 'lock-closed',
      action: <Ionicons name="chevron-forward" size={20} color="#999" />,
      onPress: () => navigation.navigate('PrivacySettings'),
    },
    {
      title: 'Idioma',
      icon: 'language',
      subtitle: 'Español',
      action: <Ionicons name="chevron-forward" size={20} color="#999" />,
      onPress: () => navigation.navigate('LanguageSettings'),
    },
    {
      title: 'Ayuda y Soporte',
      icon: 'help-circle',
      action: <Ionicons name="chevron-forward" size={20} color="#999" />,
      onPress: () => navigation.navigate('Help'),
    },
    {
      title: 'Acerca de VetApp',
      icon: 'information-circle',
      action: <Ionicons name="chevron-forward" size={20} color="#999" />,
      onPress: () => navigation.navigate('About'),
    },
  ];

  // Estilos para el modo claro y oscuro
  const containerStyle = darkModeEnabled ? styles.containerDark : styles.containerLight;
  const buttonStyle = darkModeEnabled ? styles.logoutButtonDark : styles.logoutButtonLight;
  const textColor = darkModeEnabled ? '#fff' : '#000';

  return (
    <ScrollView style={containerStyle}>
      {settingsOptions.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.option}
          onPress={option.onPress}
          activeOpacity={option.onPress ? 0.5 : 1}
        >
          <View style={styles.optionLeft}>
            <Ionicons name={option.icon} size={24} color={darkModeEnabled ? '#fff' : '#4A90E2'} style={styles.optionIcon} />
            <View>
              <Text style={[styles.optionTitle, { color: textColor }]}>{option.title}</Text>
              {option.subtitle && <Text style={[styles.optionSubtitle, { color: textColor }]}>{option.subtitle}</Text>}
            </View>
          </View>
          {option.action}
        </TouchableOpacity>
      ))}

      {/* Botón de Cerrar Sesión */}
      <TouchableOpacity
        style={buttonStyle}
        onPress={() => navigation.replace('Login')} // Redirige a Login al cerrar sesión
      >
        <Text style={[styles.logoutButtonText, { color: darkModeEnabled ? '#fff' : '#F44336' }]}>Cerrar Sesión</Text>
      </TouchableOpacity>

      <Text style={[styles.versionText, { color: textColor }]}>Versión 1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerLight: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  containerDark: {
    flex: 1,
    backgroundColor: '#333',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    marginRight: 15,
  },
  optionTitle: {
    fontSize: 16,
  },
  optionSubtitle: {
    fontSize: 14,
    marginTop: 3,
  },
  logoutButtonLight: {
    marginTop: 30,
    padding: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  logoutButtonDark: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#444',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#555',
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  versionText: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
});
