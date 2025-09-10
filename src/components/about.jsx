import React from "react";

export const About = (props) => {
  return (
    <div id="about">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            {" "}
            <img src="img/ProfilePicGreySweatshirtBayPicCropped.jpg" className="img-responsive" alt="" />{" "}
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2>About us</h2>
              <p>{props.data ? props.data.paragraph : "loading..."}</p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
