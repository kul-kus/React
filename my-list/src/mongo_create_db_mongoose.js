var mongoose= require('mongoose');

var mongoDB = 'mongodb://127.0.0.1/my_database5';
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
//Get the default connection
var db = mongoose.connection;


var Schema = mongoose.Schema;

var SomeModelSchema = new Schema({
    name: String,
    surname: String
});

var breakfastSchema = new Schema({
    eggs: {
        type12: String
    },
    drink: {
        type23: String
    }
  });

// Compile model from schema
var SomeModel = mongoose.model('SomeModel23', SomeModelSchema );

var newmode = mongoose.model('breakfast',breakfastSchema);

SomeModel.create({ name: 'also_awesome',surname:'kushwaha' }, function (err, awesome_instance) {
    if (err) {console.log(err);}
    // saved!
  });

  newmode.create({eggs:{type12:'30'},drink:{type23:'beeree'}}, function (err, awesome_instance) {
    if (err) {console.log(err)}
    // saved!
  });

  //db.close();