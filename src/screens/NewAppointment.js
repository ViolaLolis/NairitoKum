import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Alert,
    TextInput
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Cambia por tu URL de API

export default function NewAppointment({ navigation }) {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [form, setForm] = useState({
        petId: '',
        fecha: new Date(),
        hora: new Date(),
        servicio: '',
    });

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const petsResponse = await axios.get(`${API_URL}/pets`);
                setPets(petsResponse.data);
            } catch (error) {
                Alert.alert('Error', 'No se pudieron cargar las mascotas. Por favor intenta más tarde.');
                console.error('Error fetching pets:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setForm(prev => ({ ...prev, fecha: selectedDate }));
        }
    };

    const handleTimeChange = (event, selectedTime) => {
        setShowTimePicker(false);
        if (selectedTime) {
            setForm(prev => ({
                ...prev,
                hora: new Date(
                    prev.hora.getFullYear(),
                    prev.hora.getMonth(),
                    prev.hora.getDate(),
                    selectedTime.getHours(),
                    selectedTime.getMinutes()
                ),
            }));
        }
    };

    const handleSubmit = async () => {
        if (!form.petId) {
            Alert.alert('Error', 'Por favor selecciona una mascota');
            return;
        }
        if (!form.fecha || !form.hora || !form.servicio) {
            Alert.alert('Error', 'Por favor completa todos los campos');
            return;
        }

        setSubmitting(true);
        try {
            const appointmentDateTime = new Date(
                form.fecha.getFullYear(),
                form.fecha.getMonth(),
                form.fecha.getDate(),
                form.hora.getHours(),
                form.hora.getMinutes()
            );

            const response = await axios.post(`${API_URL}/appointments`, {
                mascota_id: form.petId,
                fecha: appointmentDateTime.toISOString().split('T')[0], // Formato YYYY-MM-DD
                hora: appointmentDateTime.toISOString().split('T')[1].slice(0, 5), // Formato HH:MM
                servicio: form.servicio,
            });

            if (response.data.success) {
                Alert.alert('Éxito', 'Cita agendada correctamente', [
                    { text: 'OK', onPress: () => navigation.goBack() },
                ]);
            } else {
                Alert.alert('Error', response.data.message || 'Error al agendar la cita');
            }
        } catch (error) {
            console.error('Error al agendar la cita:', error);
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

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Nueva Cita</Text>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Mascota</Text>
                <View style={styles.pickerContainer}>
                    <RNPickerSelect
                        onValueChange={(value) => setForm({ ...form, petId: value })}
                        items={pets.map(pet => ({ label: pet.nombre, value: pet.id.toString() }))}
                        value={form.petId}
                        placeholder={{ label: 'Selecciona una mascota', value: null }}
                        style={pickerSelectStyles}
                    />
                </View>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Fecha</Text>
                <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
                    <Ionicons name="calendar-outline" size={20} color="#4A90E2" style={styles.icon} />
                    <Text style={styles.dateText}>{form.fecha.toLocaleDateString()}</Text>
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        value={form.fecha}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                    />
                )}
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Hora</Text>
                <TouchableOpacity style={styles.dateButton} onPress={() => setShowTimePicker(true)}>
                    <Ionicons name="time-outline" size={20} color="#4A90E2" style={styles.icon} />
                    <Text style={styles.dateText}>{form.hora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                </TouchableOpacity>
                {showTimePicker && (
                    <DateTimePicker
                        value={form.hora}
                        mode="time"
                        display="default"
                        onChange={handleTimeChange}
                    />
                )}
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Servicio</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ej: Consulta general"
                    value={form.servicio}
                    onChangeText={(text) => setForm({ ...form, servicio: text })}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
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
    icon: {
        marginRight: 10,
    },
    dateText: {
        fontSize: 16,
        color: '#333',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 15,
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        color: '#333',
        paddingRight: 30, // to ensure the arrow icon is visible
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        color: '#333',
        paddingRight: 30, // to ensure the arrow icon is visible
    },
});