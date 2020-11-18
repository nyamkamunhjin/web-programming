import React from 'react';
import { Divider, List, ListItem, ListItemText } from '@material-ui/core';
import './userDetail.css';
import fetchModel from '../../lib/fetchModelData';
import { Link } from 'react-router-dom';

/**
 * Define UserDetail, a React componment of CS142 project #5
 */
class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  getUserDetails = () => {
    fetchModel(
      `http://localhost:3000/user/${this.props.match.params.userId}`
    ).then(({ data: user }) => {
      // console.log(user);
      this.setState({ user });
      this.props.contextUpdater(
        `Details of ${user.first_name} ${user.last_name}`
      );
    });
  };

  componentDidMount() {
    this.getUserDetails();
    console.log(this.props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.getUserDetails();
    }
  }

  render() {
    return (
      // <Typography variant="body1">
      //   This should be the UserDetail view of the PhotoShare app. Since it is
      //   invoked from React Router the params from the route will be in property
      //   match. So this should show details of user:
      //   {this.props.match.params.userId}. You can fetch the model for the user
      //   from window.cs142models.userModel(userId).
      // </Typography>
      <List>
        {this.state.user &&
          Object.entries(this.state.user).map(([key, value], index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText primary={`${key}: ${value}`} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        {this.state.user && (
          <ListItem>
            <ListItemText
              primary={
                <Link to={`/photos/${this.state.user._id}`}>Goto Photos</Link>
              }
            />
          </ListItem>
        )}
      </List>
    );
  }
}

export default UserDetail;
