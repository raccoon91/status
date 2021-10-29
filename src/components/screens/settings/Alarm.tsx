import React, { useState, useEffect, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, Switch } from "react-native";
import dayjs from "dayjs";
import { Box, Bold, Button, Feather } from "@src/components/atoms";
import { DateTimePicker } from "@src/components/organisms";
import { ScrollScreenTemplate } from "@src/components/templates";
import { WEEKS, WEEKS_NAMES } from "@src/configs";
import { getNotificationSchedule, registerLocalNotification, unregisterLocalNotification, storage } from "@src/utils";
import type { Event } from "@react-native-community/datetimepicker";

const appWidth = Dimensions.get("window").width;

export const AlarmScreen = () => {
  const navigation = useNavigation();
  const [schedule, setSchedule] = useState({});
  const [alarmEnabled, setAlarmEnabled] = useState(true);
  const [weeks, setWeeks] = useState<{ name: string; selected: boolean }[]>([]);
  const [schduleDate, setScheduleDate] = useState<Date | null>(null);
  const [isOpenTimePicker, setIsOpenTimePicker] = useState(false);

  const getSchedule = useCallback(async () => {
    const storageSchedule = await getNotificationSchedule();
    const allWeeks: { name: string; selected: boolean }[] = [];

    WEEKS_NAMES.forEach((weeksName) => {
      const week = { name: weeksName, selected: false };

      if (storageSchedule.weeks.includes(WEEKS[weeksName])) {
        week.selected = true;
      }

      allWeeks.push(week);
    });

    const scheduleDate = dayjs().hour(storageSchedule.hour).minute(storageSchedule.minute).toDate();

    setSchedule(storageSchedule);
    setAlarmEnabled(storageSchedule.alarm === "ON");
    setWeeks(allWeeks);
    setScheduleDate(scheduleDate);
  }, []);

  useEffect(() => {
    getSchedule();
  }, [getSchedule]);

  const handleToggleSwitch = () => {
    if (alarmEnabled) {
      setAlarmEnabled(false);
    } else {
      setAlarmEnabled(true);
    }
  };

  const handleSelectWeek = (index: number) => () => {
    const newWeeks = weeks.slice();

    newWeeks[index].selected = !newWeeks[index].selected;

    setWeeks(newWeeks);
  };

  const handleOpenTimePicker = () => {
    setIsOpenTimePicker(true);
  };

  const handleChangeTime = (event: Event, date?: Date) => {
    if (date) {
      setScheduleDate(date);
    }

    setIsOpenTimePicker(false);
  };

  const handleSaveAlarm = async () => {
    if (!alarmEnabled) {
      await storage.setItem("@schedule", { ...schedule, alarm: "OFF" });

      unregisterLocalNotification();

      navigation.navigate("Status");
    } else {
      const selectedWeeks: number[] = [];
      const selectedDate = dayjs(schduleDate);
      const selectedHour = selectedDate.hour();
      const selectedMinute = selectedDate.minute();

      weeks.forEach((week) => {
        if (week.selected) {
          selectedWeeks.push(WEEKS[week.name]);
        }
      });

      await storage.setItem("@schedule", {
        alarm: "ON",
        weeks: selectedWeeks,
        hour: selectedHour,
        minute: selectedMinute,
      });

      await registerLocalNotification();

      navigation.navigate("Status");
    }
  };

  return (
    <ScrollScreenTemplate
      w="80%"
      p="20px 10px"
      modal={<DateTimePicker show={isOpenTimePicker} date={schduleDate} onChange={handleChangeTime} />}
      bottomButton={
        <Button variant="black" size="lg" weight="bold" w={`${appWidth - 16}px`} h="100%" onPress={handleSaveAlarm}>
          SAVE
        </Button>
      }
    >
      <Box d="row" justify="flex-start">
        <Bold>Alarm On / Off</Bold>
      </Box>

      <Box d="row" justify="space-between" mt="20px">
        <Bold size="sm">Alarm {alarmEnabled ? "ON" : "OFF"}</Bold>

        <Switch
          trackColor={{ false: "#f8f8f8", true: "black" }}
          thumbColor={alarmEnabled ? "white" : "black"}
          ios_backgroundColor="#f8f8f8"
          onValueChange={handleToggleSwitch}
          value={alarmEnabled}
        />
      </Box>

      <Box d="row" justify="flex-start" mt="40px">
        <Bold>Alarm Weeks</Bold>
      </Box>

      <Box d="row" justify="space-between" minHeight="30px" mt="20px">
        {weeks.map((week, weekIndex) => (
          <Button
            key={week.name}
            variant={week.selected ? "black" : "disabled"}
            size="xs"
            w="36px"
            h="30px"
            px="6px"
            onPress={handleSelectWeek(weekIndex)}
          >
            {week.name}
          </Button>
        ))}
      </Box>

      <Box d="row" justify="flex-start" mt="40px">
        <Bold>Alarm Time</Bold>
      </Box>

      <Box d="row" justify="space-between" minHeight="30px" mt="20px">
        <Bold size="sm">{dayjs(schduleDate).format("A  hh : mm")}</Bold>

        <Button variant="black" h="30px" px="6px" onPress={handleOpenTimePicker}>
          <Feather name="edit" color="white" size={16} />
        </Button>
      </Box>
    </ScrollScreenTemplate>
  );
};
