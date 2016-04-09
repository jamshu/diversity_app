import React from 'react'
import { Link } from 'react-router'
var Member_List = React.createClass({
  render: function() {
    var _this = this;
    var createItem = function(member, index) {
      return (
        <li key={ index }>
          { member.name }

        </li>
      );
    };
    return <ul>{ this.props.members.map(createItem) } </ul>
  }
});
export default React.createClass({
  mixins: [ReactFireMixin],

  getInitialState: function() {
    console.log("get initial status");
    return {

      project: {},
      members:[],
      name: ''
    };
  },

  componentWillMount: function() {
    console.log("componentWillMount");
    var firebaseRef = new Firebase('https://diversityapp.firebaseio.com/projects');
    var key = this.props.params.project_id ;
    var memberRef = new Firebase('https://diversityapp.firebaseio.com/members/');
    this.bindAsObject(firebaseRef.child(key),'project');
    var mems = memberRef("project_id").equalTo(key);
    console.log("mems wwwwwwwww" +mems)
    this.bindAsArray(mems, 'members');


  },

    onChange: function(e) {
      console.log("onChange    "+ e.target.value);
      this.setState({name: e.target.value});
    },


    handleSubmit: function(e) {
      console.log("handleSubmits state " + this.key);
      e.preventDefault();

      if (this.state.name && this.state.name.trim().length !== 0) {
        var Ref = new Firebase('https://diversityapp.firebaseio.com/members/');
        var project_id = this.state.project.id
        console.log('project id'+ project_id)
        Ref.push({
          name: this.state.name,
          id:Date.now(),
          project_id :project_id,

        });
        this.setState({
          name: ''
        });
      }
    },
  render() {
    return (
      <div>

        <h2>{this.state.project.name}</h2>
        <h3>Add Members</h3>
        <Member_List members={ this.state.members } />
        <form onSubmit={ this.handleSubmit }>
          <input onChange={ this.onChange } value={ this.state.name } />
          <button>{ 'Add #' + (this.state.members.length + 1) }</button>

        </form>
      </div>
    )
  }
})
