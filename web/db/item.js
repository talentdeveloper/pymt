var connection = require('../config/connection.js');
var { getAllModifierWithItemId } = require('./modifier');

function setItemValues(item) {
  return {
    "itemId": item.itemId, //if new item system will generate with next number and starts at 5 numbers long
    "itemName": item.itemName,
    "soldByWeight": item.soldByWeight,
    "trackInventory": item.trackInventory,
    "allowBackorder": item.allowBackorder,
    "isTaxable": item.isTaxable,
    "isEBT": item.isEBT,
    "isFSA": item.isFSA,
    "selectors": {
      "selectorId": item.selectorId,
      "selectorName": item.selectorName,
      "details": [
        {
          "itemId": item.details_itemId,
          "name": item.details_name,
          "cost": item.details_cost,
          "price": item.details_price,
          "quantityRemaining": item.details_quantityRemaining,
          "itemWeight": item.details_itemWeight
        }
      ]
    },
    "modifiers": []
  }
}

function getAllItems(account_id, callback) {
  console.log(account_id)
  var sql = `select i.id itemId, i.name itemName, i.sold_by_weight soldByWeight,
  i.track_inventory trackInventory, i.allow_backorder allowBackorder, i.selector_name selectorName,
  i.is_taxable isTaxable, i.is_ebt isEBT, i.is_fsa isFSA, i.selector_id selectorId,
  d.id details_itemId, d.name details_name, d.cost details_cost, d.price details_price,
  d.quantity_remaining details_quantityRemaining, d.item_weight details_itemWeight
  from items i left outer join item_detail d on d.item_id = i.id
  where account_id = ${account_id} order by i.id`
  connection.query(sql, function(err, result) {
    if(err) callback(err, result)
    if(!result || !result.length) return callback(err, result)
    else {
      console.log('--------- get all items in db------------')
      console.log(result)
      var firstItem = setItemValues(result[0])
      var items = [firstItem]
      for(var i in result) {
        var item = result[i+1]
        if(!item) break;
        var lastItem = items[items.length-1]
        if(item.id === lastItem.id) {
          lastItem.selectors.details.push({
            "itemId": item.details_itemId,
            "name": item.details_name,
            "cost": item.details_cost,
            "price": item.details_price,
            "quantityRemaining": item.details_quantityRemaining,
            "itemWeight": item.details_itemWeight
          })
        } else {
          var nextItem = setItemValues(item)
          items.push(nextItem)
        }
      }

      // add modifiers
      getAllModifierWithItemId(account_id, (err, result) => {
        if(err) callback(err, result)
        else {
          for(var i in items) {
            var item = items[i]
            for(var j in result) {
              var modifier = result[j]
              if(item.itemId === modifier.itemId) {
                var itemModifier = item.modifiers.filter(m => m.modifierId === modifier.modifierId)[0]
                if(itemModifier) {
                  itemModifier.modifiers[modifier.attribute] = modifier.value
                } else {
                  var modifiers = {}
                  modifiers[modifier.attribute] = modifier.value
                  var modifierItem = {
                    modifierId: modifier.modifierId,
                    modifierName: modifier.modifierName,
                    modifiers: modifiers
                  }
                  item.modifiers.push(modifierItem)
                }
              } else {
                continue
              }
            }
          }
          callback(null, items)
        }
      })
    }
  });
}

function editItem(item_id, callback) {
  var sql = `select * from items where id = ${item_id}`
  connection.query(sql, function(err, result) {
    callback(err, result)
  });
}

function createItem(item, callback) {
  var sql = `insert into items (name, short_name, color, image, active, account_id)
  values ('${item.name}', '${item.short_name}', '${item.color}', '${item.image}',
  ${item.active}, ${item.account_id})`
  connection.query(sql, function(err, result) {
    callback(err, result)
  });
}

function updateItem(item, callback) {
  var sql = `update items set name = '${item.name}', short_name = '${item.short_name}',
  color = '${item.color}', image = '${item.image}', active = ${item.active}
  where id = ${item.id} and account_id = ${item.account_id}`
  connection.query(sql, function(err, result) {
    callback(err, result)
  });
}

module.exports = {
  getAllItems,
  editItem,
  createItem,
  updateItem
}
