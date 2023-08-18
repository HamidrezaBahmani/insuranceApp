const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroMongoose = require("@admin-bro/mongoose");
var Car = require("../../models/car");
var Post=require("../../models/post");


AdminBro.registerAdapter(AdminBroMongoose);
var mongoose = require("mongoose");


const adminBro = new AdminBro({
    databases: [mongoose],
    resources: [Car,Post],
    rootPath: '/admin',
})

const router = AdminBroExpress.buildRouter(adminBro)

module.exports = router