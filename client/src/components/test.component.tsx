import React from "react";
import UserAccessService from "../services/user.access";
import ToDoList from "../services/main.service";
import Calendar from '@toast-ui/react-calendar';
import TUICalendar, { IEventObject, IEventScheduleObject, IEventWithCreationPopup, ISchedule, TEventBeforeCreateSchedule } from 'tui-calendar';
import 'tui-calendar/dist/tui-calendar.css';


import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
interface Props { }
interface State {
  calendarRef: any,
  calendarConfig: any;
  schedule: ISchedule[];
}

export default class TestPage extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    const start = new Date(Date.now())
    this.state = {
      calendarRef: React.createRef(),
      calendarConfig: {
        // defaultView: 'day',
        taskView: true
      },
      schedule: [
        {
          calendarId: "1",
          category: "time",
          isVisible: true,
          title: "Study",
          id: "1",
          body: "Test",
        },
        {
          calendarId: "2",
          category: "time",
          isVisible: true,
          title: "Meeting",
          id: "2",
          body: "Description",
          start: new Date(new Date().setHours(start.getHours() + 1)),
          end: new Date(new Date().setHours(start.getHours() + 2))
        }
      ]
    }
    this.getUser = this.getUser.bind(this);
    this.onClickSchedule = this.onClickSchedule.bind(this);
    this.onBeforeCreateSchedule = this.onBeforeCreateSchedule.bind(this);
    this.onBeforeUpdateSchedule = this.onBeforeUpdateSchedule.bind(this);
  }
  getUser() {
    console.log(UserAccessService.getCurrentUser());
    ToDoList.getTask({})
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }


  onClickSchedule() {
    console.log('hit clickc schedule')
  }

  handleClickNextButton = () => {
    const calendarInstance = this.getCalendar();


    // const calendarInstance = this.state.calendarRef.current.getInstance();
    calendarInstance.next();
    // calendarInstance.changeView('day', true)
  };

  changeView(view: string) {
    this.getCalendar().changeView(view);
  }
  onBeforeCreateSchedule(scheduleData: IEventWithCreationPopup) {

    console.log(scheduleData)
    const schedule = {
      id: String(Math.random()),
      title: scheduleData.title,
      isAllDay: scheduleData.isAllDay,
      start: scheduleData.start,
      end: scheduleData.end,
      category: scheduleData.isAllDay ? "allday" : "time",
      dueDateClass: "",
      location: scheduleData.location,
      // raw: {
      //   class: scheduleData.raw["class"]
      // },
      state: scheduleData.state
    };

    this.getCalendar().createSchedules([schedule]);
  }

  onBeforeUpdateSchedule(scheduleData: IEventObject) {
    const { schedule, changes } = scheduleData
    this.getCalendar().updateSchedule(
      schedule.id!,
      schedule.calendarId!,
      changes!
    )

  }
  getCalendar(): TUICalendar {
    return this.state.calendarRef.current.getInstance();
  }
  render() {
    return (
      <div>
        <button onClick={this.handleClickNextButton}>Go next!</button>
        <button onClick={() => this.changeView('week')}> Week View</button>
        <button onClick={() => this.changeView('day')}>Day View</button>
        <button onClick={() => this.changeView('month')}>Month View</button>



        <Calendar
          height="800px"
          ref={this.state.calendarRef}
          useCreationPopup={true}
          useDetailPopup={true}
          // onClickSchedule={this.onClickSchedule()}
          onBeforeUpdateSchedule={this.onBeforeUpdateSchedule}
          onBeforeCreateSchedule={(e) => this.onBeforeCreateSchedule(e as IEventWithCreationPopup)}
          schedules={this.state.schedule}
          timezones={[
            {
              timezoneName: 'Asia/Seoul',
              displayLabel: 'GMT+09:00',
              tooltip: 'Seoul'
            },
            {
              timezoneName: 'America/New_York',
              displayLabel: 'GMT-05:00',
              tooltip: 'New York',
            }
          ]}
          week={{ showTimezoneCollapseButton: true, timezonesCollapsed: false }}

          view="week"
        />
      </div>
    );
  }
}
