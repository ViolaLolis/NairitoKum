import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

const AppointmentCard = ({ appointment, onPress, onDelete }) => {
  const formatDate = (date) => {
    return moment(date).format('LL');
  };

  const formatTime = (date) => {
    return moment(date).format('LT');
  };

  const getStatusColor = () => {
    switch (appointment.status) {
      case 'confirmed':
        return '#4CAF50';
      case 'pending':
        return '#FFC107';
      case 'cancelled':
        return '#F44336';
      default:
        return '#4A90E2';
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.service}>{appointment.service}</Text>
        <View style={[styles.status, { backgroundColor: getStatusColor() }]}>
          <Text style={styles.statusText}>
            {appointment.status === 'confirmed' ? 'Confirmada' : 
             appointment.status === 'pending' ? 'Pendiente' : 'Cancelada'}
          </Text>
        </View>
      </View>
      
      <View style={styles.cardBody}>
        <View style={styles.infoRow}>
          <Ionicons name="calendar" size={16} color="#4A90E2" />
          <Text style={styles.infoText}>{formatDate(appointment.date)}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Ionicons name="time" size={16} color="#4A90E2" />
          <Text style={styles.infoText}>{formatTime(appointment.date)}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Ionicons name="paw" size={16} color="#4A90E2" />
          <Text style={styles.infoText}>{appointment.petName}</Text>
        </View>
      </View>
      
      {appointment.status !== 'cancelled' && (
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <Text style={styles.cancelButtonText}>Cancelar Cita</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
    alignItems: 'center',
    marginBottom: 10,
  },
  service: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  status: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 15,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardBody: {
    marginTop: 5,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  cancelButton: {
    marginTop: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: '#F44336',
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#F44336',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default AppointmentCard;