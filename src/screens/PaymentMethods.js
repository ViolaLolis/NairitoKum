import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const paymentMethodsData = [
  {
    id: '1',
    type: 'credit_card',
    lastFour: '4242',
    brand: 'visa',
    isDefault: true,
  },
  {
    id: '2',
    type: 'credit_card',
    lastFour: '5555',
    brand: 'mastercard',
    isDefault: false,
  },
];

export default function PaymentMethods({ navigation }) {
  const [paymentMethods, setPaymentMethods] = useState(paymentMethodsData);
  const [modalVisible, setModalVisible] = useState(false);
  const [newCard, setNewCard] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
  });

  const handleAddCard = () => {
    // Validación básica
    if (!newCard.number || !newCard.expiry || !newCard.cvc || !newCard.name) {
      alert('Por favor completa todos los campos');
      return;
    }

    const lastFour = newCard.number.slice(-4);
    const newPaymentMethod = {
      id: (paymentMethods.length + 1).toString(),
      type: 'credit_card',
      lastFour,
      brand: getCardBrand(newCard.number),
      isDefault: false,
    };

    setPaymentMethods([...paymentMethods, newPaymentMethod]);
    setModalVisible(false);
    setNewCard({ number: '', expiry: '', cvc: '', name: '' });
  };

  const getCardBrand = (number) => {
    if (/^4/.test(number)) return 'visa';
    if (/^5[1-5]/.test(number)) return 'mastercard';
    return 'credit_card';
  };

  const setAsDefault = (id) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id,
    })));
  };

  const renderPaymentMethod = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Ionicons 
          name={item.brand === 'visa' ? 'logo-visa' : item.brand === 'mastercard' ? 'logo-mastercard' : 'card'} 
          size={24} 
          color="#4A90E2" 
        />
        <Text style={styles.cardText}>•••• •••• •••• {item.lastFour}</Text>
      </View>
      
      <View style={styles.cardActions}>
        <TouchableOpacity onPress={() => setAsDefault(item.id)}>
          <Ionicons 
            name={item.isDefault ? 'radio-button-on' : 'radio-button-off'} 
            size={20} 
            color={item.isDefault ? '#4A90E2' : '#999'} 
          />
        </TouchableOpacity>
        <Text style={styles.defaultText}>{item.isDefault ? 'Predeterminado' : 'Usar como predeterminado'}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={paymentMethods}
        renderItem={renderPaymentMethod}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListFooterComponent={
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="add" size={24} color="#4A90E2" />
            <Text style={styles.addButtonText}>Agregar método de pago</Text>
          </TouchableOpacity>
        }
      />

      {/* Modal para agregar nueva tarjeta */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Agregar Tarjeta</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#999" />
              </TouchableOpacity>
            </View>
            
            <TextInput
              style={styles.input}
              placeholder="Número de tarjeta"
              keyboardType="numeric"
              value={newCard.number}
              onChangeText={(text) => setNewCard({...newCard, number: text})}
            />
            
            <View style={styles.rowInputs}>
              <TextInput
                style={[styles.input, { flex: 1, marginRight: 10 }]}
                placeholder="MM/AA"
                value={newCard.expiry}
                onChangeText={(text) => setNewCard({...newCard, expiry: text})}
              />
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="CVC"
                keyboardType="numeric"
                value={newCard.cvc}
                onChangeText={(text) => setNewCard({...newCard, cvc: text})}
              />
            </View>
            
            <TextInput
              style={styles.input}
              placeholder="Nombre en la tarjeta"
              value={newCard.name}
              onChangeText={(text) => setNewCard({...newCard, name: text})}
            />
            
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={handleAddCard}
            >
              <Text style={styles.saveButtonText}>Agregar Tarjeta</Text>
            </TouchableOpacity>
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
  list: {
    padding: 20,
  },
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
    marginBottom: 15,
  },
  cardText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  defaultText: {
    fontSize: 14,
    marginLeft: 10,
    color: '#666',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#4A90E2',
    borderStyle: 'dashed',
  },
  addButtonText: {
    color: '#4A90E2',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '500',
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
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
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
    backgroundColor: 'white',
  },
  rowInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});