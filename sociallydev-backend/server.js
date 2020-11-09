const app = require("./src/app");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`${process.env.NODE_ENV} server is running 🚀 on the port ${PORT}`));
