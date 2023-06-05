import { memo, useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { DayAgenda } from "react-native-calendars/src/types";
import { useIsFocused } from "@react-navigation/native";
import { Avatar } from "react-native-paper";

import idCalendar from "./idCalendar";
import dayjs from "utils/date/dayjs";

import {
  Agenda,
  DateData,
  AgendaEntry,
  AgendaSchedule,
} from "react-native-calendars";
import { TopNavigation } from "@ui-kitten/components";

import { Container, NavigationAction, Text } from "components";

import Session from "models/Session";

import { days } from "utils";
import { getWeekRangeBasedOnDay } from "utils/date";

import { IScheduleItem } from "interfaces/ICalendar";
import {
  useLazyGetAllSessionsByStudentQuery,
  useLazyGetAllTeachersSessionsByLevelQuery,
} from "slices/SessionSlice";
import { useAppSelector } from "hooks/useRedux";

import BookSession from "./bookSession";

const Calendario = memo(() => {
  const [visible, setVisible] = useState(false);
  const [firstDay, setFirstDay] = useState("");

  const [items, setItems] = useState<AgendaSchedule>({});
  const [session, setSession] = useState<IScheduleItem>();

  const isFocused = useIsFocused();
  const currentUser = useAppSelector((state) => state.auth.user);
  const [refresh, { isFetching }] = useLazyGetAllTeachersSessionsByLevelQuery();
  const [fetch] = useLazyGetAllSessionsByStudentQuery();

  useEffect(() => {
    if (isFocused) {
      setWeek();
    }
  }, [isFocused]);

  async function fetchSchedule(start: string, end: string) {
    const studentSessions = await fetch(currentUser?.studentId || "").unwrap();
    const schedule = await refresh(
      `?level=${
        currentUser?.level as string
      }&start=${start}&end=${end}&student=${currentUser?.studentId}`
    ).unwrap();

    const newItems: AgendaSchedule = {};

    for (let i = 0; i < 7; i++) {
      const actualDate = dayjs(start).add(i, "day");
      const dayName = days[actualDate.day()];
      const dayHoursRange = schedule[dayName];
      const dayFormatted = actualDate.format().split("T")[0];

      const emptyItem = {
        name: JSON.stringify({
          displayText: "N/A",
          teachers: [],
          date: "",
        }),
        height: 50,
        day: dayFormatted,
      };

      if (dayHoursRange) {
        let itemsForDate: AgendaEntry[] = [];

        Object.keys(dayHoursRange).forEach((hour) => {
          const teachersAvailable = dayHoursRange[hour];
          const spotAvailable = dayjs(
            `${dayFormatted} ${hour}`,
            "YYYY-MM-DD hh:mm A"
          );

          const spotOccupied = studentSessions.find((session: Session) => {
            return (
              dayjs(session.sessionDate).format("YYYY-MM-DD hh:mm A") ===
              spotAvailable.format("YYYY-MM-DD hh:mm A")
            );
          });

          if (
            !spotOccupied &&
            teachersAvailable.length !== 0 &&
            spotAvailable.isBetween(
              dayjs().add(1, "hour"),
              dayjs().add(8, "day")
            )
          ) {
            itemsForDate.push({
              name: JSON.stringify({
                date: spotAvailable.toDate(),
                teachers: teachersAvailable,
                displayText: `Espacio disponible - ${hour} : ${spotAvailable
                  .add(1, "hour")
                  .format("hh:mm A")}`,
              }),
              height: 50,
              day: dayFormatted,
            });
          }
        });

        newItems[dayFormatted] = itemsForDate;
      }

      if (!dayHoursRange || newItems[dayFormatted].length === 0) {
        newItems[dayFormatted] = [emptyItem];
      }
    }

    setItems({});
    setItems(newItems);
  }

  function setWeek(day?: DateData) {
    const { firstDayOfWeek, lastDayOfWeek } = getWeekRangeBasedOnDay(
      day ? day.dateString : new Date().toISOString()
    );

    if (firstDayOfWeek !== firstDay) {
      setFirstDay(firstDayOfWeek);
      fetchSchedule(firstDayOfWeek, lastDayOfWeek);
    }
  }

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const reservationsKeyExtractor = (item: DayAgenda, index: number) => {
    return `${item?.reservation?.day}${index}`;
  };

  const renderItem = (reservation: AgendaEntry) => {
    const sessionSelected: IScheduleItem = JSON.parse(reservation.name);
    const startHour = dayjs(sessionSelected.date).format("HH:mm A");
    const endHour = dayjs(sessionSelected.date)
      .add(1, "hour")
      .format("HH:mm A");

    return (
      <TouchableOpacity
        testID={idCalendar.agenda.ITEM}
        style={[styles.item, { height: 80 }]}
        onPress={() => {
          setSession(sessionSelected);
          showDialog();
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 4, justifyContent: "center" }}>
            <Text style={{ fontSize: 14, color: "black" }}>
              {sessionSelected.displayText === "N/A"
                ? "Sin cupo"
                : `${startHour} - ${endHour}`}
            </Text>
            <Text
              style={{
                fontSize: 22,
                color: sessionSelected.displayText === "N/A" ? "red" : "green",
                fontWeight: "bold",
              }}
            >
              {sessionSelected.displayText === "N/A"
                ? "No disponible"
                : "Disponible"}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Avatar.Text
              size={60}
              label={
                sessionSelected.displayText === "N/A"
                  ? "N/A"
                  : startHour.substring(0, 2)
              }
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  const rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
    return r1.name !== r2.name;
  };

  return (
    <Container style={styles.container}>
      <TopNavigation
        title={"Calendario"}
        accessoryLeft={
          <NavigationAction
            icon="refresh"
            status="primary"
            onPress={() => setWeek()}
          />
        }
      />
      <Agenda
        items={items}
        refreshing={isFetching}
        pastScrollRange={1}
        futureScrollRange={2}
        showClosingKnob={true}
        markingType="multi-dot"
        renderItem={renderItem}
        rowHasChanged={rowHasChanged}
        renderEmptyDate={renderEmptyDate}
        testID={idCalendar.agenda.CONTAINER}
        minDate={new Date().toLocaleDateString()}
        selected={new Date().toLocaleDateString()}
        reservationsKeyExtractor={reservationsKeyExtractor}
        onDayChange={setWeek}
        onDayPress={setWeek}
        theme={{
          agendaDayTextColor: "black",
          agendaDayNumColor: "black",
          agendaTodayColor: "green",
        }}
      />

      <BookSession
        refresh={() => {
          setWeek();
        }}
        sessionInfo={session}
        hideDialog={hideDialog}
        visible={visible}
      />
    </Container>
  );
});

export default Calendario;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  item: {
    flex: 2,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    borderRadius: 5,
    backgroundColor: "white",
  },
  emptyDate: {
    flex: 1,
    height: 15,
    paddingTop: 30,
    backgroundColor: "blue",
  },
});
