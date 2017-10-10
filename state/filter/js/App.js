'use strict'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: props.selected || 'All',
      projects: props.projects,
      defaultProjects: props.projects
    }

    this.handleFilterSelection = this.handleFilterSelection.bind(this);
  }

  handleFilterSelection(selected) {
    let defaultProjects = this.state.defaultProjects;
    let filteredProjects = (selected == 'All') ? defaultProjects : createFilteredArray();

    this.setState({
      selected,
      projects: filteredProjects
    });

    function createFilteredArray() {
      return defaultProjects.filter( item => {
        return item.category == selected;
      });
    }
  }
  render() {
    return (
      <div>
        <Toolbar
          filters={ this.props.filters }
          selected={ this.state.selected }
          onSelectFilter={ (selected) => this.handleFilterSelection(selected) } />
        <Portfolio projects={ this.state.projects } />
      </div>
    )
  }
}
