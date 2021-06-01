import { Component } from "react";
import TaskUnit from "./task_unit";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { changeListView } from "../../../redux/reducers/mainViewSlice";
import IList from "../../../models/client/list";
import { Iedittask } from "../../wrappers/main_view_wrapper";
interface Props extends RouteComponentProps {
  list: IList;
  editTask: Iedittask;
}
interface State {
  currentTask: string;
  editTaskName: string;
}

// This component is the list displayed by the sidebar
class SidebarList extends Component<Props, State> {
  // constructor(props: Props) {
  //     super(props);

  // }
  componentDidMount() {}
  toggleNameChange(e: React.MouseEvent) {
    if (e.altKey) {
      console.log("alt key hit");
    }
  }
  render() {
    const { list } = this.props;
    return (
      <div>
        {list.tasks.map((task) => {
          return (
            <div key={task._id}>
              {!task.done && !task.isDeleted && (
                <TaskUnit
                  task={task}
                  editTask={this.props.editTask}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  activeList: state.mainview.currentList,
});

export default withRouter(
  connect(mapStateToProps, { changeListView })(SidebarList),
);
