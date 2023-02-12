const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	return passenger.init(sequelize, DataTypes);
};

class passenger extends Sequelize.Model {
	static init(sequelize, DataTypes) {
		return super.init(
			{
				id: {
					autoIncrement: true,
					type: DataTypes.BIGINT.UNSIGNED,
					allowNull: false,
					primaryKey: true,
				},
				booking_id: {
					type: DataTypes.BIGINT.UNSIGNED,
					allowNull: false,
					references: {
						model: 'bookings',
						key: 'id',
					},
				},
				first_name: {
					type: DataTypes.STRING(255),
					allowNull: false,
				},
				last_name: {
					type: DataTypes.STRING(255),
					allowNull: false,
				},
				birth_date: {
					type: DataTypes.DATEONLY,
					allowNull: false,
				},
				document_number: {
					type: DataTypes.STRING(10),
					allowNull: false,
				},
				place_from: {
					type: DataTypes.STRING(3),
					allowNull: true,
				},
				place_back: {
					type: DataTypes.STRING(3),
					allowNull: true,
				},
			},
			{
				sequelize,
				tableName: 'passengers',
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
						name: 'passengers_booking_id_foreign',
						using: 'BTREE',
						fields: [{ name: 'booking_id' }],
					},
				],
			}
		);
	}
}
