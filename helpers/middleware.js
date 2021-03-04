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

exports.validateAuthData = (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  

  if (!email || !password){
    next(createError(400));
  } 
  else next();
};

exports.isAdmin = (req, res, next) => {
  if (req.session.currentUser.role === "employee") next();
  else next(createError(401));
};



// Above exporting is same as what we did before:
// exports = {
//   isLoggedIn,
//   isNotLoggedIn,
//   validateAuthData,
// }