import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Appointments({ navigation }) {
  const [appointments, setAppointments] = useState([
    { id: '1', petName: 'Max', date: '2023-05-15', time: '10:00', service: 'Consulta General', status: 'Confirmada' },
    { id: '2', petName: 'Luna', date: '2023-05-20', time: '15:30', service: 'Vacunación', status: 'Pendiente' },
  ]);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    petName: '',
    date: '',
    time: '',
    service: '',
  });

  const handleAddAppointment = () => {
    const newId = (appointments.length + 1).toString();
    setAppointments([...appointments, { ...newAppointment, id: newId, status: 'Pendiente' }]);
    setModalVisible(false);
    setNewAppointment({ petName: '', date: '', time: '', service: '' });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mis Citas</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, styles[item.status.toLowerCase()]]}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.service}</Text>
              <Text style={styles.cardStatus}>{item.status}</Text>
            </View>
            <Text style={styles.cardText}>Mascota: {item.petName}</Text>
            <Text style={styles.cardText}>Fecha: {item.date}</Text>
            <Text style={styles.cardText}>Hora: {item.time}</Text>
          </View>
        )}
        contentContainerStyle={styles.list}
      />

      {/* Modal para agregar nueva cita */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nueva Cita</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Nombre de la mascota"
              value={newAppointment.petName}
              onChangeText={(text) => setNewAppointment({...newAppointment, petName: text})}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Fecha (YYYY-MM-DD)"
              value={newAppointment.date}
              onChangeText={(text) => setNewAppointment({...newAppointment, date: text})}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Hora (HH:MM)"
              value={newAppointment.time}
              onChangeText={(text) => setNewAppointment({...newAppointment, time: text})}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Servicio"
              value={newAppointment.service}
              onChangeText={(text) => setNewAppointment({...newAppointment, service: text})}
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.addButton]}
                onPress={handleAddAppointment}
              >
                <Text style={styles.buttonText}>Agregar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
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
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#4A90E2',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 15,
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  cardStatus: {
    fontSize: 14,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  cardText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  confirmada: {
    borderLeftWidth: 5,
    borderLeftColor: '#4CAF50',
  },
  pendiente: {
    borderLeftWidth: 5,
    borderLeftColor: '#FFC107',
  },
  cancelada: {
    borderLeftWidth: 5,
    borderLeftColor: '#F44336',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4A90E2',
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#F44336',
  },
  addButton: {
    backgroundColor: '#4A90E2',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});