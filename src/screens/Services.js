import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import ServiceCard from '../Componentes/ServiceCard';

const servicesData = [
  {
    id: '1',
    name: 'Consulta General',
    description: 'Revisión médica básica para diagnóstico inicial',
    price: 50,
    duration: '30 min',
    includes: ['Examen físico', 'Diagnóstico inicial', 'Recomendaciones'],
  },
  {
    id: '2',
    name: 'Vacunación',
    description: 'Aplicación de vacunas según esquema de salud',
    price: 30,
    duration: '20 min',
    includes: ['Vacuna seleccionada', 'Control de temperatura', 'Registro en cartilla'],
  },
  {
    id: '3',
    name: 'Estética Canina',
    description: 'Servicio completo de baño y corte de pelo',
    price: 40,
    duration: '1 hora',
    includes: ['Baño con shampoo especial', 'Corte de pelo', 'Limpieza de oídos', 'Corte de uñas'],
  },
  {
    id: '4',
    name: 'Cirugía Menor',
    description: 'Procedimientos quirúrgicos básicos',
    price: 120,
    duration: 'Varía según procedimiento',
    includes: ['Anestesia local', 'Material quirúrgico', 'Medicamentos post-operatorios'],
  },
  {
    id: '5',
    name: 'Desparasitación',
    description: 'Tratamiento contra parásitos internos y externos',
    price: 25,
    duration: '15 min',
    includes: ['Evaluación previa', 'Aplicación del tratamiento', 'Recomendaciones'],
  },
];

export default function Services({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nuestros Servicios</Text>
      
      <FlatList
        data={servicesData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ServiceCard 
            service={item} 
            onPress={() => navigation.navigate('ServiceDetail', { service: item })}
          />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4A90E2',
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
});