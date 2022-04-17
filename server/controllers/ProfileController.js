export default {
  profileInfo: (req, res) => {
    console.log(typeof req.headers.authorization.split(" ")[1]);
    res.send("done");
  },
};
