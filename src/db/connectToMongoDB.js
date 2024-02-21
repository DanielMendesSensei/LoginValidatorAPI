import mongoose from "mongoose";

const connectToMongoDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Conectado ao MongoDB")

    } catch (error) {
        console.log("Erro ao conectar ao MongoDB", error.message)
    }
}

export default connectToMongoDB;