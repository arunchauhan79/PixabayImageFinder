import React, { Component } from "react";
import TextField from "material-ui/TextField";
import MenuItem from "material-ui/MenuItem";
import SelectField from "material-ui/SelectField";
import ImageResults from "../image-results/ImageResults";
import axios from "axios";
class Search extends Component {
  state = {
    searchText: "",
    amount: 15,
    apiUrl: "https://pixabay.com/api",
    apiKey: "17734004-720417b3fa666ef4d7b9bb4ff",
    images: [],
  };

  onTextChange = (event) => {
    var val = event.target.value;
    this.setState(
      {
        [event.target.name]: val,
      },
      () => {
        if (val === "") {
          this.setState({ images: [] });
        } else {
          axios
            .get(
              `https://pixabay.com/api/?key=17734004-720417b3fa666ef4d7b9bb4ff&q=${this.state.searchText}&image_type=photo&per_page=${this.state.amount}&pretty=true`
            )
            .then((res) =>
              this.setState({
                images: res.data.hits,
              })
            )
            .catch((error) => console.log(error));
        }
      }
    );
  };

  onAmountChange = (event, index, value) => this.setState({ amount: value });

  render() {
    console.log(this.state.images);
    return (
      <div>
        <TextField
          name="searchText"
          value={this.state.searchText}
          onChange={this.onTextChange}
          floatingLabelText="Search For Images"
          fullWidth={true}
        />
        <SelectField
          name="amount"
          floatingLabelText="Amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
        >
          <MenuItem value={5} primaryText="5" />
          <MenuItem value={10} primaryText="10" />
          <MenuItem value={15} primaryText="15" />
          <MenuItem value={30} primaryText="30" />
          <MenuItem value={50} primaryText="50" />
        </SelectField>
        <br />
        {this.state.images.length > 0 ? (
          <ImageResults images={this.state.images} />
        ) : null}
      </div>
    );
  }
}

export default Search;
