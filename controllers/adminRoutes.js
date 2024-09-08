const express = require('express');
const WorkOrder = require('../models/workOrder');
const Users = require('../models/user')

const router = express.Router();

router.use((req, res, next) => {
    if (req.session.username) {
        next();
    } else {
        res.redirect("user/login");
    }
})


router.get('/', async (req, res) => {
    const user = req.session.alias
    if(!req.session.isAdmin){
        const assignedWOrders = await WorkOrder.find({techName: req.session.userId});
        res.render('indexTech.ejs', { assignedWOrders, user });
    }else{
        const wOrder = await WorkOrder.find({});
        res.render('indexAdmin.ejs', { wOrder, user });
    }
});

router.get('/new', async (req, res) => {
    res.render('new.ejs');
});

router.post('/', async (req, res) => {
    req.body.username = req.session.username;
    await WorkOrder.create(req.body);
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
    const id = req.params.id;
    const wOrder = await WorkOrder.findById(id).populate("techName");
    const techId = wOrder.techName;
    if(!req.session.isAdmin){
        res.render('editTech.ejs', { wOrder, usersObj, techId });
    }else{
        res.render('editAdmin.ejs', { wOrder, usersObj, techId });
    }
});

router.put('/:id', async (req, res) => {
    if (req.body.techName === '') {
        req.body.techName = null
    }
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