var Project_List = React.createClass({
  render: function() {
    var _this = this;
    var createItem = function(project, index) {
      return (
        <li key={ index }>
          { project.name }
          <span onClick={ _this.props.removeItem.bind(null, project['.key']) }
                style={{ color: 'red', marginLeft: '10px', cursor: 'pointer' }}>
            Remove
          </span>
        </li>
      );
    };
    return <ul>{ this.props.projects.map(createItem) } </ul>
  }
});

export default React.createClass({
  mixins: [ReactFireMixin],

  getInitialState: function() {
    console.log("get initial status");
    return {

      projects: [],
      name: ''
    };
  },

  componentWillMount: function() {
    console.log("componentWillMount");
    var firebaseRef = new Firebase('https://diversityapp.firebaseio.com/projects/');
    this.bindAsArray(firebaseRef.limitToLast(25), 'projects');

  },

  onChange: function(e) {
    console.log("onChange    "+ e.target.value);
    this.setState({name: e.target.value});
  },

  removeItem: function(key) {
    console.log("remove item key" + key);
    var firebaseRef = new Firebase('https://diversityapp.firebaseio.com/projects/');
    firebaseRef.child(key).remove();
  },

  handleSubmit: function(e) {
    console.log("handleSubmits state " + this.state.name);
    e.preventDefault();
    if (this.state.name && this.state.name.trim().length !== 0) {
      this.firebaseRefs['projects'].push({
        name: this.state.name
      });
      this.setState({
        name: ''
      });
    }
  },

  render: function() {
    return (
      <div>
        <Project_List projects={ this.state.projects } removeItem={ this.removeItem } />
        <form onSubmit={ this.handleSubmit }>
          <input onChange={ this.onChange } value={ this.state.name } />
          <button>{ 'Add #' + (this.state.projects.length + 1) }</button>

        </form>
      </div>
    );
  }
});

// ReactDOM.render(<DiversityApp />, document.getElementById('todoApp3'));
