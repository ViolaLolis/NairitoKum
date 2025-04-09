import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

moment.locale('es');

const MedicalRecordCard = ({ record }) => {
  const getRecordIcon = () => {
    switch (record.type) {
      case 'vaccine':
        return 'medkit';
      case 'surgery':
        return 'medkit-outline';
      case 'checkup':
        return 'document-text';
      default:
        return 'document';
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Ionicons name={getRecordIcon()} size={24} color="#4A90E2" />
        <Text style={styles.recordTitle}>{record.title}</Text>
        <Text style={styles.recordDate}>
          {moment(record.date).format('LL')}
        </Text>
      </View>
      
      <Text style={styles.recordDescription}>{record.description}</Text>
      
      {record.notes && (
        <View style={styles.notesContainer}>
          <Text style={styles.notesLabel}>Notas:</Text>
          <Text style={styles.notesText}>{record.notes}</Text>
        </View>
      )}
      
      {record.vaccine && (
        <View style={styles.vaccineInfo}>
          <Text style={styles.vaccineLabel}>Próxima dosis:</Text>
          <Text style={styles.vaccineDate}>
            {moment(record.nextDoseDate).format('LL')}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  recordTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333',
  },
  recordDate: {
    fontSize: 14,
    color: '#666',
  },
  recordDescription: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  notesContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  notesLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 5,
  },
  notesText: {
    fontSize: 14,
    color: '#333',
  },
  vaccineInfo: {
    flexDirection: 'row',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  vaccineLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  vaccineDate: {
    fontSize: 14,
    marginLeft: 10,
    color: '#333',
  },
});

export default MedicalRecordCard;