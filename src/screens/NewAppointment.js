import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  ActivityIndicator,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_URL = 'https://tu-dominio.com/api'; // Cambia por tu URL de API

export default function NewAppointment({ navigation, route }) {
  const { userToken } = useAuth();
  const [pets, setPets] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [form, setForm] = useState({
    petId: '',
    serviceId: '',
    date: new Date(),
    notes: '',
  });
  
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener mascotas del usuario
        const petsResponse = await axios.get(`${API_URL}/pets`, {
          headers: {
            'Authorization': `Bearer ${userToken}`
          }
        });
        
        // Obtener servicios disponibles
        const servicesResponse = await axios.get(`${API_URL}/services`);
        
        setPets(petsResponse.data);
        setServices(servicesResponse.data);
        
        // Seleccionar primera mascota y servicio por defecto si existen
        if (petsResponse.data.length > 0 && servicesResponse.data.length > 0) {
          setForm(prev => ({
            ...prev,
            petId: petsResponse.data[0].id.toString(),
            serviceId: servicesResponse.data[0].id.toString(),
          }));
        }
      } catch (error) {
        Alert.alert('Error', 'No se pudieron cargar los datos. Por favor intenta más tarde.');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userToken]);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setForm(prev => ({
        ...prev,
        date: new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          prev.date.getHours(),
          prev.date.getMinutes()
        ),
      }));
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setForm(prev => ({
        ...prev,
        date: new Date(
          prev.date.getFullYear(),
          prev.date.getMonth(),
          prev.date.getDate(),
          selectedTime.getHours(),
          selectedTime.getMinutes()
        ),
      }));
    }
  };

  const handleSubmit = async () => {
    if (!form.petId || !form.serviceId) {
      Alert.alert('Error', 'Por favor selecciona una mascota y un servicio');
      return;
    }

    if (form.date < new Date()) {
      Alert.alert('Error', 'No puedes agendar una cita en el pasado');
      return;
    }

    setSubmitting(true);
    try {
      const response = await axios.post(`${API_URL}/appointments`, {
        pet_id: form.petId,
        service_id: form.serviceId,
        date: form.date.toISOString(),
        notes: form.notes
      }, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        }
      });

      Alert.alert('Éxito', 'Cita agendada correctamente', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      console.error('Error scheduling appointment:', error);
      Alert.alert('Error', 'No se pudo agendar la cita. Por favor intenta nuevamente.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  if (pets.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="paw" size={50} color="#ccc" />
        <Text style={styles.emptyText}>No tienes mascotas registradas</Text>
        <Text style={styles.emptySubtext}>Debes registrar al menos una mascota para agendar una cita</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('AddPet')}
        >
          <Text style={styles.addButtonText}>Agregar Mascota</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (services.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="medkit" size={50} color="#ccc" />
        <Text style={styles.emptyText}>No hay servicios disponibles</Text>
        <Text style={styles.emptySubtext}>Por favor intenta más tarde</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Nueva Cita</Text>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Mascota</Text>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            onValueChange={(value) => setForm({ ...form, petId: value })}
            items={pets.map(pet => ({
              label: `${pet.name} (${pet.type})`,
              value: pet.id.toString(),
            }))}
            value={form.petId}
            placeholder={{}}
            style={pickerSelectStyles}
          />
        </View>
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Servicio</Text>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            onValueChange={(value) => setForm({ ...form, serviceId: value })}
            items={services.map(service => ({
              label: `${service.name} ($${service.price})`,
              value: service.id.toString(),
            }))}
            value={form.serviceId}
            placeholder={{}}
            style={pickerSelectStyles}
          />
        </View>
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Fecha</Text>
        <TouchableOpacity 
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Ionicons name="calendar" size={20} color="#4A90E2" style={styles.buttonIcon} />
          <Text style={styles.dateText}>
            {form.date.toLocaleDateString('es-ES', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </Text>
        </TouchableOpacity>
        
        {showDatePicker && (
          <DateTimePicker
            value={form.date}
            mode="date"
            display="default"
            onChange={handleDateChange}
            minimumDate={new Date()}
          />
        )}
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Hora</Text>
        <TouchableOpacity 
          style={styles.dateButton}
          onPress={() => setShowTimePicker(true)}
        >
          <Ionicons name="time" size={20} color="#4A90E2" style={styles.buttonIcon} />
          <Text style={styles.dateText}>
            {form.date.toLocaleTimeString('es-ES', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </Text>
        </TouchableOpacity>
        
        {showTimePicker && (
          <DateTimePicker
            value={form.date}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )}
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Notas adicionales (opcional)</Text>
        <TextInput
          style={styles.notesInput}
          placeholder="Ej: Mi perro tiene miedo a los estetoscopios"
          value={form.notes}
          onChangeText={(text) => setForm({ ...form, notes: text })}
          multiline
          numberOfLines={3}
        />
      </View>
      
      <TouchableOpacity 
        style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={submitting}
      >
        {submitting ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.submitButtonText}>Agendar Cita</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    color: '#333',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    color: '#333',
    paddingRight: 30,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginTop: 20,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 10,
    textAlign: 'center',
  },
  addButton: {
    marginTop: 30,
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    padding: 15,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    fontWeight: '500',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  buttonIcon: {
    marginRight: 10,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  notesInput: {
    height: 100,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});