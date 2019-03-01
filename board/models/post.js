module.exports = (sequelize, DataTypes) => (
    sequelize.define('post', {
        title: {
            type: DataTypes.STRING(140),
            allowNull: false,
        },
        body: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
    }, {
        timestamps: true,
        paranoid: true,
    })
);