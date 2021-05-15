import { Component } from 'react';

import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeListView } from '../../../redux/reducers/mainViewSlice';
import IList from '../../../models/client/list';
import { CheckCircleFill } from 'react-bootstrap-icons'
import { Iedittask } from '../../wrappers/main_view_wrapper'
interface Props extends RouteComponentProps {
    list: IList,
    editTask: Iedittask
}
interface State {
    currentTask: string
}

// This component is the list displayed by the sidebar
class SidebarList extends Component<Props, State> {
    // constructor(props: Props) {
    //     super(props);

    // }
    componentDidMount() {
    }
    render() {
        const { list } = this.props;
        return (
            <div>
                {list._id}
                {list.tasks.map(
                    (task) => {
                        return (
                            <div key={task._id}><CheckCircleFill onClick={() => this.props.editTask("complete", task._id)} />{task.name}{task.done.toString()}</div>
                        )
                    }
                )}
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({ activeList: state.mainview.currentList });

export default withRouter(connect(mapStateToProps, { changeListView })(SidebarList));
