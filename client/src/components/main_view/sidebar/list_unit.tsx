import React, {Component} from "react"
import { RouteComponentProps, withRouter } from "react-router";
import {connect} from "react-redux"
import {changeListView} from "../../../redux/reducers/mainViewSlice"
import IList from "../../../models/client/list"
import {Trash, ListCheck} from "react-bootstrap-icons"
import {Ieditlist} from "../../wrappers/main_view_wrapper"
interface Props extends RouteComponentProps{
    list: IList;
    folderId: string;
    changeListView: any;
    editList: Ieditlist;
}   

interface State {
    hover: boolean
}

class ListUnit extends Component<Props, State>{
    constructor(props: Props){
        super(props)
        this.state = {
            hover: false
        }
        this.changeHover = this.changeHover.bind(this)
    }
    changeHover(state: boolean){
        this.setState({hover: state})
    }
    render() {
        return  (
            !this.props.list.isDeleted &&
            <div onMouseEnter={() => this.changeHover(true)} onMouseLeave={()=> this.changeHover(false)}>
            <ListCheck/>
            <button onClick={()=> this.props.changeListView({list_id: this.props.list._id, folder_id: this.props.folderId})}>
            {this.props.list.name} 
            </button>
            {this.state.hover && <Trash onClick={()=>this.props.editList('delete', {listId: this.props.list._id, folderId: this.props.folderId})}/>}
            </div>
            )

    }
}

export default withRouter(connect(null, {changeListView})(ListUnit))
