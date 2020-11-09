function checkTextRange(text, range) {
  if (typeof text == "string" && text.length <= range) {
    return true;
  } else {
    return false;
  }
}

function emptyField(object) {
  let values = Object.values(object);
  let empty = 0;

  values.forEach((value) => {
    if (typeof value == "string" && value == "") {
      ++empty;
    }
  });

  return empty;
}

export { emptyField, checkTextRange };
