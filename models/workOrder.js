///////////////////////////////////////////////
//////// Work order model             ///////// 
///////////////////////////////////////////////

const mongoose = require('./connection');

const WorkOrderSchema = new mongoose.Schema({
    unitNo: {type: String, required: true, unique: true},
    customer: {type: String, required: true},
    bayNo: {type: String, enum: ['1', '2', '3', 'Yard'], default: 'Yard'},
    woStatus: {type: String, enum: ['WOAPPR', 'Approved', 'Inspection', 'In Progress', 'Parts ordered', 'Declained', 'Completed', 'Pending'], default: 'Pending'},
    customerComplaint: {type: String, require: true},
    techFindings: String,
    repairDescription: String,
    username: String,
    techName: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const WorkOrder = mongoose.model('WorkOrder', WorkOrderSchema);

module.exports = WorkOrder;