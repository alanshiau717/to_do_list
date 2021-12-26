import React from "react";
import UserAccessService from "../services/user.access";
import ToDoList from "../services/main.service";
import Calendar from "tui-calendar";
require("tui-calendar/dist/tui-calendar.css");
interface Props { }
interface State { }

export default class TestPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.getUser = this.getUser.bind(this);
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

  createCalendar() {
    var calendar = new Calendar('#calendar', {
      defaultView: 'month',
      taskView: true,
      template: {
        monthDayname: function (dayname) {
          return '<span class="calendar-week-dayname-name">' + dayname.label + '</span>';
        }
      }
    });
  }
  componentDidMount() {
    this.createCalendar()
  }
  render() {
    return (
      <div id="calendar" style={{ height: "800px" }}></div>
    );
  }
}
