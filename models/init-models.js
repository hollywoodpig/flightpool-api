const { DataTypes } = require('sequelize');

const _airport = require('./airport');
const _booking = require('./booking');
const _flight = require('./flight');
const _passenger = require('./passenger');
const _user = require('./user');

function initModels(sequelize) {
	const airport = _airport(sequelize, DataTypes);
	const booking = _booking(sequelize, DataTypes);
	const flight = _flight(sequelize, DataTypes);
	const passenger = _passenger(sequelize, DataTypes);
	const user = _user(sequelize, DataTypes);

	flight.belongsTo(airport, { as: 'from', foreignKey: 'from_id' });
	airport.hasMany(flight, { as: 'flights', foreignKey: 'from_id' });
	flight.belongsTo(airport, { as: 'to', foreignKey: 'to_id' });
	airport.hasMany(flight, { as: 'to_flights', foreignKey: 'to_id' });
	passenger.belongsTo(booking, { as: 'booking', foreignKey: 'booking_id' });
	booking.hasMany(passenger, { as: 'passengers', foreignKey: 'booking_id' });
	booking.belongsTo(flight, {
		as: 'flight_from_flight',
		foreignKey: 'flight_from',
	});
	flight.hasMany(booking, { as: 'bookings', foreignKey: 'flight_from' });
	booking.belongsTo(flight, {
		as: 'flight_back_flight',
		foreignKey: 'flight_back',
	});
	flight.hasMany(booking, {
		as: 'flight_back_bookings',
		foreignKey: 'flight_back',
	});

	return {
		airport,
		booking,
		flight,
		passenger,
		user,
	};
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
