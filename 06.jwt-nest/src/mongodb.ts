import mongoose from 'mongoose';
import "dotenv/config"

const uri: string = process.env.MONGO_URI

async function run() {
    try {

        const mongooseOptions: mongoose.ConnectOptions & {
            useNewUrlParser: boolean;
            useUnifiedTopology: boolean;
        } = {
            dbName: 'nest-js',
            useNewUrlParser: true,
            useUnifiedTopology: true,
            retryWrites: false,
        };

        await mongoose.connect(uri, mongooseOptions);

    } catch (err) {
        console.log("Mongodb connection error", err);
        process.exit(1);
    }
}

run().catch(console.dir);

// mongodb connect/disconnect events
// connected
mongoose.connection.on('connected', function () {
    console.log("Mongoose is connected");
});

// disconnected
mongoose.connection.on('disconnected', function () {
    console.log("Mongoose is disconnected");
    process.exit(1);
});

// any error
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

// this function will run jst before app is closing
process.on('SIGINT', async function () {
    console.log("app is terminating");
    await mongoose.connection.close();

    console.log('Mongoose default connection closed');
    process.exit(0);

});