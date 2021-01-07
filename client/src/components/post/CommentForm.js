import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState("");
  let [fileURL, setFileURL] = useState("");
  let myWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: "",
      uploadPreset: "",
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        fileURL = result.info.secure_url;
        setFileURL(fileURL);
        myWidget.close();
      }
    }
  );

  return (
    <div className="post-form">
      <div className="bg-light p">
        <h3>Ostavite komentar</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          if (text !== "" || fileURL !== "") {
            addComment(postId, { text, fileURL });
            setText("");
            setFileURL("");
          } else {
            window.alert("Nije moguće objaviti praznu objavu!");
          }
        }}
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Napišite nešto . . . "
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="div-fileURL">
          <input
            className="input-fileURL"
            name="fileURL"
            placeholder="Kliknite ovdje za dodavanje dokumenta"
            value={fileURL}
            onClick={() => {
              myWidget.open();
            }}
            width="50%"
            height=" 2.5rem"
          />
          <button
            type="button"
            className="btn-fileURL"
            onClick={() => setFileURL("")}
          >
            <i className="fas fa-times" />
          </button>
        </div>
        <input type="submit" className="btn btn-dark my-1" value="Podnesi" />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
