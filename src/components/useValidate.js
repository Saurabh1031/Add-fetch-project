function useValidate(titleText, openingText, releaseDate) {
  //console.log(releaseDate.trim().length === 0);
  return !(
    titleText.trim().length === 0 ||
    openingText.trim().length === 0 ||
    releaseDate.trim().length === 0
  );
}

export default useValidate;
