var Member_List = React.createClass({
  render: function() {
    var _this = this;
    var createItem = function(member, index) {
      return (
        <li key={ index }>
          { member.name }
          <span onClick={ _this.props.removeItem.bind(null, member['.key']) }
                style={{ color: 'red', marginLeft: '10px', cursor: 'pointer' }}>
            Remove
          </span>
        </li>
      );
    };
    return <ul>{ this.props.members.map(createItem) } </ul>
  }
});

var DiversityApp = React.createClass({
  mixins: [ReactFireMixin],

  getInitialState: function() {
    console.log("get initial status");
    return {
      members: [],
      name: ''
    };
  },

  componentWillMount: function() {
    console.log("componentWillMount");
    var firebaseRef = new Firebase('https://diversityapp.firebaseio.com/members/');
    this.bindAsArray(firebaseRef.limitToLast(25), 'members');

  },

  onChange: function(e) {
    console.log("onChange    "+ e.target.value);
    this.setState({name: e.target.value});
  },

  removeItem: function(key) {
    console.log("remove item key" + key);
    var firebaseRef = new Firebase('https://diversityapp.firebaseio.com/members/');
    firebaseRef.child(key).remove();
  },

  handleSubmit: function(e) {
    console.log("handleSubmits state " + this.state.name);
    e.preventDefault();
    if (this.state.name && this.state.name.trim().length !== 0) {
      this.firebaseRefs['members'].push({
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
        <Member_List members={ this.state.members } removeItem={ this.removeItem } />
        <form onSubmit={ this.handleSubmit }>
          <input onChange={ this.onChange } value={ this.state.name } />
          <button>{ 'Add #' + (this.state.members.length + 1) }</button>
          
        </form>
      </div>
    );
  }
});

ReactDOM.render(<DiversityApp />, document.getElementById('members'));
