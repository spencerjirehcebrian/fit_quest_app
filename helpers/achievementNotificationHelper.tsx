import * as Notifications from "expo-notifications";
export default function achievementNotificationHelper(
  messageTitle: string,
  messageInput: string
) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  Notifications.scheduleNotificationAsync({
    content: {
      title: messageTitle,
      body: messageInput,
    },
    trigger: null, // Immediate notification
  });
}
