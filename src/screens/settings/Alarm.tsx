import React, { useState, useCallback, useEffect } from "react";
import { Dimensions, Switch } from "react-native";
import { useNavigation } from "@react-navigation/core";
import Icon from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { Container, ScrollBox, Box, OpacityBox, Text, Button } from "@src/components/atoms";
import { WEEKS_NUMBER_TO_STRING, WEEKS_STRING_TO_NUMBER } from "@src/configs";
import { getNotificationSchedule, registerLocalNotification, unregisterLocalNotification } from "@src/utils";
import type { Event } from "@react-native-community/datetimepicker";

const appWidth = Dimensions.get("window").width;

export const AlarmScreen = () => {
  const navigation = useNavigation();
  const [schedule, setSchedule] = useState({});
  const [alarmEnabled, setAlarmEnabled] = useState(true);
  const [weeks, setWeeks] = useState<{ text: string; selected: boolean }[]>([]);
  const [schduleDate, setScheduleDate] = useState<Date | null>(null);
  const [isOpenTimePicker, setIsOpenTimePicker] = useState(false);

  const getSchedule = useCallback(async () => {
    const storageSchedule = await getNotificationSchedule();
    const allWeeks = [];

    for (let i = 0; i < 7; i++) {
      const week = { text: WEEKS_NUMBER_TO_STRING[i], selected: false };

      if (storageSchedule.weeks.includes(i)) {
        week.selected = true;
      }

      allWeeks.push(week);
    }

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
      await AsyncStorage.setItem("@schedule", JSON.stringify({ ...schedule, alarm: "OFF" }));

      unregisterLocalNotification();

      navigation.navigate("Main");
    } else {
      const selectedWeeks: number[] = [];
      const selectedDate = dayjs(schduleDate);
      const selectedHour = selectedDate.hour();
      const selectedMinute = selectedDate.minute();

      weeks.forEach((week) => {
        if (week.selected) {
          selectedWeeks.push(WEEKS_STRING_TO_NUMBER[week.text]);
        }
      });

      await AsyncStorage.setItem(
        "@schedule",
        JSON.stringify({
          alarm: "ON",
          weeks: selectedWeeks,
          hour: selectedHour,
          minute: selectedMinute,
        }),
      );

      await registerLocalNotification();

      navigation.navigate("Main");
    }
  };

  return (
    <Container position="relative" f="1" bgColor="white">
      <ScrollBox f="1" justify="flex-start" w="100%" p="40px 20px 60px">
        <Box d="row" justify="flex-start" w="100%">
          <Text size="16px" weight="bold">
            Alarm On / Off
          </Text>
        </Box>

        <Box d="row" justify="space-between" w="100%" mt="20px">
          <Text size="16px" weight="bold">
            Alarm {alarmEnabled ? "ON" : "OFF"}
          </Text>

          <Switch
            trackColor={{ false: "#f8f8f8", true: "black" }}
            thumbColor={alarmEnabled ? "white" : "black"}
            ios_backgroundColor="#f8f8f8"
            onValueChange={handleToggleSwitch}
            value={alarmEnabled}
          />
        </Box>

        <Box d="row" justify="flex-start" w="100%" mt="40px">
          <Text size="16px" weight="bold">
            Alarm Weeks
          </Text>
        </Box>

        <Box d="row" justify="space-between" w="100%" mt="20px">
          {weeks.map((week, weekIndex) => (
            <OpacityBox
              key={week.text}
              w="10%"
              p="6px"
              bgColor={week.selected ? "black" : "#f8f8f8"}
              onPress={handleSelectWeek(weekIndex)}
            >
              <Text color={week.selected ? "white" : "black"}>{week.text}</Text>
            </OpacityBox>
          ))}
        </Box>

        <Box d="row" justify="flex-start" w="100%" mt="40px">
          <Text size="16px" weight="bold">
            Alarm Time
          </Text>
        </Box>

        <Box d="row" justify="space-between" w="100%" mt="20px">
          <Text size="16px" weight="bold">
            {dayjs(schduleDate).format("A  hh : mm")}
          </Text>

          <OpacityBox p="6px" bgColor="black" onPress={handleOpenTimePicker}>
            <Icon name="edit" color="white" size={20} />
          </OpacityBox>
        </Box>
      </ScrollBox>

      {schduleDate && isOpenTimePicker && (
        <DateTimePicker
          mode="time"
          display="spinner"
          value={schduleDate}
          minuteInterval={30}
          onChange={handleChangeTime}
        />
      )}

      <Box position="absolute" left="0" bottom="0" w="100%" h="60px" p="8px">
        <Button
          title="SAVE"
          size="18px"
          weight="bold"
          w={`${appWidth - 16}px`}
          h="100%"
          active={true}
          onPress={handleSaveAlarm}
        />
      </Box>
    </Container>
  );
};
