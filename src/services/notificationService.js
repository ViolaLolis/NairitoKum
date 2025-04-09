import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { auth, db } from '../config/firebase';
import { doc, setDoc, getDocs, query, where, deleteDoc } from 'firebase/firestore';

// Configurar el manejo de notificaciones
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const registerForPushNotifications = async () => {
  if (!Device.isDevice) {
    console.warn('Must use physical device for Push Notifications');
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.warn('Failed to get push token for push notification!');
    return;
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log('Push token:', token);

  // Guardar el token en Firestore para el usuario actual
  const user = auth.currentUser;
  if (user) {
    await setDoc(doc(db, 'notificationTokens', user.uid), {
      token,
      userId: user.uid,
      createdAt: new Date(),
    });
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
};

export const scheduleAppointmentNotification = async (appointment) => {
  const trigger = new Date(appointment.date.getTime() - 60 * 60 * 1000); // 1 hora antes

  try {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Recordatorio de cita veterinaria',
        body: `Tienes una cita para ${appointment.petName} el ${appointment.date.toLocaleDateString()} a las ${appointment.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
        data: { appointmentId: appointment.id },
      },
      trigger,
    });
    console.log('Notification scheduled with ID:', notificationId);
    return notificationId; // Return the ID so it can be used for cancellation
  } catch (error) {
    console.error('Error scheduling notification:', error);
    return null;
  }
};

export const cancelScheduledNotification = async (notificationId) => {
  try {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
    console.log('Notification canceled with ID:', notificationId);
  } catch (error) {
    console.error('Error canceling notification:', error);
  }
};

export const cancelAllScheduledNotifications = async () => {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    console.log('All scheduled notifications canceled.');
  } catch (error) {
    console.error('Error canceling all notifications:', error);
  }
};

export const unregisterForPushNotifications = async () => {
  const user = auth.currentUser;
  if (user) {
    try {
      const querySnapshot = await getDocs(
        query(db, 'notificationTokens', where('userId', '==', user.uid))
      );
      querySnapshot.forEach(async (document) => {
        await deleteDoc(doc(db, 'notificationTokens', document.id));
        console.log('Push token removed from Firestore for user:', user.uid);
      });
    } catch (error) {
      console.error('Error removing push token from Firestore:', error);
    }
  }
};