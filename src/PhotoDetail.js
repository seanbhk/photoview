import React, { Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

class PhotoList extends Component{
  constructor(props) {
    super(props);
    this.id = this.props.match.params.id;

    this.state = {
      title: '',
      description: '',
      userId: '',
      image: {}
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios.get("https://localhost:5001/api/photo/"+this.id)
    .then( res => {
      console.log(res);
      if(res.status == 200){
        let photo = res.data;
        this.setState({
          title: photo.title,
          description: photo.description,
          image: photo.image,
          userId: photo.userId,
        })
      }
    });
  }
  render() {
    const useStyles = makeStyles({
      root: {
        maxWidth: 345,
      },
    });
    let desc = this.state.description;
    return (
      <div>
        <Card className={useStyles.root}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="500"
              width="200"
              src={`data:image/*;base64,${this.state.image}`}
              alt={this.state.title}
              title={this.state.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {this.state.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {desc}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    );
  }
}

export default PhotoList;
