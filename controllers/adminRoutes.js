const express = require('express');
const WorkOrder = require('../models/workOrder');
const Users = require('../models/user')

const router = express.Router();

router.use((req, res, next) => {
    if (req.session.loggedIn) {
        next();
    } else {
        res.redirect("user/login");
    }
})


router.get('/', async (req, res) => {
    if(!req.session.isAdmin){
        const assignedWOrders = await WorkOrder.find({techName: req.session.userId});
        res.render('indexTech.ejs', { assignedWOrders });
    }else{
        const wOrder = await WorkOrder.find({});
        res.render('indexAdmin.ejs', { wOrder });
    }
});

router.get('/new', async (req, res) => {
    res.render('new.ejs');
});

router.post('/', async (req, res) => {
    req.body.username = req.session.username;
    await WorkOrder.create(req.body);
    console.log(req.body)
    res.redirect('/workflow');
});

router.get('/:id', async (req, res) => {
    const usersObj = {}
    const allUsers = await Users.find({});
    let userId = null;
    for (el of allUsers) {
        objectId = el._id;
        userId = objectId.toString();
        usersObj[el.alias] = userId;
    };
    console.log(usersObj);
    const id = req.params.id;
    const wOrder = await WorkOrder.findById(id).populate("techName");
    const techId = wOrder.techName;
    console.log(`The user is admin ${req.session.isAdmin}`);
    if(!req.session.isAdmin){
        res.render('editTech.ejs', { wOrder, usersObj, techId });
        console.log('is not admin')
    }else{
        res.render('editAdmin.ejs', { wOrder, usersObj, techId });
        console.log('It is admin')
    }
});

router.put('/:id', async (req, res) => {
    // if statemoent to solve cast error
    if (req.body.techName === '') {
        req.body.techName = null
    }
    // else{
    //     wOrderId = req.body._id;
    //     techId = req.body.techName
    //     await WorkOrder.findByIdAndUpdate(
    //         wOrderId,
    //         { techName: techId },
    //         { new: true }
    //     );
    // }
    const id = req.params.id;
    await WorkOrder.findByIdAndUpdate(id, req.body);
    res.redirect('/workflow');
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await WorkOrder.findByIdAndDelete(id);
    res.redirect('/workflow');
});

module.exports = router;