const mongoose = require("mongoose");

const connetDB = async () => {
    try {
        await mongoose.connect(process.env.Mongodb_URl, {});
        console.log("DB Connected");
    }
    catch (err){
        console.error("Error connecting DB", err);
        process.exit(1);
    }
};

module.exports = connetDB;