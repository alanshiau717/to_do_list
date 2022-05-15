import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"
import { useEffect, useState } from "react"
import "../../../css/calendarView.css"
import { RouteComponentProps } from "react-router"
import { GetFoldersQuery } from "../../../generated"
import { withRouter } from "react-router-dom"
import { useSelector } from "react-redux"
import { string } from "yargs"


interface Props extends RouteComponentProps {
  folders: GetFoldersQuery["folders"];
}
function CalendarContainer(props: Props) {
  const currentList = useSelector(
    (state: any) => state.mainview.currentList,
  );
  const currentFolder = useSelector(
    (state: any) => state.mainview.currentFolder
  )
  const [tasks2, setTasks2] = useState<GetFoldersQuery["folders"][0]["lists"][0]["tasks"]>()

  const [tasks, setTasks] = useState([
    { title: "Event 1", id: "1" },
    { title: "Event 2", id: "2" },
    { title: "Event 3", id: "3" },
    { title: "Event 4", id: "4" },
    { title: "Event 5", id: "5" }
  ])
  function getTasksFromCurrentList(listId: String, folderId: String): GetFoldersQuery["folders"][0]["lists"][0]["tasks"]  {

    const folderWithMatchedId = props.folders.filter(
      folder => folder._id == folderId
    )[0]
    const listWithMatchedId = folderWithMatchedId.lists.filter(
      list => list._id == listId
    )[0]
    return listWithMatchedId.tasks
  }
  
  useEffect(() => {
    setTasks2(getTasksFromCurrentList(currentList, currentFolder))
  })

  
  useEffect(() => {
    let draggableEl = document.getElementById("taskbarContainer");
    if(draggableEl){
    new Draggable(draggableEl, {
      itemSelector: ".fc-event",
      eventData: function(eventEl) {
          console.log("dragging")
          let title = eventEl.getAttribute("title")
          let id = eventEl.getAttribute("key")
          return {
            title: title,
            id: id
          }
      }
    })
  }
  }, [])

  
  return (
    <div className="calendarWrapper">
    <div id = "taskbarContainer">
      {tasks2?.map(task => (
        <div 
        className="fc-event" 
        title={task.name} 
        key ={task._id}
      >
        {task.name}
      </div>
      ))}
    </div>
    <div id="calendar">
    <FullCalendar 
    plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin]}
    initialView="timeGridWeek"
    aspectRatio={1}
    height="100%"
    headerToolbar={{left: "dayGridMonth,timeGridWeek,timeGridDay", center: "title"}}
    />
    </div>
  </div>
  )
}


export default withRouter(CalendarContainer);