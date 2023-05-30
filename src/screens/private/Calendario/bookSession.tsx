import { useAppSelector } from "hooks/useRedux";
import { Dialog, Portal, Button, Text, Card } from "react-native-paper";

import { useCreateSessionMutation } from "slices/SessionSlice";
import { IScheduleItem } from "interfaces/ICalendar";

import { errorToast } from "utils";
import dayjs from "dayjs";

export default function BookSession({
  visible,
  hideDialog,
  sessionInfo,
  refresh,
}: {
  visible: boolean;
  hideDialog: () => void;
  sessionInfo: IScheduleItem | undefined;
  refresh: () => void;
}) {
  const currentUser = useAppSelector((state) => state.auth.user);
  const [create, { isLoading }] = useCreateSessionMutation();

  const startHour = dayjs(sessionInfo?.date).format("HH:mm A");
  const endHour = dayjs(sessionInfo?.date).add(1, "hour").format("HH:mm A");

  const getCredits = () => {
    const activeSub = currentUser?.subscriptions.find((item) => item.status);

    if (!activeSub) {
      return 0;
    }

    return activeSub.availableCredits;
  };

  async function confirmBooking() {
    const credits = getCredits();

    if (credits <= 0) {
      errorToast({
        error: "BadRequestException",
        message: "No cuentas con créditos suficientes",
        statusCode: 500,
      });
      return;
    }

    if (sessionInfo) {
      const teachers = sessionInfo.teachers;

      const booked = await create({
        duration: 60,
        sessionDate: sessionInfo.date,
        studentId: currentUser?.studentId || "",
        isFirst: currentUser?.sessions.length === 0,
        teacherId: sessionInfo.teachers[teachers.length - 1].teacherId,
        sessionNumber: currentUser?.sessions.length,
        availableCredits: credits,
      });

      if (booked) {
        hideDialog();
        refresh();
      }
    }
  }

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Agendar sesión</Dialog.Title>
        <Dialog.Content>
          <Card style={{ marginBottom: 15 }}>
            <Card.Cover
              source={{
                uri: "https://pluto.school.nz/wp-content/uploads/Teacher.png",
              }}
            />
          </Card>
          <Text variant="bodyLarge">
            Duración: <Text style={{ fontWeight: "bold" }}>60 minutos</Text>
          </Text>
          <Text variant="bodyLarge">
            Hora de inicio:{" "}
            <Text style={{ fontWeight: "bold" }}>{startHour}</Text>
          </Text>
          <Text variant="bodyLarge">
            Hora de salida:{" "}
            <Text style={{ fontWeight: "bold" }}>{endHour}</Text>
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            style={{ borderRadius: 5 }}
            textColor="white"
            buttonColor="green"
            mode="contained-tonal"
            loading={isLoading}
            onPress={confirmBooking}
          >
            Aceptar
          </Button>
          <Button
            style={{ borderRadius: 5 }}
            textColor="white"
            buttonColor="red"
            mode="contained-tonal"
            onPress={hideDialog}
          >
            Cancelar
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
