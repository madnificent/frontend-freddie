import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | product-groups/show', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:product-groups/show');
    assert.ok(controller);
  });
});
