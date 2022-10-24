

const { Sequelize, DataTypes, Model } = require('sequelize');
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

const User = sequelize.define('users', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have a firstname' },
        notEmpty: { msg: 'firstname must not be empty' },
      },
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have a lastname' },
        notEmpty: { msg: 'lastname must not be empty' },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have a email' },
        notEmpty: { msg: 'Email must not be empty' },
        isEmail: { msg: 'Must be a valid email' },
      },
    },
  });

console.log(User === sequelize.model.User);

