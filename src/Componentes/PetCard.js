import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function PetCard({ pet, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={require('../assets/perfil.png')} // o pet.image si tienes imágenes dinámicas
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{pet.nombre}</Text>
        <Text style={styles.details}>
          {pet.especie} • {pet.raza || 'Sin raza'}
        </Text>
        <Text style={styles.details}>Edad: {pet.edad} años</Text>
        <Text style={styles.details}>Peso: {pet.peso} kg</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  details: {
    fontSize: 14,
    color: '#666',
  },
});
