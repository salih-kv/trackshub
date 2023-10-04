import { connect } from "mongoose";

export const connectDB = async () => {
  try {
    const { connection } = await connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("SERVER CONNECTED @", connection.host);
  } catch (err) {
    console.log(err.message);
  }
};
