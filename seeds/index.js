const userData = require('./userData.json');
const handymanData = require('./handymanData.json');

const { handyman, User } = require('../models');

const sequelize = require('../config/connection');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });
    console.log('\n----- USERS SEEDED -----\n');

    for (const handyman of handymanData) {
        await handyman.create({
            ...handyman,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }
    console.log('\n----- HANDYMAN SEEDED -----\n');

    process.exit(0);
};

seedDatabase();