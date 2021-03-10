import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";

interface Props {
  [x: string]: any;
}
//TO-DO shouldn't be optional
interface tutorial {
  title?: string;
  description?: string;
  published?: boolean;
  id?: number | null;
}
interface State {
  currentTutorial: null | tutorial;
  message: string;
}

export default class Tutorial extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getTutorial = this.getTutorial.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateTutorial = this.updateTutorial.bind(this);
    this.deleteTutorial = this.deleteTutorial.bind(this);

    this.state = {
      currentTutorial: {
        id: null,
        title: "",
        description: "",
        published: false,
      },
      message: "",
    };
  }
  //TO-DO Figure out what componentDidMount does
  componentDidMount() {
    // console.log(this.props.match.params.id);
    this.getTutorial(this.props.match.params.id);
  }

  onChangeTitle(e: React.ChangeEvent<HTMLInputElement>) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          title: title,
        },
      };
    });
  }

  onChangeDescription(e: React.ChangeEvent<HTMLInputElement>) {
    const description = e.target.value;
    this.setState(function (prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          description: description,
        },
      };
    });
    // this.setState(prevState => ({
    //   currentTutorial: {
    //     ...prevState.currentTutorial,
    //     description: description
    //   }
    // }));
  }

  getTutorial(id: number) {
    TutorialDataService.get(id)
      .then((response) => {
        this.setState({
          currentTutorial: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updatePublished(status: boolean) {
    if (this.state.currentTutorial != null) {
      var data = {
        id: this.state.currentTutorial.id,
        title: this.state.currentTutorial.title,
        description: this.state.currentTutorial.description,
        published: status,
      };
      if (
        this.state.currentTutorial.id != null ||
        this.state.currentTutorial.id != undefined
      ) {
        TutorialDataService.update(this.state.currentTutorial.id, data)
          .then((response) => {
            this.setState((prevState) => ({
              currentTutorial: {
                ...prevState.currentTutorial,
                published: status,
              },
            }));
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        throw "currentTutorial.id is either a null or undefined";
      }
    } else {
      throw "currentTutorial cannot be null or undefined";
    }
  }

  updateTutorial() {
    if (this.state.currentTutorial != null) {
      if (
        this.state.currentTutorial.id != null ||
        this.state.currentTutorial.id != undefined
      ) {
        TutorialDataService.update(
          this.state.currentTutorial.id,
          this.state.currentTutorial
        )
          .then((response) => {
            console.log(response.data);
            this.setState({
              message: "The tutorial was updated successfully!",
            });
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        throw "currentTutorial.id is either a null or undefined";
      }
    } else {
      throw "currentTutorial not defined";
    }
  }
  deleteTutorial() {
    if (this.state.currentTutorial != null) {
      if (
        this.state.currentTutorial.id != null ||
        this.state.currentTutorial.id != undefined
      ) {
        TutorialDataService.delete(this.state.currentTutorial.id)
          .then((response) => {
            console.log(response.data);
            this.props.history.push("/tutorials");
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        throw "currentTutorial.id is either a null or undefined";
      }
    } else {
      throw "currentTutorial is null";
    }
  }

  render() {
    const { currentTutorial } = this.state;

    return (
      <div>
        {currentTutorial ? (
          <div className="edit-form">
            <h4>Tutorial</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentTutorial.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentTutorial.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentTutorial.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentTutorial.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTutorial}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateTutorial}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    );
  }
}
