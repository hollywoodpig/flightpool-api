const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	return booking.init(sequelize, DataTypes);
};

class booking extends Sequelize.Model {
	static init(sequelize, DataTypes) {
		return super.init(
			{
				id: {
					autoIncrement: true,
					type: DataTypes.BIGINT.UNSIGNED,
					allowNull: false,
					primaryKey: true,
				},
				flight_from: {
					type: DataTypes.BIGINT.UNSIGNED,
					allowNull: false,
					references: {
						model: 'flights',
						key: 'id',
					},
				},
				flight_back: {
					type: DataTypes.BIGINT.UNSIGNED,
					allowNull: true,
					references: {
						model: 'flights',
						key: 'id',
					},
				},
				date_from: {
					type: DataTypes.DATEONLY,
					allowNull: false,
				},
				date_back: {
					type: DataTypes.DATEONLY,
					allowNull: true,
				},
				code: {
					type: DataTypes.STRING(5),
					allowNull: false,
				},
			},
			{
				sequelize,
				tableName: 'bookings',
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
						name: 'bookings_flight_from_foreign',
						using: 'BTREE',
						fields: [{ name: 'flight_from' }],
					},
					{
						name: 'bookings_flight_back_foreign',
						using: 'BTREE',
						fields: [{ name: 'flight_back' }],
					},
				],
			}
		);
	}
}
