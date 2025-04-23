import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Appointments({ navigation }) {
    const [appointments, setAppointments] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newAppointment, setNewAppointment] = useState({
        mascota_id: '',
        fecha: '',
        hora: '',
        servicio: '',
    });
    const [pets, setPets] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/appointments')
            .then(response => response.json())
            .then(data => setAppointments(data))
            .catch(error => console.error('Error al cargar las citas:', error));

        fetch('http://localhost:3000/pets')
            .then(response => response.json())
            .then(data => setPets(data))
            .catch(error => console.error('Error al cargar las mascotas:', error));
    }, []);

    const handleAddAppointment = () => {
        fetch('http://localhost:3000/appointments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newAppointment),
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errData => {
                        throw new Error(errData.message || 'Error desconocido al agregar la cita');
                    });
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    fetch('http://localhost:3000/appointments')
                        .then(response => response.json())
                        .then(updatedAppointments => setAppointments(updatedAppointments))
                        .catch(error => console.error('Error al recargar las citas:', error));
                    setModalVisible(false);
                    setNewAppointment({ mascota_id: '', fecha: '', hora: '', servicio: '' });
                } else {
                    alert('Error al agregar la cita: ' + data.message);
                }
            })
            .catch(error => console.error('Error al agregar la cita:', error));
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#4A90E2" />
                </TouchableOpacity>
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
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <View style={styles.listItemLeft}>
                            <Ionicons name="calendar-outline" size={30} color="#4A90E2" />
                        </View>
                        <View style={styles.listItemRight}>
                            <Text style={styles.listItemTitle}>{item.servicio}</Text>
                            <Text style={styles.listItemSubtitle}>Mascota: {item.nombre_mascota}</Text>
                            <Text style={styles.listItemDetail}>Fecha: {item.fecha} - Hora: {item.hora}</Text>
                            <Text style={[styles.listItemStatus, styles[item.estado.toLowerCase()]]}>{item.estado}</Text>
                        </View>
                    </View>
                )}
                contentContainerStyle={styles.list}
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Nueva Cita</Text>

                        <Text style={styles.label}>Mascota:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="ID de la mascota"
                            value={newAppointment.mascota_id}
                            onChangeText={(text) => setNewAppointment({ ...newAppointment, mascota_id: text })}
                            keyboardType="number-pad"
                        />
                        {pets.length > 0 && (
                            <Text style={styles.helperText}>
                                IDs de mascotas disponibles: {pets.map(pet => `${pet.nombre} (${pet.id})`).join(', ')}
                            </Text>
                        )}

                        <Text style={styles.label}>Fecha (YYYY-MM-DD):</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="YYYY-MM-DD"
                            value={newAppointment.fecha}
                            onChangeText={(text) => setNewAppointment({ ...newAppointment, fecha: text })}
                        />

                        <Text style={styles.label}>Hora (HH:MM):</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="HH:MM"
                            value={newAppointment.hora}
                            onChangeText={(text) => setNewAppointment({ ...newAppointment, hora: text })}
                        />

                        <Text style={styles.label}>Servicio:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Servicio"
                            value={newAppointment.servicio}
                            onChangeText={(text) => setNewAppointment({ ...newAppointment, servicio: text })}
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
    listItem: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    listItemLeft: {
        marginRight: 15,
    },
    listItemRight: {
        flex: 1,
    },
    listItemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    listItemSubtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 3,
    },
    listItemDetail: {
        fontSize: 12,
        color: '#777',
        marginBottom: 3,
    },
    listItemStatus: {
        fontSize: 14,
        fontWeight: '600',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 10,
        alignSelf: 'flex-start',
        marginTop: 5,
    },
    confirmada: {
        backgroundColor: '#E8F5E9',
        color: '#4CAF50',
    },
    pendiente: {
        backgroundColor: '#FFFDE7',
        color: '#FFC107',
    },
    cancelada: {
        backgroundColor: '#FFEBEE',
        color: '#F44336',
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
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
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
    helperText: {
        fontSize: 12,
        color: '#777',
        marginBottom: 10,
    }
});