import FullCalendar, { EventApi, EventInput, EventInputTransformer, EventRemoveArg, EventSourceInput } from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin, { Draggable, EventReceiveArg } from "@fullcalendar/interaction"
import { useEffect, useState } from "react"
import "../../../css/calendarView.css"
import { RouteComponentProps } from "react-router"
import { CreateTaskScheduleDocument, GetFoldersQuery, GetTaskSchedulesDocument, GetTaskSchedulesQuery } from "../../../generated"
import { withRouter } from "react-router-dom"
import { useSelector } from "react-redux"
import { ApolloError, useMutation, useQuery } from "@apollo/client"
import momentTimezonePlugin from "@fullcalendar/moment-timezone"

interface TaskScheduleEventAPI extends EventApi {
  taskId: string
}
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
  const {loading, error, data} = useQuery(GetTaskSchedulesDocument);
  const [tasks2, setTasks2] = useState<GetFoldersQuery["folders"][0]["lists"][0]["tasks"]>()
  
  const [tasks, setTasks] = useState<EventInput[]>([{ title: "today's event", date: new Date() }])

  function getTasksFromCurrentList(listId: String, folderId: String): GetFoldersQuery["folders"][0]["lists"][0]["tasks"]  {
    const folderWithMatchedId = props.folders.filter(
      folder => folder._id == folderId
    )[0]
    const listWithMatchedId = folderWithMatchedId.lists.filter(
      list => list._id == listId
    )[0]
    return listWithMatchedId.tasks
  }
  const [addEvent, createTaskScheduleResponse] = useMutation(CreateTaskScheduleDocument);
  useEffect(() => {
    if(error){
      console.log(error)
    }
    if(data!= undefined){
      setTasks(transformData(data))
  }
  
  }, [data, loading, error]) 
  useEffect(() => {
    if(createTaskScheduleResponse.error){
      console.log(JSON.stringify(createTaskScheduleResponse.error, null, 2))
      console.log("error",createTaskScheduleResponse.error?.message)
    }
  }, [createTaskScheduleResponse])
  function transformData(data: GetTaskSchedulesQuery ): EventInput[]  {
    var out = data.getTaskSchedules.map(
      (taskSchedule) => {
        const {tasks, __typename, ...alreadyMappedKeys} = taskSchedule
        return {
          ...alreadyMappedKeys,
          title: tasks.name,
          taskId: tasks.id
        }
      }
    )
    console.log('this is the output of transfform data')
    console.log(out)
    return out
  }

  useEffect(() => {
    setTasks2(getTasksFromCurrentList(currentList, currentFolder))
  })

  function eventRecieveCallBack(args: EventReceiveArg) {
    let event = args.event as TaskScheduleEventAPI
    if(event.start != null && event.end != null ){
      addEvent({
        variables: {
          data: {
            taskId:   parseInt(event.taskId), 
            startTime: event.start,
            endTime: event.end,
            isAllDayEvent: false
          }
        }
      })
    }
    else{
    throw Error()
    }
  }

  function sleep(ms: number) {
    return new Promise(
      resolve => setTimeout(resolve, ms)
    );
  }
  useEffect(() => {
    let draggableEl = document.getElementById("taskbarContainer");
    if(draggableEl){
    new Draggable(draggableEl, {
      itemSelector: ".fc-event",
      eventData: function(eventEl) {
          let title = eventEl.getAttribute("title")
          let taskId = eventEl.getAttribute("id")
          return {
            title: title,
            taskId: taskId,
            duration: '01:00'
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
        id = {task._id}
      >
        {task.name}
      </div>
      ))}
    </div>
    <div id="calendar">
    <FullCalendar 
    plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin, momentTimezonePlugin]}
    initialView="timeGridWeek"
    aspectRatio={1}
    height="100%"
    headerToolbar={{left: "dayGridMonth,timeGridWeek,timeGridDay", center: "title"}}
    eventReceive={eventRecieveCallBack}
    events={tasks}
    timeZone= "Australia/Melbourne"
    />
    </div>
  </div>
  )
}


export default withRouter(CalendarContainer);