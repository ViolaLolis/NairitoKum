import React from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PrivacySettings() {
  const [dataCollection, setDataCollection] = React.useState(true);
  const [analytics, setAnalytics] = React.useState(true);
  const [personalizedAds, setPersonalizedAds] = React.useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Configuración de Privacidad</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recopilación de Datos</Text>
        <Text style={styles.sectionDescription}>
          Controla cómo recopilamos y utilizamos tus datos para mejorar VetApp.
        </Text>
      </View>

      <View style={styles.settingItem}>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>Recopilación de datos anónimos</Text>
          <Text style={styles.settingDescription}>
            Nos ayuda a mejorar la aplicación
          </Text>
        </View>
        <Switch
          value={dataCollection}
          onValueChange={setDataCollection}
          trackColor={{ false: '#767577', true: '#4A90E2' }}
          thumbColor={dataCollection ? '#f4f3f4' : '#f4f3f4'}
        />
      </View>

      <View style={styles.settingItem}>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>Analíticas</Text>
          <Text style={styles.settingDescription}>
            Comparte datos de uso para análisis
          </Text>
        </View>
        <Switch
          value={analytics}
          onValueChange={setAnalytics}
          trackColor={{ false: '#767577', true: '#4A90E2' }}
          thumbColor={analytics ? '#f4f3f4' : '#f4f3f4'}
        />
      </View>

      <View style={styles.settingItem}>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>Anuncios personalizados</Text>
          <Text style={styles.settingDescription}>
            Muestra anuncios relevantes para ti
          </Text>
        </View>
        <Switch
          value={personalizedAds}
          onValueChange={setPersonalizedAds}
          trackColor={{ false: '#767577', true: '#4A90E2' }}
          thumbColor={personalizedAds ? '#f4f3f4' : '#f4f3f4'}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Política de Privacidad</Text>
        <Text style={styles.sectionDescription}>
          Lee nuestra política de privacidad completa para entender cómo protegemos tus datos.
        </Text>
        <View style={styles.linkItem}>
          <Ionicons name="document-text" size={20} color="#4A90E2" />
          <Text style={styles.linkText}>Ver Política de Privacidad</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Datos Personales</Text>
        <View style={styles.linkItem}>
          <Ionicons name="download" size={20} color="#4A90E2" />
          <Text style={styles.linkText}>Descargar mis datos</Text>
        </View>
        <View style={styles.linkItem}>
          <Ionicons name="trash" size={20} color="#F44336" />
          <Text style={[styles.linkText, styles.deleteText]}>Eliminar mi cuenta</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#4A90E2',
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    lineHeight: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  settingText: {
    flex: 1,
    marginRight: 15,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 3,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  linkText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#4A90E2',
  },
  deleteText: {
    color: '#F44336',
  },
});