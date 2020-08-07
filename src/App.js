import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./customcss.css";
import { RocketIcon } from "@primer/octicons-react";

import { Container, Row, Col, Button, Card } from "react-bootstrap";

//https://type.fit/api/quotes API

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      items: ["No items"],
      rIndex: this.rand(),
    };
    this.newRandomCita = this.newRandomCita.bind(this);
  }

  componentDidMount = () => {
    const url = "https://type.fit/api/quotes";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          items: data,
          isLoaded: true,
        });
      })
      .catch((err) => console.log(err));
  };

  rand = (maxLimit = 100) => {
    let randomInd = Math.random() * maxLimit;
    return Math.round(randomInd);
  };

  newRandomCita() {
    this.setState({
      rIndex: this.rand(),
    });
    console.log("nuevo valor");
  }

  render() {
    const { isLoaded, items } = this.state;
    let cita = items[this.state.rIndex];

    if (!isLoaded) {
      return <div> Loading... </div>;
    } else {
      return (
        <div>
          <Container>
            <Row className="justify-content-md-center">
              <Col md="auto">
                <h1>Random Quote Machine</h1>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col md="auto">
                <div id="quote-box">
                  <Card>
                    <Card.Header>Quote</Card.Header>
                    <Card.Body>
                      <blockquote className="blockquote mb-0">
                        <p id="text">{cita.text}</p>
                        <footer className="blockquote-footer" id="author">
                          {cita.author}
                        </footer>
                      </blockquote>
                    </Card.Body>
                    <Row>
                      <Col xs={8} md={9}>
                        <Button
                          variant="success"
                          id="new-quote"
                          onClick={this.newRandomCita}
                        >
                          {" "}
                          New Quote{" "}
                        </Button>
                      </Col>
                      <Col xs={6} md={3}>
                        <a
                          id="tweet-quote"
                          href={
                            "https://twitter.com/intent/tweet?text=" +
                            cita.text +
                            cita.author
                          }
                        >
                          <Button variant="info">
                            Tweet <RocketIcon />
                          </Button>
                        </a>
                      </Col>
                    </Row>
                  </Card>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
  }
}
export default App;
