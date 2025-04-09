import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AddEditPet({ route, navigation }) {
  const { pet } = route.params || {};
  const isEdit = !!pet;
  
  const [form, setForm] = useState({
    name: pet?.name || '',
    type: pet?.type || 'Perro',
    breed: pet?.breed || '',
    age: pet?.age?.toString() || '',
    weight: pet?.weight?.toString() || '',
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
    if (!form.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!form.type) newErrors.type = 'Selecciona un tipo';
    if (!form.age) newErrors.age = 'La edad es requerida';
    if (isNaN(form.age)) newErrors.age = 'La edad debe ser un número';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Aquí iría la lógica para guardar en el backend
      const petData = {
        ...form,
        age: parseInt(form.age),
        weight: form.weight ? parseFloat(form.weight) : null,
      };
      
      console.log('Datos de la mascota:', petData);
      navigation.goBack();
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
          style={[styles.input, errors.name && styles.inputError]}
          placeholder="Nombre de la mascota"
          value={form.name}
          onChangeText={(text) => handleChange('name', text)}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Tipo</Text>
        <View style={styles.typeButtons}>
          {['Perro', 'Gato', 'Otro'].map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.typeButton,
                form.type === type && styles.typeButtonSelected,
              ]}
              onPress={() => handleChange('type', type)}
            >
              <Text
                style={[
                  styles.typeButtonText,
                  form.type === type && styles.typeButtonTextSelected,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {errors.type && <Text style={styles.errorText}>{errors.type}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Raza</Text>
        <TextInput
          style={styles.input}
          placeholder="Raza de la mascota"
          value={form.breed}
          onChangeText={(text) => handleChange('breed', text)}
        />
      </View>

      <View style={styles.formRow}>
        <View style={[styles.formGroup, { flex: 1, marginRight: 10 }]}>
          <Text style={styles.label}>Edad (años)</Text>
          <TextInput
            style={[styles.input, errors.age && styles.inputError]}
            placeholder="Edad"
            keyboardType="numeric"
            value={form.age}
            onChangeText={(text) => handleChange('age', text)}
          />
          {errors.age && <Text style={styles.errorText}>{errors.age}</Text>}
        </View>

        <View style={[styles.formGroup, { flex: 1 }]}>
          <Text style={styles.label}>Peso (kg)</Text>
          <TextInput
            style={styles.input}
            placeholder="Peso"
            keyboardType="numeric"
            value={form.weight}
            onChangeText={(text) => handleChange('weight', text)}
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
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  imagePicker: {
    alignSelf: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  petImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  cameraIcon: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: '#4A90E2',
    borderRadius: 15,
    padding: 5,
  },
  formGroup: {
    marginBottom: 15,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    fontWeight: '500',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  inputError: {
    borderColor: '#F44336',
  },
  errorText: {
    color: '#F44336',
    fontSize: 14,
    marginTop: 5,
  },
  typeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  typeButton: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#eee',
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
  saveButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#F44336',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 15,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});