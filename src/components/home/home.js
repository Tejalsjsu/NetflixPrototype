var { Button } = require("react-bootstrap");
var img1 = require("../../image/homeBG.png");
var img2 = require("../../image/banner2.png");
var React = require("react");
var Carousel = require("react-bootstrap").Carousel;
let imgStyle = { width: "100%", height: "770px" };
let footerText = { color: "#5DADE2" };

function Home() {
  return (
    <div className=".container-fluid">
      <div id="myCarousel" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner" role="listbox">
          <Carousel>
            <Carousel.Item>
              <img style={imgStyle} alt="freelance.com" src={img1} />
              <Carousel.Caption>
                <a href="/login">
                  <Button bsStyle="danger" bsSize="large">
                    {" "}
                    Login{" "}
                  </Button>{" "}
                </a>{" "}
                &nbsp;&nbsp;&nbsp;
                <a href="/signup">
                  <Button bsStyle="danger" bsSize="large">
                    {" "}
                    Signup{" "}
                  </Button>{" "}
                </a>
                <h3>Netflix </h3>
                <p>Watch at your convinience.</p>
              </Carousel.Caption>
            </Carousel.Item>
            {/*<Carousel.Item>*/}
            {/*<img style={imgStyle} alt="freelance.com" src={img2} />*/}
            {/*<Carousel.Caption>*/}
            {/*<h3>Netflix</h3>*/}
            {/*<p>atch from anywhere, anytime.</p>*/}
            {/*</Carousel.Caption>*/}
            {/*</Carousel.Item>*/}
          </Carousel>
        </div>
      </div>
      <div className="container">
        <div className="col-sm-8">
          <h2> No Interested? </h2>
          <p>
            If you decide Netflix isn't for you - no problem. No commitment.
            Cancel online anytime.
          </p>
          <p>
            Whatever your needs, there will be a freelancer to get it done: from
            web design, mobile app development, virtual assistants, product
            manufacturing, and graphic design (and a whole lot more).
          </p>
          <p>
            {" "}
            With secure payments and thousands of reviewed professional to
            choose from, Netflix.com is the simplest and safest way to get work
            done online.
          </p>
          <br />
          <div align="left">
            &#x2705; What’s great about it? <br />
            &#x2705; You only have to pay for work when it has been completed
            and you’re 100% satisfied. <br />
            &#x2705;You’ll receive free videos from our talented artists within
            seconds. <br />
            &#x2705; We’re always here to help. Our support consists of real
            people who are available 24/7. <br />
            &#x2705; You can live chat to get constant updates on the progress
            of your work. <br />
          </div>
        </div>
      </div>
      <div>
        <br />
        <footer className="footer">
          <p style={footerText}>
            Netflix ® is a registered Trademark of Freelancer Technology Pty
            Limited (ACN 142 189 759) Copyright © 2018 Netflix Technology Pty
            Limited (ACN 142 189 759)
          </p>
        </footer>
      </div>
    </div>
  );
}

module.exports = Home;
