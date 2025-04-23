import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PetDetail({ route, navigation }) {
  const { pet } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#4A90E2" />
        </TouchableOpacity>
        <Text style={styles.title}>Detalle de Mascota</Text>
        <TouchableOpacity onPress={() => navigation.navigate('EditPet', { pet })}>
          <Ionicons name="create-outline" size={24} color="#4A90E2" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        <Image
          source={pet.image ? pet.image : require('../assets/perfil.png')}
          style={styles.petImage}
        />
        <Text style={styles.petName}>{pet.nombre}</Text>
        <Text style={styles.petType}>
          {pet.especie} • {pet.raza || 'Sin raza'}
        </Text>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Ionicons name="paw" size={20} color="#4A90E2" />
          <Text style={styles.infoText}>Edad: {pet.edad} años</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="calendar" size={20} color="#4A90E2" />
          <Text style={styles.infoText}>Última visita: {pet.lastVisit || 'No registrada'}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="medical" size={20} color="#4A90E2" />
          <Text style={styles.infoText}>Vacunas: {pet.vaccines || 'No registradas'}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Historial Médico</Text>
        {pet.medicalHistory && pet.medicalHistory.length > 0 ? (
          pet.medicalHistory.map((record, index) => (
            <View key={index} style={styles.recordCard}>
              <Text style={styles.recordDate}>{record.date}</Text>
              <Text style={styles.recordDescription}>{record.description}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noRecords}>No hay historial médico registrado</Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.appointmentButton}
        onPress={() => navigation.navigate('Appointments', { pet })}
      >
        <Text style={styles.appointmentButtonText}>
          Agendar Cita para {pet.nombre}
        </Text>
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
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  petImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 15,
  },
  petName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  petType: {
    fontSize: 16,
    color: '#666',
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    margin: 15,
    marginTop: 0,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    margin: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#4A90E2',
  },
  recordCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  recordDate: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 5,
  },
  recordDescription: {
    fontSize: 14,
    color: '#333',
  },
  noRecords: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    padding: 20,
  },
  appointmentButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    padding: 16,
    margin: 15,
    alignItems: 'center',
  },
  appointmentButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
