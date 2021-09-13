import React, { FC } from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import type { Event } from "@react-native-community/datetimepicker";

interface IDateTimePickerProps {
  date?: Date | null;
  show: boolean;
  onChange: (event: Event, date?: Date) => void;
}
export const DateTimePicker: FC<IDateTimePickerProps> = ({ date, show, onChange }) => {
  if (date && show) {
    return <RNDateTimePicker mode="time" display="spinner" value={date} minuteInterval={30} onChange={onChange} />;
  }

  return null;
};
