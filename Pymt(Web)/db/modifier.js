var connection = require('../config/connection.js');

function getAllModifier(account_id, callback) {
  var sql = `select * from modifier where account_id = ${account_id}`
  connection.query(sql, function(err, result) {
    callback(err, result)
  });
}

function editModifier(modifier_id, callback) {
  var sql = `select * from modifier where id = ${modifier_id}`
  connection.query(sql, function(err, result) {
    callback(err, result)
  });
}

function createModifier(modifier, callback) {
  var sql = `insert into modifier (name, short_name, color, image, active, account_id)
  values ('${modifier.name}', '${modifier.short_name}', '${modifier.color}', '${modifier.image}',
  ${modifier.active}, ${modifier.account_id})`
  connection.query(sql, function(err, result) {
    callback(err, result)
  });
}

function updateModifier(modifier, callback) {
  var sql = `update modifier set name = '${modifier.name}', short_name = '${modifier.short_name}',
  color = '${modifier.color}', image = '${modifier.image}', active = ${modifier.active}
  where id = ${modifier.id} and account_id = ${modifier.account_id}`
  connection.query(sql, function(err, result) {
    callback(err, result)
  });
}

function getAllModifierWithItemId(account_id, callback) {
  var sql = `select i.id itemId, f.id modifierId, f.name modifierName, a.name attribute, a.value value
  from items i inner join item_modifier_map p on i.id = p.item_id inner join modifier f on f.id = p.modifier_id
  left outer join modifier_attribute a on a.modifier_id = f.id where f.account_id = ${account_id} order by itemId, modifierId`
  connection.query(sql, function(err, result) {
    callback(err, result)
  });
}

module.exports = {
  getAllModifier,
  editModifier,
  createModifier,
  updateModifier,
  getAllModifierWithItemId
}
