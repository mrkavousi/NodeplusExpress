
const {Sequelize,Datatypes} = require('sequelize');
const sequelize = new Sequelize('', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});


try {
    sequelize.authenticate();
    console.log('Connection has been established succesfully');
}   catch (error) {
    console.error('Unable to connect to the database:', error);
}
