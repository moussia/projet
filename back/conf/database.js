import mongoose from 'mongoose';

mongoose.set('debug', true);

const db = mongoose.connection;
db.on('error', (err) => {
    console.error('❌ CANNOT CONNECT TO MongoDB DATABASE !', err);
});
db.on('disconnected', () => {
    console.log('DISCONNECTED from MongoDB DATABASE !');
});
db.on('parseError', (err) => {
    console.error('❌ parseError... ', err);
});
db.on('open', (err) => {
    if (err) console.error('❌ openError... ', err);
    else console.log('✅ Mongo loaded.');
});


(await mongoose.connect(process.env.MONGOOSE_URI)).connection;