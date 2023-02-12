const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	return flight.init(sequelize, DataTypes);
};

class flight extends Sequelize.Model {
	static init(sequelize, DataTypes) {
		return super.init(
			{
				id: {
					autoIncrement: true,
					type: DataTypes.BIGINT.UNSIGNED,
					allowNull: false,
					primaryKey: true,
				},
				flight_code: {
					type: DataTypes.STRING(10),
					allowNull: false,
				},
				from_id: {
					type: DataTypes.BIGINT.UNSIGNED,
					allowNull: false,
					references: {
						model: 'airports',
						key: 'id',
					},
				},
				to_id: {
					type: DataTypes.BIGINT.UNSIGNED,
					allowNull: false,
					references: {
						model: 'airports',
						key: 'id',
					},
				},
				time_from: {
					type: DataTypes.TIME,
					allowNull: false,
				},
				time_to: {
					type: DataTypes.TIME,
					allowNull: false,
				},
				cost: {
					type: DataTypes.INTEGER,
					allowNull: false,
				},
			},
			{
				sequelize,
				tableName: 'flights',
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
						name: 'flights_from_id_foreign',
						using: 'BTREE',
						fields: [{ name: 'from_id' }],
					},
					{
						name: 'flights_to_id_foreign',
						using: 'BTREE',
						fields: [{ name: 'to_id' }],
					},
				],
			}
		);
	}
}
