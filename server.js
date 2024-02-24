const app = require("./app");

app.listen(4000, () => {
  console.log(
    `Server is working on Port ${process.env.PORT} in ${process.env.NODE_ENV} Mode`
  );
});
