import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import styled from "styled-components";

import "./styles.css";

const url = "https://api.imgflip.com/get_memes";

const ImageDisplay = ({ url, id, name }) => {
  return (
    <div>
      <img style={{ height: 100 }} alt={id} src={url} />
      <div>{name}</div>
    </div>
  );
};

const ImportedImage = styled.h1`
  color: green;
  font-weight: 100;
`;

class App extends React.Component {
  state = {
    data: "",
    loading: true
  };

  componentDidMount = async () => {
    const {
      data: {
        data: { memes }
      }
    } = await axios.get(url);
    console.log(memes);
    await this.setState({ data: memes, loading: false });
  };

  repeatedImage = () => {
    return this.state.data.map(item => {
      return (
        <div style={{ flexWrap: "wrap" }}>
          <img style={{ height: 100 }} alt={item.id} src={item.url} />
          <ImportedImage>{item.name}</ImportedImage>
        </div>
      );
    });
  };

  render() {
    const { data } = this.state;

    console.log("readthis", data[0]);

    return (
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <section className="display-group">
          <ImageDisplay {...data[0]} />
          <ImageDisplay {...data[1]} />
          <ImageDisplay {...data[2]} />
        </section>
        <br />
        {data && <div className="display-group1">{this.repeatedImage()}</div>}

        <ImportedImage>
          this was added in order to play around with styled component
        </ImportedImage>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
