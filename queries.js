const User = require('./models/user')
const WorOrder = require('./models/workOrder.js')

//Referencing
/////////////
// const createUser = async () => {
//     const userData = {
//         username: "Awo",
//         password: "1234",
//     };
//     const user = await User.create(userData);
//     console.log("New user:", user);
// };

// const runQueries = async () => {
//     console.log('Queries running.');
//     await createUser();
// };

// runQueries()

//Adding References
///////////////////
// const assignWorkOrder = async () => {
//     const todoId = '66ce7cb30e993a9a732f6b35';
//     const userId = '66ce7b027cdc1cd0c59c25b0';

//     const updatedWorOrder = await WorOrder.findByIdAndUpdate(
//         todoId,
//         { assignee: userId },
//         { new: true }
//     );

//     console.log('Updated document:', updatedWorOrder);
// };

// const runQueries = async () => {
//     console.log('Queries running.');
//     await assignWorkOrder();
// };

// runQueries()

// Joining Referenced documents
// const findWorkOredrs = async () => {
//     const wOrders = await WorOrder.find({}).populate("assignee");
//     console.log("All todos:", wOrders);
// };

// const runQueries = async () => {
//     console.log('Queries running.');
//     await findWorkOredrs();
// };

// runQueries()