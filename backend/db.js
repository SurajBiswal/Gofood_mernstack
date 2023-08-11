const mongoose = require('mongoose');
// const mongoURI ='mongodb+srv://surajbiswal:9938790523@cluster0.e8plnto.mongodb.net/gofoodmern?retryWrites=true&w=majority'
const mongoURI = 'mongodb://surajbiswal:9938790523@ac-wm2i2uo-shard-00-00.e8plnto.mongodb.net:27017,ac-wm2i2uo-shard-00-01.e8plnto.mongodb.net:27017,ac-wm2i2uo-shard-00-02.e8plnto.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-bmkdl5-shard-0&authSource=admin&retryWrites=true&w=majority'
const mongoDB =async() =>{
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB!');
        const fetched_data = await mongoose.connection.db.collection("food_items");
        fetched_data.find({}).toArray(async function(err, data){

            const foodCategory = await mongoose.connection.db.collection("foodCategory");
            foodCategory.find({}).toArray(function(err, catData){
              if(err) console.log(err);
              else{
                  global.food_items = data;
                  global.foodCategory = catData;
              }
            })
            // if(err) console.log(err);
            // else{
            //   global.food_items = data;
            // }
        })
      } catch (err) {
        console.error('Error connecting to MongoDB:', err);
      }
}

module.exports = mongoDB;