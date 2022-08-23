import React, { useState } from "react";
import useValidate from "./useValidate.js";
import classes from "./AddMovie.module.css";

function AddMovie(props) {
  const [titleText, setTitleText] = useState("");
  const [openingText, setOpeningText] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  function titleTextInputHandler(e) {
    setTitleText(e.target.value);
  }
  function openingTextInputHandler(e) {
    setOpeningText(e.target.value);
  }
  function releaseDateInputHandler(e) {
    setReleaseDate(e.target.value);
  }
  const isValid = useValidate(titleText, openingText, releaseDate);
  //console.log(isValid);
  function submitHandler(event) {
    event.preventDefault(); // to stop refreshing the page after form submission

    // could add validation here...
    
    //create "movie" object
    const movie = {
      title: titleText,
      openingText: openingText,
      releaseDate: releaseDate,
    };
   //console.log(movie);
    props.addMovie(movie);
  }
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  var startDate = yyyy + "-" + mm + "-" + dd;
  //console.log(startDate);
  return (
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" onChange={titleTextInputHandler} />
      </div>
      <div className={classes.control}>
        <label htmlFor="opening-text">Opening Text</label>
        <textarea
          rows="5"
          id="opening-text"
          onChange={openingTextInputHandler}
        ></textarea>
      </div>
      <div className={classes.control}>
        <label htmlFor="date">Release Date</label>
        <input
          type="date"
          id="date"
          min={startDate}
          onChange={releaseDateInputHandler}
        />
      </div>
      <button type="submit" disabled={!isValid}>
        Add Movie
      </button>
    </form>
  );
}

export default AddMovie;
