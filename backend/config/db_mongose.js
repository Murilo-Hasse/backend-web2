import mongoose from mongoose;
import dotenv from 'dotenv';
dotenv.config();

const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado ao MongoDB");
  } catch (err) {
    console.error("Erro ao conectar no MongoDB:", err);
    process.exit(1);
  }
};

module.exports = connectToMongo;
