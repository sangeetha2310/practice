import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import { addUserInfoService, editUserInfoService, getDataService } from "./service/action";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class DashboardForm extends Component {
  state = {
    title: "",
    author: "",
    Description: "",
    Category: "",
    ImageURL: "",
    errors: {
      title: "",
      author: "",
      Description: "",
      Category: "",
      ImageURL: "",
    },
    addPopupShow: false,
    update: false,
    deletePopupShow: false,
    listArray: [],
    index: ""
  };
  componentDidMount() {
    this.props.getDataService();
  }
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  restrictSpecialchar(e) {
    const re = /[a-zA-Z]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  }
  restrictSpecialcharAlpha(e) {
    const re = /[0-9]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  }
  addUserSumbit = e => {
    const { title, author, Category, Description, ImageURL } = this.state;
    e.preventDefault();

    const payLoad =
    {
      title, author, Category, Description, ImageURL
    }
    this.props.addUserInfoService(payLoad);

    this.setState({
      title: "",
      author: "",
      Category: "",
      Description: "",
      ImageURL: "",
      addPopupShow: false
    });
  };
  editFunction(index, each) {
    this.setState(
      {
        update: true,
        title: each.title,
        author: each.author,
        Category: each.Category,
        ImageURL: each.ImageURL,
        Description: each.Description,
        index: index
      }
    );
  }
  editUserSumbit = e => {
    e.preventDefault();
    const { title, author, Category, Description, ImageURL, index } = this.state;
    const { addUserInfo } = this.props;
    addUserInfo[index] = { title, author, Category, Description, ImageURL };
    const payLoad = addUserInfo;
    this.props.editUserInfoService(payLoad);
    this.setState({
      title: "",
      author: "",
      Category: "",
      Description: "",
      ImageURL: "",
      update: false
    });
  };


  render() {
    const { title, author, Category, Description, ImageURL, addPopupShow, update } = this.state;
    const { addUserInfo } = this.props;

    return (
      <div className="container">
        <ToastContainer />
        <div className="addProfile">
          <button onClick={() => this.setState({ addPopupShow: true })} type="button">
            Add New
                                        </button>
        </div>
        <div className="cardDetailsBg">
          {addUserInfo.length !== 0 ? (
            addUserInfo.map((item, i) => {
              console.log(addUserInfo)
              return <div className="div_container">
                <div>
                  <div className="title_one"> {item.title}</div>
                  <div className="title_two"> {item.author}</div>
                  <div className="title_two"> {item.Description}</div>
                  <div className="title_three"> {item.Category}</div>
                  <div className="title_three"> {item.ImageURL}</div>
                </div>
                <div className="cardBottomInfo">

                  <div className="profile_section">
                    <div onClick={this.editFunction.bind(this, i, item)} >
                      View
                      </div>
                  </div>
                </div>
              </div>

            })) : <div className="text-center">No Records Found</div>}
        </div>
        {/* </div> */}
        {/* <!-- Add New --> */}
        {addPopupShow && (
          <div id="addEmployeeModal" className="modal fade in">
            <div className="modal-dialog">
              <div className="modal-content">
                <form onSubmit={this.addUserSumbit}>
                  <div className="modal-header">
                    <h4 className="modal-title">Add New</h4>
                    <button
                      type="button"
                      onClick={() =>
                        this.setState({
                          addPopupShow: false,
                          author: "",
                          title: "",
                          Description: "",
                          ImageURL: "",
                          Category: ""
                        })
                      }
                      className="close"
                      data-dismiss="modal"
                      aria-hidden="true"
                    >
                      &times;
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="form-group">
                      <label>Title</label>
                      <input
                        type="text "
                        name="title"
                        value={title}
                        onKeyPress={e => this.restrictSpecialchar(e)}
                        className="form-control"
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Author</label>
                      <input
                        type="text "
                        name="author"
                        value={author}
                        onKeyPress={e => this.restrictSpecialchar(e)}
                        className="form-control"
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        type="text"
                        name="Description"
                        value={Description}
                        // onKeyPress={e => this.restrictSpecialcharAlpha(e)}
                        className="form-control"
                        onChange={this.handleChange}
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label>Category</label>
                      <select
                        name="Category"
                        className="form-control"
                        value={Category}
                        onChange={this.handleChange}
                      >
                        <option value="">Select Category</option>
                        <option value="Beauty">Beauty</option>
                        <option value="Technology">Technology</option>
                        <option value="Education">Education</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Image URL</label>
                      <input
                        type="text "
                        name="ImageURL"
                        value={ImageURL}
                        // onKeyPress={e => this.restrictSpecialchar(e)}
                        className="form-control"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <input
                      type="button"
                      onClick={() =>
                        this.setState({
                          addPopupShow: false,
                          title: "",
                          author: "",
                          Category: "",
                          Description: "",
                          ImageURL: ""
                        })
                      }
                      className="btn btn-default"
                      data-dismiss="modal"
                      value="Cancel"
                    />
                    <input
                      type="submit"
                      className="btn btn-success"
                      value="Add"
                      disabled={
                        title === "" ||
                        author === "" ||
                        Description === "" ||
                        Category === "" ||
                        ImageURL === ""
                      }
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        {/* <!-- Edit User --> */}
        {update && (
          <div id="addEmployeeModal" className="modal fade in">
            <div className="modal-dialog">
              <div className="modal-content">
                <form onSubmit={this.editUserSumbit}>
                  <div className="modal-header">
                    <h4 className="modal-title">Edit User Info</h4>
                    <button
                      type="button"
                      onClick={() =>
                        this.setState({
                          update: false,
                          title: "",
                          author: "",
                          Category: "",
                          Description: "",
                          ImageURL: ""
                        })
                      }
                      className="close"
                      data-dismiss="modal"
                      aria-hidden="true"
                    >
                      &times;
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="form-group">
                      <label>Title</label>
                      <input
                        type="text "
                        name="title"
                        value={title}
                        onKeyPress={e => this.restrictSpecialchar(e)}
                        className="form-control"
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Author</label>
                      <input
                        type="text "
                        name="author"
                        value={author}
                        onKeyPress={e => this.restrictSpecialchar(e)}
                        className="form-control"
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        type="text"
                        name="description"
                        value={Description}
                        // onKeyPress={e => this.restrictSpecialcharAlpha(e)}
                        className="form-control"
                        onChange={this.handleChange}
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label>Category</label>
                      <select
                        name="category"
                        className="form-control"
                        value={Category}
                        onChange={this.handleChange}
                      >
                        <option value="">Select Category</option>
                        <option value="Beauty">Beauty</option>
                        <option value="Technology">Technology</option>
                        <option value="Education">Education</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Image URL</label>
                      <input
                        type="text "
                        name="ImageURL"
                        value={ImageURL}
                        // onKeyPress={e => this.restrictSpecialchar(e)}
                        className="form-control"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <input
                      type="button"
                      onClick={() =>
                        this.setState({
                          update: false,
                          title: "",
                          author: "",
                          Category: "",
                          Description: "",
                          ImageURL: ""
                        })
                      }
                      className="btn btn-default"
                      data-dismiss="modal"
                      value="Cancel"
                    />
                    <input
                      type="submit"
                      className="btn btn-success"
                      value="Save"
                      disabled={
                        title === "" ||
                        author === "" ||
                        Category === "" ||
                        Description === "" ||
                        ImageURL === ""
                      }
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}


      </div>
    );
  }
}
const mapStateToProps = state => ({
  addUserInfo: state.reducer.addUserInfo,
  addUserSucc: state.reducer.addUserSucc,
  editUserSucc: state.reducer.editUserSucc
});
const mapDispatchToProps = dispatch => ({
  addUserInfoService: payLoad => dispatch(addUserInfoService(payLoad)),
  editUserInfoService: payLoad => dispatch(editUserInfoService(payLoad)),
  getDataService: () => dispatch(getDataService())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardForm);







