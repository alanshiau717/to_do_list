//When we receive date from server it isn't actually a real date object
import { DateTime, Interval } from "luxon";
import { TaskQuery } from "../generated";
export function convertServerDateToRealDate(date: Date): DateTime {
  return DateTime.fromJSDate(new Date(date));
}

export function convertToInterval(startDate: Date, endDate: Date): Interval {
  return Interval.fromDateTimes(new Date(startDate), new Date(endDate));
}

export function displayDateTimeString(
  taskSchedule: TaskQuery["task"]["taskSchedule"][0]
) {
  let startDate = convertServerDateToRealDate(taskSchedule.startTime);
  let endDate = convertServerDateToRealDate(taskSchedule.endTime);
  return (
    startDate.toFormat("dd/MM/yyyy h:mm a") + " - " + endDate.toFormat("h:mm a")
  );
}
