import React, { Component } from 'react';
import ITask from '../../../models/client/task'
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { CheckCircleFill, Trash } from 'react-bootstrap-icons'
import { Iedittask } from '../../wrappers/main_view_wrapper'

interface Props extends RouteComponentProps {
    task: ITask
    editTask: Iedittask
}

interface State {
    TaskName: string
    inputMode: boolean
    hover: boolean,
    showMenu: boolean,
    xPos: string,
    yPos: string
}

class TaskUnit extends Component<Props, State>{
    constructor(props: Props) {
        super(props)
        this.state = {
            TaskName: this.props.task.name,
            inputMode: false,
            hover: false,
            showMenu: false,
            xPos: "0px",
            yPos: "0px",
        }
        this.toggleNameChange = this.toggleNameChange.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.changeName = this.changeName.bind(this)
        this.changeHover = this.changeHover.bind(this)

    }
  

    toggleNameChange(e: React.MouseEvent) {
        if (e.altKey) {
            this.setState({ inputMode: true })
        }
    }
    changeHover(state: boolean) {
        this.setState({ hover: state })
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
                <div onMouseEnter={() => this.changeHover(true)} onMouseLeave={() => this.changeHover(false)}>
                    <CheckCircleFill onClick={() => this.props.editTask("complete", this.props.task._id)} />
                    <span onClick={this.toggleNameChange} >{this.state.TaskName}</span>
                    {this.state.hover && <Trash onClick={() => this.props.editTask("delete", this.props.task._id)} />}
                </div>}
            </div>

    }


}
export default withRouter(TaskUnit)