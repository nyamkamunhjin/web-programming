import React from 'react';
import { Divider, List, ListItem, ListItemText } from '@material-ui/core';
import './userList.css';
import fetchModel from '../../lib/fetchModelData';
import { Link } from 'react-router-dom';

/**
 * Define UserList, a React componment of CS142 project #5
 */
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  getUsers = () => {
    fetchModel('http://localhost:3000/user/list').then((res) => {
      // console.log(res);
      this.setState({
        users: res.data,
      });
    });
  };

  componentDidMount() {
    this.getUsers();
  }

  render() {
    return (
      <div>
        {/* <Typography variant="body1">
          This is the user list, which takes up 3/12 of the window. You might
          choose to use <a href="https://material-ui.com/demos/lists/">Lists</a>{' '}
          and <a href="https://material-ui.com/demos/dividers">Dividers</a> to
          display your users like so:
        </Typography> */}
        <List component="nav">
          {Array.isArray(this.state.users) &&
            this.state.users.map((user, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText
                    primary={
                      <Link
                        to={`/users/${user._id}`}
                      >{`${user.first_name} ${user.last_name}`}</Link>
                    }
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
        </List>
        {/* <Typography variant="body1">
          The model comes in from window.cs142models.userListModel()
        </Typography> */}
      </div>
    );
  }
}

export default UserList;
