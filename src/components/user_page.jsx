import React from 'react';
import { fetchAllUsers } from '../actions/user_actions';
import { connect } from 'react-redux';
import { UserIndexItem } from './user_index_item';
import AgeChart from './age_chart';
import GenderChart from './gender_chart';

class userPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: '',
      page: 'user'
    };
  }

  componentDidMount() {
    this.props.fetchAllUsers().then( response => {
      this.setState({ users: response.users });
    });
  }

  update(field) {
    return e => this.setState({
      [field]: e.target.value
    });
  }

  render() {
    const userItems = this.state.users.length > 0 ?
      this.state.users.map( user => {
        return (
          <UserIndexItem key={user.login.uuid} user={user} />
        );
      }) :
      null;

    if (this.state.page === 'user') {
      return (
        <div>
          <select onChange={this.update('page')}>
            <option value="user">User</option>
            <option value="age">Age</option>
            <option value="gender">Gender</option>
          </select>
          <div className='user-index'>
            {userItems}
          </div>
        </div>
      );
    } else if (this.state.page === 'age') {
      return (
        <AgeChart />
      );
    } else if (this.state.page === 'gender') {
      return (
        <GenderChart />
      );
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllUsers: () => dispatch(fetchAllUsers()),
  };
};


export default connect(null, mapDispatchToProps)(userPage);
