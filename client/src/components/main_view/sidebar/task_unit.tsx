import React, { Component } from 'react';
import ITask from '../../../models/client/task'
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { CheckCircleFill } from 'react-bootstrap-icons'
import { Iedittask } from '../../wrappers/main_view_wrapper'
interface Props extends RouteComponentProps {
    task: ITask
    editTask: Iedittask
}

interface State {
    TaskName: string
    inputMode: boolean
}

class TaskUnit extends Component<Props, State>{
    constructor(props: Props) {
        super(props)
        this.state = {
            TaskName: this.props.task.name,
            inputMode: false
        }
        this.toggleNameChange = this.toggleNameChange.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.changeName = this.changeName.bind(this)
    }
    toggleNameChange(e: React.MouseEvent) {
        if (e.altKey) {
            this.setState({ inputMode: true })
        }
    }
    handleNameChange(e: React.ChangeEvent<HTMLInputElement>

    ) {
        this.setState({ TaskName: e.target.value })
    }
    changeName(e: React.FocusEvent<HTMLInputElement>) {
        this.props.editTask("edit", { name: this.state.TaskName, _id: this.props.task._id })
        this.setState({ inputMode: false })

    }


    render() {
        return <div>


            {this.state.inputMode ?
                <input type='text' value={this.state.TaskName} onChange={this.handleNameChange} onBlur={this.changeName} /> :
                <div><CheckCircleFill
                    onClick={() => this.props.editTask("complete", this.props.task._id)} />
                    <span onClick={this.toggleNameChange}>{this.state.TaskName}</span></div>}
        </div>

    }


}
export default withRouter(TaskUnit)