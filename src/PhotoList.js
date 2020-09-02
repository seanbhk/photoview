import React, { Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import axios from 'axios';

class PhotoList extends Component{
  constructor(props) {
    super(props);

    this.state = {
      photos: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios.get("https://localhost:5001/api/photo/")
    .then( res => {
      console.log(res);
      if(res.status == 200){
        let photos = res.data;
        this.setState({
          photos
        })
      }
    });
  }

  handleDetail = (id) => {
    this.props.history.push('/PhotoDetail/' + id);
  }
  
  render() {
    const useStyles = makeStyles((theme) => ({
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
      },
      gridList: {
        width: 500,
        height: 450,
      },
      icon: {
        color: 'rgba(255, 255, 255, 0.54)',
      },
    }));

    return (
      <div className={useStyles.root}>
        <GridList cellHeight={180} className={useStyles.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          </GridListTile>
          {this.state.photos.map((p, index) => (
            <GridListTile key={index}>
              <img src={`data:image/*;base64,${p.image}`} alt={p.title} />
              <GridListTileBar
                title={p.title}
                subtitle={<span>{p.description}</span>}
                actionIcon={
                  <IconButton aria-label={`info about ${p.title}`} className={useStyles.icon} onClick={this.handleDetail.bind(this, p.id)}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

export default PhotoList;
