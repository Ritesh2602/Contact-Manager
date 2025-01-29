import React from "react";
import { useLocation } from "react-router-dom";
import user from "../images/user.png";
import { Link } from "react-router-dom";

export const ContactDetails = () => {
  // Retrieve the passed state using the useLocation hook
  const location = useLocation();
  const { contact } = location.state || {}; // Ensure fallback if state is undefined

  // Handle cases where contact is not passed correctly
  if (!contact) {
    return <div>No contact details available.</div>;
  }

  return (
    <div className="main">
      <div className="ui card centered">
        <div className="image">
          <img src={user} alt="user" />
        </div>
        <div className="content">
          <div className="header">{contact.name}</div>
          <div className="meta">{contact.email}</div>
        </div>
      </div>
      <div className="center-div">
        <Link to="/">
          <button className="ui button blue center">
            Back to Contact List
          </button>
        </Link>
      </div>
    </div>
  );
};
