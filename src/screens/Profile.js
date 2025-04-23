import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Profile({ navigation }) {
  // Estado para almacenar la información del usuario
  const [user, setUser] = useState({
    name: 'María González',
    email: 'maria@example.com',
    phone: '555-123-4567',
    address: 'Calle Falsa 123, Ciudad',
  });

  // Estado para controlar si el perfil está en modo de edición
  const [isEditing, setIsEditing] = useState(false);

  // Función para cambiar el estado de edición
  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Función para guardar los cambios del perfil (actualmente solo cambia el estado de edición)
  const handleSave = () => {
    setIsEditing(false);
    // Aquí iría la lógica real para enviar los datos actualizados al backend
    console.log('Datos guardados:', user);
  };

  // Función para actualizar el estado del usuario cuando cambia un input
  const handleChange = (field, value) => {
    setUser({ ...user, [field]: value });
  };

  // Función para manejar el cierre de sesión y navegar a la pantalla de Login
  const handleLogout = () => {
    // Aquí podrías incluir lógica adicional para limpiar tokens de autenticación,
    // restablecer estados globales de la aplicación relacionados con la sesión, etc.
    console.log('Cerrando sesión');
    navigation.navigate('Login');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Encabezado de la pantalla */}
      <View style={styles.header}>
        {/* Botón para volver a la pantalla anterior */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#4A90E2" />
        </TouchableOpacity>
        {/* Título de la pantalla */}
        <Text style={styles.title}>Mi Perfil</Text>
        {/* Botón para alternar entre editar y guardar el perfil */}
        <TouchableOpacity onPress={isEditing ? handleSave : handleEdit}>
          <Text style={styles.editButton}>{isEditing ? 'Guardar' : 'Editar'}</Text>
        </TouchableOpacity>
      </View>

      {/* Sección de la imagen de perfil */}
      <View style={styles.profileSection}>
        {/* Imagen de perfil */}
        <Image
          source={require('../assets/perfil.png')}
          style={styles.profileImage}
        />
        {/* Botón para cambiar la foto de perfil (solo visible en modo edición) */}
        {isEditing && (
          <TouchableOpacity style={styles.changePhotoButton}>
            <Text style={styles.changePhotoText}>Cambiar foto</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Sección de la información del usuario */}
      <View style={styles.infoSection}>
        {/* Campo Nombre */}
        <Text style={styles.label}>Nombre</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={user.name}
            onChangeText={(text) => handleChange('name', text)}
          />
        ) : (
          <Text style={styles.infoText}>{user.name}</Text>
        )}

        {/* Campo Correo electrónico */}
        <Text style={styles.label}>Correo electrónico</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={user.email}
            onChangeText={(text) => handleChange('email', text)}
            keyboardType="email-address"
          />
        ) : (
          <Text style={styles.infoText}>{user.email}</Text>
        )}

        {/* Campo Teléfono */}
        <Text style={styles.label}>Teléfono</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={user.phone}
            onChangeText={(text) => handleChange('phone', text)}
            keyboardType="phone-pad"
          />
        ) : (
          <Text style={styles.infoText}>{user.phone}</Text>
        )}

        {/* Campo Dirección */}
        <Text style={styles.label}>Dirección</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={user.address}
            onChangeText={(text) => handleChange('address', text)}
          />
        ) : (
          <Text style={styles.infoText}>{user.address}</Text>
        )}
      </View>

      {/* Sección del menú de opciones */}
      <View style={styles.menuSection}>
        {/* Opción Métodos de pago */}
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('PaymentMethods')}>
          <Ionicons name="card" size={24} color="#4A90E2" />
          <Text style={styles.menuText}>Métodos de pago</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        {/* Opción Configuración */}
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings" size={24} color="#4A90E2" />
          <Text style={styles.menuText}>Configuración</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        {/* Opción Ayuda */}
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Help')}>
          <Ionicons name="help-circle" size={24} color="#4A90E2" />
          <Text style={styles.menuText}>Ayuda</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        {/* Opción Cerrar sesión */}
        <TouchableOpacity style={[styles.menuItem, styles.logoutItem]} onPress={handleLogout}>
          <Ionicons name="log-out" size={24} color="#F44336" />
          <Text style={[styles.menuText, styles.logoutText]}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Hoja de estilos para el componente
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
  editButton: {
    color: '#4A90E2',
    fontSize: 16,
    fontWeight: '600',
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  changePhotoButton: {
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  changePhotoText: {
    color: '#4A90E2',
    fontSize: 14,
  },
  infoSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: '#999',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    paddingVertical: 8,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  menuSection: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
  },
  logoutItem: {
    marginTop: 10,
    borderBottomWidth: 0,
  },
  logoutText: {
    color: '#F44336',
  },
});