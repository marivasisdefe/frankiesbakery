// import { useState } from "react";
import emailjs from "emailjs-com";
import React from "react";

const initialState = {
  name: "",
  email: "",
  message: "",
};
export const FooterContact = (props) => {
  // const [{ name, email, message }, setState] = useState(initialState);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setState((prevState) => ({ ...prevState, [name]: value }));
  // };
  // const clearState = () => setState({ ...initialState });


  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(name, email, message);

  {/* replace below with your own Service ID, Template ID and Public Key from your EmailJS account */ }

  //   emailjs
  //     .sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", e.target, "YOUR_PUBLIC_KEY")
  //     .then(
  //       (result) => {
  //         console.log(result.text);
  //         clearState();
  //       },
  //       (error) => {
  //         console.log(error.text);
  //       }
  //     );
  // };
  return (
    <div>
      <div id="footerContact">
        <div className="container">
          {/* <div className="col-md-8">
            <div className="row">
              <div className="section-title">
                <h2>Get In Touch</h2>
              </div>

            </div>
          </div> */}
          <div className="col-md-12">
            <div className="row">
              <div className="social">
                <ul>
                  <li>
                    <a target="_blank" href={"https://www.youtube.com/@frankiegriviera"}>
                      {/* <a href={props.data ? props.data.youtube : "/"}> */}
                      <i className="fa fa-youtube"></i>
                    </a>
                  </li>
                  <li>
                    <a target="_blank" href={"https://www.linkedin.com/in/frankie-riviera/"}>
                      {/* <a href={props.data ? props.data.twitter : "/"}> */}
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </li>
                  <li>
                    <a target="_blank" href={"https://www.instagram.com/frankiegriviera"}>
                      {/* <a href={props.data ? props.data.twitter : "/"}> */}
                      <i className="fa fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a target="_blank" href={"https://www.facebook.com/frankie.riviera"}>
                      {/* <a href={props.data ? props.data.facebook : "/"}> */}
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="footer">
        <div className="container text-center">
          <p>
            &copy; 2024 Vertical Careers.
          </p>
          {/* <p>
            &copy; 2024 Azure Innovation Station. Learn more about owner of AIS {" "}
            <a href="https://frankieriviera.com" rel="nofollow">
              Frankie Riviera
            </a>
          </p> */}
        </div>
      </div>
    </div>
  );
};
