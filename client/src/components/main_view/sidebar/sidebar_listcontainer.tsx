import { Component } from 'react';

import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeListView } from '../../../redux/reducers/mainViewSlice';
import IFolder from '../../../models/client/folder';
import SidebarList from "./sidebar_list"
import { Iedittask } from '../../wrappers/main_view_wrapper'
interface Props extends RouteComponentProps {
  folders: IFolder[]
  activeList: string;
  editTask: Iedittask
}
interface State {
  showAddTask: boolean
}

// This component will be the container component for the list which will be displayed
class SidebarListContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showAddTask: false
    }
  }
  componentDidMount() {
  }
  toggleAddTask() {
    if (this.state.showAddTask === false) {
      this.setState({ showAddTask: true })
    }
    else {
      this.setState({ showAddTask: false })
    }
  }
  render() {
    const { folders } = this.props;
    return (
      <div>
        {folders.map((folder) => {
          return (
            folder.lists.map((list) => {
              return list._id === this.props.activeList ?
                (<div key={list._id}><SidebarList list={list} editTask={this.props.editTask} /> </div>) :
                (<div key={list._id}></div>)
            })
          )
        })}
        <div>
          <button onClick={() => { this.toggleAddTask() }}></button>
          {this.state.showAddTask && <form>
            <label>
              Name:
              <input type="text" name="name" />
            </label>
            <input type="submit" value="Submit" />
          </form>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({ activeList: state.mainview.currentList });

export default withRouter(connect(mapStateToProps, { changeListView })(SidebarListContainer));
