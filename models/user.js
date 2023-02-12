const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	return user.init(sequelize, DataTypes);
};

class user extends Sequelize.Model {
	static init(sequelize, DataTypes) {
		return super.init(
			{
				id: {
					autoIncrement: true,
					type: DataTypes.BIGINT.UNSIGNED,
					allowNull: false,
					primaryKey: true,
				},
				first_name: {
					type: DataTypes.STRING(255),
					allowNull: false,
				},
				last_name: {
					type: DataTypes.STRING(255),
					allowNull: false,
				},
				phone: {
					type: DataTypes.STRING(255),
					allowNull: false,
					unique: 'users_phone_unique',
				},
				password: {
					type: DataTypes.STRING(255),
					allowNull: false,
				},
				document_number: {
					type: DataTypes.STRING(255),
					allowNull: false,
				},
				api_token: {
					type: DataTypes.STRING(255),
					allowNull: true,
				},
			},
			{
				sequelize,
				tableName: 'users',
				timestamps: true,
				createdAt: 'created_at',
				updatedAt: 'updated_at',
				indexes: [
					{
						name: 'PRIMARY',
						unique: true,
						using: 'BTREE',
						fields: [{ name: 'id' }],
					},
					{
						name: 'users_phone_unique',
						unique: true,
						using: 'BTREE',
						fields: [{ name: 'phone' }],
					},
				],
			}
		);
	}
}
