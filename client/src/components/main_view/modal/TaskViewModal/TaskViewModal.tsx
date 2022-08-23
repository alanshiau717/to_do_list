import {
  CreateTaskScheduleDocument,
  GetFoldersDocument,
  GetFoldersQuery,
  ModifyTaskDocument,
  ModifyTaskScheduleDocument,
  TaskDocument,
  TaskQuery,
} from "../../../../generated";
import { FormControl, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Plus } from "react-bootstrap-icons";
import "../../../../css/TaskViewModal.scss";
import "react-datepicker/dist/react-datepicker.css";
import { useMutation, useQuery } from "@apollo/client";
import { SmallButton } from "../../../shared/SmallButton";
import { TaskScheduleButton } from "./TaskScheduleButton";

export interface TaskViewModalProps {
  task: GetFoldersQuery["folders"][0]["lists"][0]["tasks"][0];
}

export function TaskViewModal(props: TaskViewModalProps) {
  const [isEditingDate, setIsEditingDate] = useState(false);
  const [isAddingTaskSchedule, setIsAddingTaskSchedule] = useState(false);
  const [newTaskSchedule, setNewTaskSchedule] = useState(new Date());
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [sortedTaskSchedule, setSortedTaskSchedule] = useState<
    TaskQuery["task"]["taskSchedule"]
  >([]);
  const [date, setDate] = useState(new Date());
  const { data, loading } = useQuery(TaskDocument, {
    variables: {
      taskId: parseInt(props.task._id),
    },
  });

  useEffect(() => {
    if (data) {
      setDate(data.task.due ? new Date(data.task.due) : new Date());
      setNewTaskDescription(data.task.description ?? "");
    }
  }, [loading]);
  const [addTaskSchedule] = useMutation(CreateTaskScheduleDocument, {
    refetchQueries: [TaskDocument],
  });
  const [modifyTaskSchedule] = useMutation(ModifyTaskScheduleDocument, {
    refetchQueries: [TaskDocument],
  });
  const [modifyTask] = useMutation(ModifyTaskDocument, {
    refetchQueries: [GetFoldersDocument],
  });
  function onDescriptionChange(description: string) {
    setNewTaskDescription(description);
  }
  function handleAddTaskSchedule() {
    setIsAddingTaskSchedule(false);
    addTaskSchedule({
      variables: {
        data: {
          taskId: parseInt(props.task._id),
          startTime: newTaskSchedule,
          endTime: new Date(
            new Date().setTime(newTaskSchedule.getTime() + 60 * 60 * 1000)
          ),
          isAllDayEvent: false,
        },
      },
    });
  }

  function deleteDueDate() {
    modifyTask({
      variables: {
        data: {
          id: parseInt(props.task._id),
          due: null,
        },
      },
    });
  }

  function changeDueDate() {
    modifyTask({
      variables: {
        data: {
          id: parseInt(props.task._id),
          due: date,
        },
      },
    });
    setIsEditingDate(false);
  }

  function changeDescription() {
    modifyTask({
      variables: {
        data: {
          id: parseInt(props.task._id),
          description: newTaskDescription,
        },
      },
    });
  }

  return (
    <div>
      {data && (
        <div>
          <Modal.Header>
            <Modal.Title>{data.task.name}</Modal.Title>
          </Modal.Header>
          <Modal.Header style={{ padding: "0px 0px 10px 0px" }}>
            <div className={"container"}>
              <div className={"headingContainer"}>
                <div className={"headingText"}>Description</div>
              </div>
              {/*<div className={"bodyContainer"}>*/}
              <FormControl
                as="textarea"
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  onDescriptionChange(e.target.value);
                }}
                onBlur={() => {
                  changeDescription();
                }}
                value={newTaskDescription}
              />
            </div>
            {/*</div>*/}
          </Modal.Header>
          <Modal.Header style={{ padding: "0px 0px 10px 0px" }}>
            <div className={"container"}>
              <div className={"headingContainer"}>
                <div className={"headingText"}>Due date</div>
                {!data.task.due && (
                  <div className={"headingButton"}>
                    <Plus onClick={() => setIsEditingDate(true)} size={20} />
                  </div>
                )}
              </div>
              <div className={"bodyContainer"}>
                {isEditingDate ? (
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={date}
                    onChange={(date: Date) => setDate(date)}
                    onBlur={changeDueDate}
                    onCalendarClose={changeDueDate}
                    autoFocus={true}
                  />
                ) : data.task.due ? (
                  <SmallButton
                    text={new Date(data.task.due).toLocaleDateString()}
                    onClick={() => {
                      setIsEditingDate(true);
                    }}
                    onIconClick={() => {
                      deleteDueDate();
                    }}
                  />
                ) : null}
              </div>
            </div>
          </Modal.Header>
          <Modal.Header style={{ padding: "0px 0px 10px 0px" }}>
            <div className={"container"}>
              <div className={"headingContainer"}>
                <div className={"headingText"}>Schedule</div>
                <div className={"headingButton"}>
                  <Plus
                    onClick={() => setIsAddingTaskSchedule(true)}
                    size={20}
                  />
                </div>
              </div>
              <div className={"bodyContainer"}>
                <div className={"taskScheduleContainer"}>
                  {/*TODO: Create better way of picking time with duration*/}
                  {isAddingTaskSchedule && (
                    <DatePicker
                      showTimeSelect
                      selected={newTaskSchedule}
                      onChange={(date: Date) => setNewTaskSchedule(date)}
                      autoFocus
                      dateFormat="dd/MM/yyyy h:mm aa"
                      onBlur={handleAddTaskSchedule}
                      onCalendarClose={handleAddTaskSchedule}
                    />
                  )}
                  {data?.task.taskSchedule.map((taskSchedule) => {
                    return (
                      !taskSchedule.isDeleted && (
                        <TaskScheduleButton taskSchedule={taskSchedule} />
                      )
                    );
                  })}
                </div>
              </div>
            </div>
          </Modal.Header>
        </div>
      )}
    </div>
  );
}
