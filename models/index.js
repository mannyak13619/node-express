const User = require('./User');
const handyman = require('./hanyman');
const File = require('./File');

User.hasMany(handyman, {
    foreignKey: 'user_id'
});

handyman.belongsTo(User);

handyman.hasMany(File, {
    foreignKey: 'owner_id'
});

File.belongsTo(Pet);

module.exports = {
    User,
    handyman,
    File
}