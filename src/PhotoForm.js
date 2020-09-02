import React, { Component} from 'react';
import FormControl from '@material-ui/core/FormControl';
import { TextField , Input, Button } from '@material-ui/core/';
import axios from 'axios';

class PhotoForm extends Component{
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      userId:1,
      file: {}
    }
  }

  handleChange = (name, e) => {
    this.setState({ ...this.state, [name]: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let file = this.state.file;
    console.log(this.state);
    if(Object.keys(file).length) {
      let formData = new FormData();

      formData.append("Title", this.state.title);
      formData.append("Description", this.state.description);
      formData.append("UserId", this.state.userId);
      formData.append("Image", file[0]);
      let config = {
        headers: { 'content-type': 'multipart/form-data;' }
      }
      axios.post("https://localhost:5001/api/photo/add", formData,  config)
      .then( res => {
        if(res.status == 200){
          this.props.history.push('/PhotoDetail/' + res.data);
        }
      });
    }

  }
  render() {
    return (
      <div>
      <FormControl>
        <TextField name="title" id="Title" value={this.state.title} onChange={this.handleChange.bind(this, "title")} label="Title"/><br />
        <TextField name="description" id="Description" value={this.state.description} multiline rows={4} onChange={this.handleChange.bind(this, "description")} label="Description"/><br />
        <Input type="file" id="file-upload" accept="image/*" style={{ display:'none'}} onChange={(e) => this.setState( { file : e.target.files })}/>
        <label htmlFor="file-upload">
          <Button variant="contained" color="primary" component="span">
            Select Image
          </Button>
        </label><br />
        <Button color="primary" variant="contained" onClick={this.handleSubmit.bind(this)}>Save</Button>
      </FormControl>
      </div>
    );
  }
}

export default PhotoForm;
