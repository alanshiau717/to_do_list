import db from './db.config'

function connectToDB() {
    db.mongoose
        .connect(db.url, {
            ...db.configs
        })
        .then(() => {
            console.log("Connected to the database!");
        })
        .catch((err: Error) => {
            console.log("Cannot connect to the database!", err);
            process.exit();
        });
}

export default connectToDB;
