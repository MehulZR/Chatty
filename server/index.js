import Express from "express";
const App = Express();
App.listen(8000, () => console.log("Server running on port 8000"));
App.get("/", (req, res) => {
  res.send("Test");
});
