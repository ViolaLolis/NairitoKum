import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function About() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Acerca de VetApp</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.description}>
          VetApp es una aplicación diseñada para facilitar el cuidado de tus mascotas, 
          permitiéndote agendar citas veterinarias, gestionar sus perfiles médicos 
          y acceder a servicios especializados.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nuestra Misión</Text>
        <Text style={styles.sectionText}>
          Brindar a los dueños de mascotas herramientas fáciles de usar para 
          mantener a sus animales saludables y felices, conectándolos con los 
          mejores profesionales veterinarios.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Versión</Text>
        <Text style={styles.sectionText}>VetApp 1.0.0</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Desarrolladores</Text>
        <Text style={styles.sectionText}>Equipo VetApp © 2023</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contáctanos</Text>
        <View style={styles.contactItem}>
          <Ionicons name="mail" size={20} color="#4A90E2" />
          <Text 
            style={styles.contactLink}
            onPress={() => Linking.openURL('mailto:contacto@vetapp.com')}
          >
            contacto@vetapp.com
          </Text>
        </View>
        <View style={styles.contactItem}>
          <Ionicons name="globe" size={20} color="#4A90E2" />
          <Text 
            style={styles.contactLink}
            onPress={() => Linking.openURL('https://www.vetapp.com')}
          >
            www.vetapp.com
          </Text>
        </View>
      </View>

      <Text style={styles.footer}>
        Todos los derechos reservados. VetApp es una marca registrada.
      </Text>
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
    color: '#4A90E2',
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4A90E2',
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 22,
    color: '#333',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  contactLink: {
    fontSize: 16,
    marginLeft: 10,
    color: '#4A90E2',
    textDecorationLine: 'underline',
  },
  footer: {
    textAlign: 'center',
    marginTop: 20,
    color: '#999',
    fontSize: 12,
  },
});