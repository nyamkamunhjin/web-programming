import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core';
import './userPhotos.css';
import fetchModel from '../../lib/fetchModelData';
import { Link } from 'react-router-dom';

/**
 * Define UserPhotos, a React componment of CS142 project #5
 */
class UserPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photosData: null,
    };
  }

  getPhotosDatas = () => {
    fetchModel(
      `http://localhost:3000/photosOfUser/${this.props.match.params.userId}`
    ).then(({ data: photosData }) => {
      console.log(photosData);
      this.setState({ photosData });
      this.getUserDetails();
    });
  };

  getUserDetails = () => {
    fetchModel(
      `http://localhost:3000/user/${this.props.match.params.userId}`
    ).then(({ data: user }) => {
      // console.log(user);
      this.props.contextUpdater(
        `Photos of ${user.first_name} ${user.last_name}`
      );
    });
  };

  componentDidMount() {
    this.getPhotosDatas();
  }

  render() {
    return (
      <Grid container spacing={5}>
        <Grid item xs={12} className="photo-list">
          {this.state.photosData &&
            this.state.photosData.map((data, index) => (
              <Card key={index} className="card-media">
                <CardHeader title={data.date_time} />
                {/* <Typography variant="h5"></Typography> */}

                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={`/images/${data.file_name}`}
                    title={data.date_time}
                  />
                  <CardContent>
                    {data.comments &&
                      data.comments.map(
                        ({ date_time, comment, user }, index) => (
                          <React.Fragment key={index}>
                            <Divider />
                            <Typography>
                              <Link to={`/users/${user._id}`}>
                                <b>
                                  {user.first_name} {user.last_name}
                                </b>
                              </Link>{' '}
                              ({date_time})
                            </Typography>
                            <Typography variant="body2" color="primary">
                              {comment}
                            </Typography>
                            <Divider />
                          </React.Fragment>
                        )
                      )}
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
        </Grid>
      </Grid>
    );
  }
}

export default UserPhotos;
