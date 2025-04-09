import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import PetCard from '../Componentes/PetCard';
import ServiceCard from '../Componentes/ServiceCard';

export default function Home({ navigation }) {
  const pets = [
    { id: 1, name: 'Max', type: 'Perro', age: 3, image: require('../assets/perro.png') },
    { id: 2, name: 'Luna', type: 'Gato', age: 2, image: require('../assets/gato.png') },
  ];

  const services = [
    { id: 1, name: 'Consulta General', description: 'Revisión médica básica', price: 50 },
    { id: 2, name: 'Vacunación', description: 'Aplicación de vacunas', price: 30 },
    { id: 3, name: 'Estética', description: 'Baño y corte de pelo', price: 40 },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Bienvenido a VetApp</Text>
      
      <Text style={styles.sectionTitle}>Mis Mascotas</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {pets.map(pet => (
          <PetCard 
            key={pet.id} 
            pet={pet} 
            onPress={() => navigation.navigate('Pets', { pet })} 
          />
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Próximas Citas</Text>
      <View style={styles.card}>
        <Text style={styles.cardText}>15 Mayo - 10:00 AM</Text>
        <Text style={styles.cardText}>Consulta para Max</Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Appointments')}
        >
          <Text style={styles.buttonText}>Ver todas las citas</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Servicios</Text>
      {services.map(service => (
        <ServiceCard 
          key={service.id} 
          service={service} 
          onPress={() => navigation.navigate('Services')} 
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 10,
    color: '#4A90E2',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#4A90E2',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});