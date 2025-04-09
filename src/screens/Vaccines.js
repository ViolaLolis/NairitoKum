import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import VaccineCard from '../components/VaccineCard';

export default function Vaccines({ route, navigation }) {
  const { pet } = route.params;
  const [vaccines, setVaccines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVaccines = async () => {
      try {
        const q = query(
          collection(db, 'medicalRecords'),
          where('petId', '==', pet.id),
          where('type', '==', 'vaccine')
        );
        
        const querySnapshot = await getDocs(q);
        const vaccinesData = [];
        
        querySnapshot.forEach((doc) => {
          vaccinesData.push({
            id: doc.id,
            date: doc.data().date.toDate(),
            ...doc.data(),
          });
        });
        
        setVaccines(vaccinesData);
      } catch (error) {
        console.error('Error fetching vaccines:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVaccines();
  }, [pet.id]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Vacunas de {pet.name}</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('AddVaccine', { pet })}
        >
          <Text style={styles.addButtonText}>+ Agregar</Text>
        </TouchableOpacity>
      </View>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A90E2" />
        </View>
      ) : vaccines.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No hay vacunas registradas</Text>
        </View>
      ) : (
        <FlatList
          data={vaccines}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <VaccineCard 
              vaccine={item} 
              onPress={() => navigation.navigate('VaccineDetail', { vaccine: item })}
            />
          )}
          contentContainerStyle={styles.list}
        />
      )}
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
    backgroundColor: 'white',
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
    borderRadius: 8,
    padding: 8,
    paddingHorizontal: 12,
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
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
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  list: {
    padding: 15,
  },
});