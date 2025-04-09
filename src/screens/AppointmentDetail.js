import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config';
import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

export default function AppointmentDetail({ route, navigation }) {
  const { appointment: initialAppointment } = route.params;
  const { userToken } = useAuth();
  const [appointment, setAppointment] = useState(initialAppointment);
  const [loading, setLoading] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/appointments/${appointment.id}`, {
          headers: {
            'Authorization': `Bearer ${userToken}`,
          }
        });
        setAppointment(response.data);
      } catch (error) {
        console.error('Error fetching appointment details:', error);
        Alert.alert('Error', 'No se pudieron cargar los detalles de la cita');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointmentDetails();
  }, [appointment.id, userToken]);

  const handleCancelAppointment = async () => {
    Alert.alert(
      'Cancelar Cita',
      '¿Estás seguro de que deseas cancelar esta cita?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Sí, cancelar',
          style: 'destructive',
          onPress: async () => {
            try {
              setCancelling(true);
              await axios.put(
                `${API_URL}/appointments/${appointment.id}/cancel`,
                {},
                {
                  headers: {
                    'Authorization': `Bearer ${userToken}`,
                  }
                }
              );
              setAppointment({ ...appointment, status: 'cancelled' });
              Alert.alert('Éxito', 'La cita ha sido cancelada');
            } catch (error) {
              console.error('Error cancelling appointment:', error);
              Alert.alert('Error', 'No se pudo cancelar la cita');
            } finally {
              setCancelling(false);
            }
          },
        },
      ]
    );
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: moment(date).format('LL'),
      time: moment(date).format('LT'),
      day: moment(date).format('dddd'),
    };
  };

  const { date, time, day } = formatDateTime(appointment.date);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#4A90E2" />
        </TouchableOpacity>
        <Text style={styles.title}>Detalle de Cita</Text>
        <View style={{ width: 24 }} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#4A90E2" style={styles.loader} />
      ) : (
        <>
          <View style={[
            styles.statusBadge,
            appointment.status === 'confirmed' && styles.statusConfirmed,
            appointment.status === 'pending' && styles.statusPending,
            appointment.status === 'cancelled' && styles.statusCancelled,
          ]}>
            <Text style={styles.statusText}>
              {appointment.status === 'confirmed' ? 'Confirmada' : 
               appointment.status === 'pending' ? 'Pendiente' : 'Cancelada'}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Información de la Cita</Text>
            
            <View style={styles.infoRow}>
              <Ionicons name="calendar" size={20} color="#4A90E2" />
              <Text style={styles.infoText}>{day}, {date}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Ionicons name="time" size={20} color="#4A90E2" />
              <Text style={styles.infoText}>{time}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Ionicons name="paw" size={20} color="#4A90E2" />
              <Text style={styles.infoText}>Mascota: {appointment.pet_name}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Ionicons name="medkit" size={20} color="#4A90E2" />
              <Text style={styles.infoText}>Servicio: {appointment.service_name}</Text>
            </View>
          </View>

          {appointment.notes && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Notas Adicionales</Text>
              <Text style={styles.notesText}>{appointment.notes}</Text>
            </View>
          )}

          {appointment.status !== 'cancelled' && (
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={handleCancelAppointment}
              disabled={cancelling}
            >
              {cancelling ? (
                <ActivityIndicator color="#F44336" />
              ) : (
                <Text style={styles.cancelButtonText}>Cancelar Cita</Text>
              )}
            </TouchableOpacity>
          )}
        </>
      )}
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
  loader: {
    marginTop: 50,
  },
  statusBadge: {
    alignSelf: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    marginVertical: 15,
  },
  statusConfirmed: {
    backgroundColor: '#4CAF50',
  },
  statusPending: {
    backgroundColor: '#FFC107',
  },
  statusCancelled: {
    backgroundColor: '#F44336',
  },
  statusText: {
    color: 'white',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    margin: 15,
    marginBottom: 0,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#4A90E2',
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
  notesText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  cancelButton: {
    margin: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: '#F44336',
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#F44336',
    fontSize: 16,
    fontWeight: 'bold',
  },
});