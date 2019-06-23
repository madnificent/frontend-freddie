import DS from 'ember-data';

const { Model, attr, hasMany, belongsTo } = DS;

export default class ProductModel extends Model {
  @attr() label;
  @attr('number') sortIndex;
  @hasMany('product-group') productGroups;
  @hasMany('offering') offerings;
  @belongsTo('unit-price-specification') unitPrice;
  @belongsTo('quantitative-value') targetUnit;
}
