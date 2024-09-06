///////////////////////////////////////////////
//////// Work order model             ///////// 
///////////////////////////////////////////////

//import the mongoose VARIABLE which holds the configuration fro the connection. And this is on the file called connection.js
const mongoose = require('./connection');

//create the WorkOrder schema
const WorkOrderSchema = new mongoose.Schema({
    unitNo: {type: String, require: true, unique: true},
    customer: {type: String, require: true},
    bayNo: {type: String, enum: ['1', '2', '3', 'Yard'], default: 'Yard'},
    woStatus: {type: String, enum: ['WOAPPR', 'Approved', 'Inspection', 'In Progress', 'Parts ordered', 'Declained', 'Completed', 'Pending'], default: 'Pending'},
    customerComplaint: {type: String, require: true},
    techFindings: String,
    repairDescription: String,
    username: String,
    techName: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

//variable that holds the configs and the schema
//this is the figurative 'key' that communicates with out db
const WorkOrder = mongoose.model('WorkOrder', WorkOrderSchema);

// export this Trailer variable
module.exports = WorkOrder;