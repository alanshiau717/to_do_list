import React from "react";
import UserAccessService from "../services/user.access";
import ToDoList from "../services/main.service";
import Calendar from '@toast-ui/react-calendar';
import TUICalendar, { IEventObject, IEventScheduleObject, IEventWithCreationPopup, ISchedule, TEventBeforeCreateSchedule } from 'tui-calendar';
import 'tui-calendar/dist/tui-calendar.css';
// import {ListsApiFactory} from "../../../build/api"
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import {UserApiFactory, FoldersApiFactory} from "../apiClient/api"
import {Configuration} from "../apiClient/configuration"
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import Cookies from "universal-cookie"
// import { BaseAPI, BASE_PATH } from "../apiClient/base";
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
    this.testCall = this.testCall.bind(this)
  }
  responseGoogleFailure(response: GoogleLoginResponse | GoogleLoginResponseOffline) {
    console.log("")
    console.log(response)
  }
  callProtectedRoute(){
    console.log(process.env.REACT_APP_SECRET_NAME)
    let config = new Configuration();
    config.baseOptions = {withCredentials: true}
    FoldersApiFactory(config,"http://localhost:3001",undefined).getFolder().then((res) => {
      console.log(res.data)
    }).catch((err) => {
      console.log(err.response)
    })
  }
  responseGoogleSuccess(response: GoogleLoginResponse | GoogleLoginResponseOffline) {
    if("profileObj" in response) {
      console.log(response.getAuthResponse().id_token)
      UserApiFactory(undefined,"http://localhost:3001",undefined).googleLogin({idToken:response.getAuthResponse().id_token}).then((response)=> {
        console.log("this is the token",response.data)
        console.log("this is headers", response.headers)
        const cookies = new Cookies();
        cookies.set('token', response.data, { path: '/' });
        let config = new Configuration();
        config.baseOptions = {withCredentials: true}
        FoldersApiFactory(config,"http://localhost:3001",undefined).getFolder().then((res) => {
          console.log(res.data)
        }).catch((err) => {

          console.log(err)
        })
        
      }).catch(
        (err) => {
          console.log(err.response.data)
          console.log(err)
        }
      )
      
    }
  }

  
  testCall() {
    // ListsApiFactory().getUsers();
    
    const jwt = localStorage.getItem("jwt")
    FoldersApiFactory().getFolder()
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
        {/* <button onClick={() => this.testCall()}>Test Button</button> */}
        <button onClick={() => this.callProtectedRoute()}>Test Button</button>
        <GoogleLogin
        clientId="154518758211-0h56764sro2iimsjkh1hu2svmsc86c76.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={this.responseGoogleSuccess}
        onFailure={this.responseGoogleFailure}
        cookiePolicy={'single_host_origin'}
      />



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
