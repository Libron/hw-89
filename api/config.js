const path = require('path');

const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    dbUrl: 'mongodb://localhost/hw89',
    mongoOptions: {useNewUrlParser: true, useCreateIndex: true},
    facebook: {
        appId: '1340053619482671',
        appSecret: 'f46217e3dcfb68dce0e88f8d7f78e87d'
    }
};