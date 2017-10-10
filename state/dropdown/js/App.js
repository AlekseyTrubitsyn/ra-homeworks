class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: this.props.options[0],
      open: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);

  }

  handleChange(option) {
    this.setState({
      active: option
    });
  }

  toggleOpen() {
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    return (
      <div className="container">
        <div className={`dropdown-wrapper ${this.state.open ? "open" : ""}`} >
          <button className={"btn"} onClick={this.toggleOpen} >
            <span>Account Settings</span>
            <i className="material-icons">public</i>
          </button>
          <ul className="dropdown">
            {this.props.options.map((option, i) => (
              <li
                className={option === this.state.active ? "active" : ""}
                onClick={() => this.handleChange(option)} >
                  <a href="#">{option}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
};

App.defaultProps = {
  options: []
}
