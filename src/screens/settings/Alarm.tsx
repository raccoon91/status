import React, { useState, useEffect } from "react";
import { Dimensions, Switch } from "react-native";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { Container, ScrollBox, Box, OpacityBox, Text, Input, Button } from "@src/components/atoms";
import { SCHEDULE_WEEKS, SCHEDULE_TIME, WEEKS_NUMBER_TO_STRING, WEEKS_STRING_TO_NUMBER } from "@src/configs";
import { registerLocalNotification, unregisterLocalNotification } from "@src/utils";
import type { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

const appWidth = Dimensions.get("window").width;

const getStorageWeeksAndTime = async () => {
  const storageWeeks = await AsyncStorage.getItem("@notificationWeeks");
  const storageTime = await AsyncStorage.getItem("@notificationTime");
  let weeks: number[];
  let time: number;

  if (storageWeeks) {
    weeks = JSON.parse(storageWeeks);
  } else {
    AsyncStorage.setItem("@notificationWeeks", JSON.stringify(SCHEDULE_WEEKS));

    weeks = SCHEDULE_WEEKS;
  }

  if (storageTime) {
    time = Number(storageTime);
  } else {
    AsyncStorage.setItem("@notificationTime", String(SCHEDULE_TIME));

    time = SCHEDULE_TIME;
  }

  return { storageWeeks: weeks, stroageTime: time };
};

export const AlarmScreen = () => {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(true);
  const [weeks, setWeeks] = useState<{ text: string; selected: boolean }[]>([]);
  const [time, setTime] = useState("");
  const [timePeriod, setTimePeriod] = useState("");

  const setWeeksAndTime = async () => {
    const { storageWeeks, stroageTime } = await getStorageWeeksAndTime();
    const allWeeks = [];

    for (let i = 0; i < 7; i++) {
      const week = { text: WEEKS_NUMBER_TO_STRING[i], selected: false };

      if (storageWeeks.includes(i)) {
        week.selected = true;
      }

      allWeeks.push(week);
    }

    setWeeks(allWeeks);

    if (stroageTime > 12) {
      setTimePeriod("PM");
      setTime(String(stroageTime - 12));
    } else {
      setTimePeriod("AM");
      setTime(String(stroageTime));
    }
  };

  useEffect(() => {
    setWeeksAndTime();
  }, []);

  const handleToggleSwitch = () => {
    if (isEnabled) {
      setIsEnabled(false);
    } else {
      setIsEnabled(true);
    }
  };

  const handleSelectWeek = (index: number) => () => {
    const newWeeks = weeks.slice();

    newWeeks[index].selected = !newWeeks[index].selected;

    setWeeks(newWeeks);
  };

  const handleSelectPeriod = (period: string) => () => {
    if (timePeriod !== period) {
      setTimePeriod(period);
    }
  };

  const handleChangeTime = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const value = e.nativeEvent.text;

    setTime(value);
  };

  const handleSaveAlarm = async () => {
    if (!isEnabled) {
      await AsyncStorage.setItem("@notificationAlarm", "OFF");

      unregisterLocalNotification();

      navigation.navigate("Main");
    } else {
      const parsedWeeks: number[] = [];
      let parsedTime = Number(time);

      if (timePeriod === "AM" && (parsedTime < 0 || parsedTime > 11)) {
        Toast.show({ type: "info", text1: "Error", text2: "AM range should be 0 ~ 11" });

        return;
      } else if (timePeriod === "PM" && (parsedTime < 1 || parsedTime > 11)) {
        Toast.show({ type: "info", text1: "Error", text2: "PM range should be 1 ~ 11" });

        return;
      }

      weeks.forEach((week) => {
        if (week.selected) {
          parsedWeeks.push(WEEKS_STRING_TO_NUMBER[week.text]);
        }
      });

      await AsyncStorage.setItem("@notificationAlarm", "ON");

      if (timePeriod === "PM") {
        await AsyncStorage.setItem("@notificationTime", String(parsedTime + 12));
      } else {
        await AsyncStorage.setItem("@notificationTime", String(parsedTime));
      }

      await AsyncStorage.setItem("@notificationWeeks", JSON.stringify(parsedWeeks));

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
            Alarm {isEnabled ? "ON" : "OFF"}
          </Text>

          <Switch
            trackColor={{ false: "#f8f8f8", true: "black" }}
            thumbColor={isEnabled ? "white" : "black"}
            ios_backgroundColor="#f8f8f8"
            onValueChange={handleToggleSwitch}
            value={isEnabled}
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

        <Box d="row" justify="flex-start" w="100%" mt="20px">
          <Box d="row" justify="space-between" w="100px">
            <OpacityBox
              w="40px"
              p="8px"
              bgColor={timePeriod === "AM" ? "black" : "#f8f8f8"}
              onPress={handleSelectPeriod("AM")}
            >
              <Text color={timePeriod === "AM" ? "white" : "black"}>AM</Text>
            </OpacityBox>
            <OpacityBox
              w="40px"
              p="8px"
              bgColor={timePeriod === "PM" ? "black" : "#f8f8f8"}
              onPress={handleSelectPeriod("PM")}
            >
              <Text color={timePeriod === "PM" ? "white" : "black"}>PM</Text>
            </OpacityBox>
          </Box>

          <Box d="row" m="0 0 0 40px">
            <Input keyboardType="numeric" w="60px" h="40px" align="center" value={time} onChange={handleChangeTime} />
            <Text size="16px" weight="bold" m="0 0 0 10px">
              {": "}00
            </Text>
          </Box>
        </Box>
      </ScrollBox>

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
