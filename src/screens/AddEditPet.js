import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function AddEditPet({ route, navigation }) {
  const { pet, usuario_id } = route.params || {};
  const isEdit = !!pet;

  const [form, setForm] = useState({
    nombre: pet?.nombre || '',
    especie: pet?.especie || 'Perro',
    raza: pet?.raza || '',
    edad: pet?.edad?.toString() || '',
    peso: pet?.peso?.toString() || '',
    image: pet?.image || require('../assets/perfil.png'),
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    navigation.setOptions({
      title: isEdit ? 'Editar Mascota' : 'Agregar Mascota',
    });
  }, [isEdit]);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!form.especie) newErrors.especie = 'Selecciona un tipo';
    if (!form.edad) newErrors.edad = 'La edad es requerida';
    if (isNaN(form.edad)) newErrors.edad = 'La edad debe ser un número';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
  
    const petData = {
      nombre: form.nombre,
      especie: form.especie,
      raza: form.raza,
      edad: parseInt(form.edad),
      peso: form.peso ? parseFloat(form.peso) : null,
      usuario_id: usuario_id || 1, // Usa el usuario_id correcto o uno por defecto
    };
  
    console.log('🚀 Pet Data:', petData); // Añadimos un log para ver los datos antes de enviarlos
  
    try {
      const response = await fetch('http://192.168.1.7:3000/pets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(petData),
      });
  
      const result = await response.json();
  
      if (result.success) {
        Alert.alert('Éxito', 'Mascota registrada correctamente');
        navigation.goBack();
      } else {
        Alert.alert('Error', result.message || 'No se pudo registrar la mascota');
      }
    } catch (error) {
      console.error('❌ Error al guardar mascota:', error);
      Alert.alert('Error', 'Hubo un problema al guardar la mascota');
    }
  };
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      handleChange('image', { uri: result.assets[0].uri });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        <Image source={form.image} style={styles.petImage} />
        <View style={styles.cameraIcon}>
          <Ionicons name="camera" size={24} color="white" />
        </View>
      </TouchableOpacity>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={[styles.input, errors.nombre && styles.inputError]}
          placeholder="Nombre de la mascota"
          value={form.nombre}
          onChangeText={(text) => handleChange('nombre', text)}
        />
        {errors.nombre && <Text style={styles.errorText}>{errors.nombre}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Tipo</Text>
        <View style={styles.typeButtons}>
          {['Perro', 'Gato', 'Otro'].map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.typeButton,
                form.especie === type && styles.typeButtonSelected,
              ]}
              onPress={() => handleChange('especie', type)}
            >
              <Text
                style={[
                  styles.typeButtonText,
                  form.especie === type && styles.typeButtonTextSelected,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {errors.especie && <Text style={styles.errorText}>{errors.especie}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Raza</Text>
        <TextInput
          style={styles.input}
          placeholder="Raza de la mascota"
          value={form.raza}
          onChangeText={(text) => handleChange('raza', text)}
        />
      </View>

      <View style={styles.formRow}>
        <View style={[styles.formGroup, { flex: 1, marginRight: 10 }]}>
          <Text style={styles.label}>Edad (años)</Text>
          <TextInput
            style={[styles.input, errors.edad && styles.inputError]}
            placeholder="Edad"
            keyboardType="numeric"
            value={form.edad}
            onChangeText={(text) => handleChange('edad', text)}
          />
          {errors.edad && <Text style={styles.errorText}>{errors.edad}</Text>}
        </View>

        <View style={[styles.formGroup, { flex: 1 }]}>
          <Text style={styles.label}>Peso (kg)</Text>
          <TextInput
            style={styles.input}
            placeholder="Peso"
            keyboardType="numeric"
            value={form.peso}
            onChangeText={(text) => handleChange('peso', text)}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
        <Text style={styles.saveButtonText}>{isEdit ? 'Guardar Cambios' : 'Agregar Mascota'}</Text>
      </TouchableOpacity>

      {isEdit && (
        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Eliminar Mascota</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
  imagePicker: { alignSelf: 'center', marginBottom: 20, position: 'relative' },
  petImage: { width: 150, height: 150, borderRadius: 75 },
  cameraIcon: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: '#4A90E2',
    borderRadius: 15,
    padding: 5,
  },
  formGroup: { marginBottom: 15 },
  formRow: { flexDirection: 'row', justifyContent: 'space-between' },
  label: { fontSize: 16, marginBottom: 8, color: '#333', fontWeight: '500' },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  inputError: { borderColor: '#F44336' },
  errorText: { color: '#F44336', fontSize: 14, marginTop: 5 },
  typeButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
  typeButton: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#eee',
    alignItems: 'center',
  },
  typeButtonSelected: { backgroundColor: '#4A90E2' },
  typeButtonText: { color: '#333' },
  typeButtonTextSelected: { color: 'white' },
  saveButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  deleteButton: {
    backgroundColor: '#F44336',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 15,
  },
  deleteButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});
