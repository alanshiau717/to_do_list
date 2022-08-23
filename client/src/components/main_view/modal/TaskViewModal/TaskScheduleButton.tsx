import {
  GetFoldersQuery,
  ModifyTaskScheduleDocument,
  TaskDocument,
  TaskQuery,
} from "../../../../generated";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { displayDateTimeString } from "../../../../utils/TodoListHelper";
import { SmallButton } from "../../../shared/SmallButton";
import { useMutation } from "@apollo/client";

export interface Props {
  taskSchedule: TaskQuery["task"]["taskSchedule"][0];
}
export function TaskScheduleButton(props: Props) {
  const [newDate, setNewDate] = useState(
    new Date(props.taskSchedule.startTime)
  );
  const [modifyTaskSchedule] = useMutation(ModifyTaskScheduleDocument, {
    refetchQueries: [TaskDocument],
  });
  function deleteTaskSchedule(id: number) {
    modifyTaskSchedule({
      variables: {
        data: {
          id: id,
          isDeleted: true,
        },
      },
    });
  }
  function updateTaskSchedule() {
    modifyTaskSchedule({
      variables: {
        data: {
          id: parseInt(props.taskSchedule.id),
          startTime: newDate,
          endTime: new Date(
            new Date().setTime(newDate.getTime() + 60 * 60 * 1000)
          ),
          isAllDayEvent: false,
        },
      },
    });
  }

  return (
    <DatePicker
      showTimeSelect
      selected={newDate}
      onChange={(date: Date) => setNewDate(date)}
      dateFormat="dd/MM/yyyy h:mm aa"
      onBlur={() => updateTaskSchedule()}
      onCalendarClose={() => updateTaskSchedule()}
      customInput={
        <SmallButton
          text={displayDateTimeString(props.taskSchedule).toString()}
          onIconClick={() => {
            deleteTaskSchedule(parseInt(props.taskSchedule.id));
          }}
        />
      }
    />
  );
}
