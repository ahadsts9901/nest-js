"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
require("dotenv/config");
const uri = process.env.MONGO_URI;
async function run() {
    try {
        const mongooseOptions = {
            dbName: 'nest-chat',
            useNewUrlParser: true,
            useUnifiedTopology: true,
            retryWrites: false,
        };
        await mongoose_1.default.connect(uri, mongooseOptions);
    }
    catch (err) {
        console.log("Mongodb connection error", err);
        process.exit(1);
    }
}
run().catch(console.dir);
mongoose_1.default.connection.on('connected', function () {
    console.log("Mongoose is connected");
});
mongoose_1.default.connection.on('disconnected', function () {
    console.log("Mongoose is disconnected");
    process.exit(1);
});
mongoose_1.default.connection.on('error', function (err) {
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});
process.on('SIGINT', async function () {
    console.log("app is terminating");
    await mongoose_1.default.connection.close();
    console.log('Mongoose default connection closed');
    process.exit(0);
});
//# sourceMappingURL=mongodb.js.map