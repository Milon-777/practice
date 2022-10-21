import { Component } from "react";

import "./search-panel.css";

class SearchPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
    };
  }

  handleSearchChange = (e) => {
    const searchText = e.target.value;
    this.setState({ searchText });
    this.props.handleSearchUpdate(searchText);
  };

  render() {
    return (
      <input
        type="text"
        className="form-control search-input"
        placeholder="Знайти співробітника"
        value={this.state.searchText}
        onChange={this.handleSearchChange}
      />
    );
  }
}

export default SearchPanel;
