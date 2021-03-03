const createError = require("http-errors");

exports.isLoggedIn = (req, res, next) => {
  // Check if user request has a cookie/session.
  if (req.session.currentUser) next();
  else next(createError(401));
};

exports.isNotLoggedIn = (req, res, next) => {
  // Check if the user request came without a cookie and isn't logged in
  if ( ! req.session.currentUser ) next();
  else next( createError(403) );   // new Error({message: '', statusCode: 403})
};

exports.validationLogin = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password){
    next(createError(400));
  } 
  else next();
};



// Above exporting is same as what we did before:
// exports = {
//   isLoggedIn,
//   isNotLoggedIn,
//   validationLogin,
// }