const mongoose = require("mongoose");

let localDb = process.env.MONGODB_URI;

/* 
  uri = mongodb+srv://socaillydb:socaillydb123@cluster0.v6gvk.mongodb.net/development?retryWrites=true&w=majority 

  compass uri string
  mongodb+srv://socaillydb:<password>@cluster0.v6gvk.mongodb.net/test
*/

if (process.env.NODE_ENV == "development") {
  localDb = `${process.env.LOCAL_DB_DEVELOPMENT_URI}${process.env.LOCAL_DB_DEVELOPMENT_NAME}`;
}

if (process.env.NODE_ENV == "test") {
  localDb = `${process.env.LOCAL_DB_TEST_URI}${process.env.LOCAL_DB_TEST_NAME}`;
}

async function connectDB() {
  try {
    await mongoose.connect(localDb, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log(`mongodb is connected in ${process.env.NODE_ENV} 🚧 mode`);
    console.log(`Db URI ${localDb}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

module.exports = connectDB;
