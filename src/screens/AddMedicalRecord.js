import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config';

const recordTypes = [
  { id: 'checkup', name: 'Consulta' },
  { id: 'vaccine', name: 'Vacuna' },
  { id: 'surgery', name: 'Cirugía' },
  { id: 'other', name: 'Otro' },
];

export default function AddMedicalRecord({ route, navigation }) {
  const { pet } = route.params;
  const { userToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  const [form, setForm] = useState({
    type: 'checkup',
    title: '',
    description: '',
    date: new Date(),
    nextDate: null,
    notes: '',
  });

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setForm({ ...form, date: selectedDate });
    }
  };

  const handleNextDateChange = (event, selectedDate) => {
    setShowNextDatePicker(false);
    if (selectedDate) {
      setForm({ ...form, nextDate: selectedDate });
    }
  };

  const handleSubmit = async () => {
    if (!form.title || !form.description) {
      Alert.alert('Error', 'Por favor completa todos los campos requeridos');
      return;
    }

    setLoading(true);
    try {
      const recordData = {
        pet_id: pet.id,
        type: form.type,
        title: form.title,
        description: form.description,
        date: form.date.toISOString(),
        notes: form.notes,
      };

      if (form.type === 'vaccine' && form.nextDate) {
        recordData.next_date = form.nextDate.toISOString();
      }

      await axios.post(`${API_URL}/medical-records`, recordData, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
        }
      });

      Alert.alert('Éxito', 'Registro médico agregado correctamente', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      console.error('Error adding medical record:', error);
      Alert.alert('Error', 'No se pudo agregar el registro médico');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#4A90E2" />
        </TouchableOpacity>
        <Text style={styles.title}>Nuevo Registro Médico</Text>
        <View style={{ width: 24 }} />
      </View>

      <Text style={styles.petName}>Mascota: {pet.name}</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Tipo de Registro</Text>
        <View style={styles.typeButtons}>
          {recordTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.typeButton,
                form.type === type.id && styles.typeButtonSelected,
              ]}
              onPress={() => setForm({ ...form, type: type.id })}
            >
              <Text
                style={[
                  styles.typeButtonText,
                  form.type === type.id && styles.typeButtonTextSelected,
                ]}
              >
                {type.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Título *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Vacuna contra la rabia"
          value={form.title}
          onChangeText={(text) => setForm({ ...form, title: text })}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Descripción *</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Describa el procedimiento o tratamiento"
          value={form.description}
          onChangeText={(text) => setForm({ ...form, description: text })}
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Fecha</Text>
        <TouchableOpacity 
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Ionicons name="calendar" size={20} color="#4A90E2" style={styles.buttonIcon} />
          <Text style={styles.dateText}>
            {form.date.toLocaleDateString('es-ES')}
          </Text>
        </TouchableOpacity>
        
        {showDatePicker && (
          <DateTimePicker
            value={form.date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>

      {form.type === 'vaccine' && (
        <View style={styles.formGroup}>
          <Text style={styles.label}>Próxima dosis (opcional)</Text>
          <TouchableOpacity 
            style={styles.dateButton}
            onPress={() => setShowNextDatePicker(true)}
          >
            <Ionicons name="calendar" size={20} color="#4A90E2" style={styles.buttonIcon} />
            <Text style={styles.dateText}>
              {form.nextDate ? form.nextDate.toLocaleDateString('es-ES') : 'Seleccionar fecha'}
            </Text>
          </TouchableOpacity>
          
          {showNextDatePicker && (
            <DateTimePicker
              value={form.nextDate || new Date()}
              mode="date"
              display="default"
              onChange={handleNextDateChange}
            />
          )}
        </View>
      )}

      <View style={styles.formGroup}>
        <Text style={styles.label}>Notas adicionales</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Otras observaciones"
          value={form.notes}
          onChangeText={(text) => setForm({ ...form, notes: text })}
          multiline
          numberOfLines={3}
        />
      </View>

      <TouchableOpacity 
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.submitButtonText}>Guardar Registro</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  petName: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
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
  typeButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  typeButton: {
    width: '48%',
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
  },
  typeButtonSelected: {
    backgroundColor: '#4A90E2',
  },
  typeButtonText: {
    color: '#333',
  },
  typeButtonTextSelected: {
    color: 'white',
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonIcon: {
    marginRight: 10,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});