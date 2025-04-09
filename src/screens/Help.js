import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const faqs = [
  {
    question: '¿Cómo agendo una cita para mi mascota?',
    answer: 'Puedes agendar una cita desde la sección "Citas" en el menú inferior. Selecciona "Agendar nueva cita" y completa el formulario con los datos requeridos.',
  },
  {
    question: '¿Qué métodos de pago aceptan?',
    answer: 'Aceptamos tarjetas de crédito/débito (Visa, Mastercard), transferencias bancarias y pagos en efectivo en nuestras instalaciones.',
  },
  {
    question: '¿Puedo cancelar o reprogramar una cita?',
    answer: 'Sí, puedes cancelar o reprogramar tu cita con al menos 24 horas de anticipación desde la sección "Mis Citas".',
  },
  {
    question: '¿Qué debo hacer en caso de emergencia?',
    answer: 'En caso de emergencia fuera de horario de atención, llama a nuestro número de emergencias: 555-123-4567.',
  },
];

export default function Help({ navigation }) {
  const handleCall = () => {
    Linking.openURL('tel:5551234567');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:soporte@vetapp.com');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Centro de Ayuda</Text>
      
      <View style={styles.contactCard}>
        <Text style={styles.contactTitle}>Contacto de Soporte</Text>
        
        <TouchableOpacity style={styles.contactOption} onPress={handleCall}>
          <Ionicons name="call" size={24} color="#4A90E2" />
          <Text style={styles.contactText}>Llamar al 555-123-4567</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.contactOption} onPress={handleEmail}>
          <Ionicons name="mail" size={24} color="#4A90E2" />
          <Text style={styles.contactText}>soporte@vetapp.com</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Preguntas Frecuentes</Text>
      
      {faqs.map((faq, index) => (
        <View key={index} style={styles.faqCard}>
          <Text style={styles.faqQuestion}>{faq.question}</Text>
          <Text style={styles.faqAnswer}>{faq.answer}</Text>
        </View>
      ))}

      <TouchableOpacity 
        style={styles.chatButton}
        onPress={() => navigation.navigate('ChatSupport')}
      >
        <Ionicons name="chatbubbles" size={24} color="white" />
        <Text style={styles.chatButtonText}>Chat en Vivo con Soporte</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  contactCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#4A90E2',
  },
  contactOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  contactText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#333',
  },
  faqCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#4A90E2',
  },
  faqAnswer: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    padding: 15,
    marginTop: 20,
  },
  chatButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});