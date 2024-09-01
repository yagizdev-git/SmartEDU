module.exports = (roles) => {
  return (req,res,next) => {
    const userRole = req.body.role;
    if (roles.includes(userRole)) {
      next();
    } else {
      return res.status(500).send("You've not been authorized to do this."); 
    }
  }
}