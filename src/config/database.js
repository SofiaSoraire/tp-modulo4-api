const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // URI hardcodeada
    const uri = 'mongodb+srv://tp_user:TPuser123@depc.pvzlgcc.mongodb.net/tp_modulo4';
    
    await mongoose.connect(uri);
    console.log('✅ MongoDB Atlas conectado exitosamente');
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error.message);
  }
};

module.exports = connectDB;