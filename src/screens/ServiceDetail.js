import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ServiceDetail({ route, navigation }) {
  const { service } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#4A90E2" />
        </TouchableOpacity>
        <Text style={styles.title}>{service.name}</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.card}>
        <Text style={styles.price}>${service.price}</Text>
        <Text style={styles.duration}>{service.duration}</Text>
        <Text style={styles.description}>{service.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Este servicio incluye:</Text>
        {service.includes.map((item, index) => (
          <View key={index} style={styles.includedItem}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
            <Text style={styles.includedText}>{item}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity 
        style={styles.bookButton}
        onPress={() => navigation.navigate('Appointments')}
      >
        <Text style={styles.bookButtonText}>Agendar Cita</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    margin: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 5,
  },
  duration: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
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
    margin: 15,
    marginTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  includedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  includedText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#555',
  },
  bookButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    padding: 16,
    margin: 15,
    alignItems: 'center',
  },
  bookButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});