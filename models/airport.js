const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	return airport.init(sequelize, DataTypes);
};

class airport extends Sequelize.Model {
	static init(sequelize, DataTypes) {
		return super.init(
			{
				id: {
					autoIncrement: true,
					type: DataTypes.BIGINT.UNSIGNED,
					allowNull: false,
					primaryKey: true,
				},
				city: {
					type: DataTypes.STRING(255),
					allowNull: false,
				},
				name: {
					type: DataTypes.STRING(255),
					allowNull: false,
				},
				iata: {
					type: DataTypes.STRING(255),
					allowNull: false,
				},
			},
			{
				sequelize,
				tableName: 'airports',
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
				],
			}
		);
	}
}
