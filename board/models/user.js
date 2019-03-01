module.exports = (sequelize, DataTypes) => (
    sequelize.define('user', {
        email: {
            type: DataTypes.STRING(40),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        firstname: {
            type: DataTypes.STRING(15),
            allowNull: true,
        },
        lastname: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        provider: {
            type: DataTypes.STRING(10),
            allowNull: false,
            defaultValue: 'local',
        },
    }, {
        timestamps: true,
        paranoid: true,
    })
);