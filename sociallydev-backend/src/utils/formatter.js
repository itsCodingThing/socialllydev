function formatObjectKey(obj) {
  let arr = Object.entries(obj);
  let temp = [];

  for (let [key, value] of arr) {
    if (key == "_id") {
      temp.push(["id", value]);
      continue;
    }

    temp.push([key, value]);
  }

  if (temp.length == 0) {
    return obj;
  }
  return Object.fromEntries(temp);
}

function bodyErrorFormatter({ msg, value, param }) {
  return {
    field: param,
    value,
    msg,
  };
}

/**
 * @param {company,bio,location,skills,username, social} body
 */
function formattedProfileObj(body) {
  let { company = "", bio = "", location = "", skills = [], username = "", social = [] } = body;
  return { company, bio, location, skills, username, social };
}

/**
 * @param {description, likes, comments, image} body
 */
function formattedPostObj(body) {
  let { description = "", likes = [], comments = [], image = "" } = body;

  return {
    description,
    likes,
    comments,
    image,
  };
}

function formattedCommentObj(body) {
  let { text = "" } = body;
  return {
    text,
  };
}

module.exports = {
  bodyErrorFormatter,
  formattedProfileObj,
  formattedPostObj,
  formattedCommentObj,
  formatObjectKey,
};
