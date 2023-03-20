export default async (req, res) => {
  res.setHeader("Set-Cookie", [
    "Authentication=null; Path=/; Max-Age=0;",
    "LoggedIn=null; Path=/; Max-Age=0;",
  ]);
  res.status(200).redirect(process.env.ORIGIN);
};
