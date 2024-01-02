import mongoose from 'mongoose';

const connectDb = async()=>
{
    try {
      const conn = await  mongoose.connect("mongodb://0.0.0.0:27017/e-proshop");
      console.log(`Mongo Db Connected : ${conn.connection.host}`);
    }
    catch (error) {
        console.log(`Error : ${error.message}`);
        process.exit(1);
    }
}

export default connectDb;