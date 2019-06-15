import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import fade from 'ember-animated/transitions/fade';
import scale from 'ember-animated/motions/scale';
import { fadeIn, fadeOut } from 'ember-animated/motions/opacity';
import move from 'ember-animated/motions/move';
import { wait } from 'ember-animated';

export default class ProductGroupCardComponent extends Component {
  @service store;

  @action
  sortedChildren() {
    /* do nothing */
  }

  emptyArary = []

  /* -- Open state -- */
  @tracked isOpen = false

  headerTransition = function*( { insertedSprites, removedSprites, duration }) {
    const [ insertedSprite ] = insertedSprites;
    const [ removedSprite ] = removedSprites;

    removedSprite.endAtSprite( insertedSprite );
    insertedSprite.startAtSprite( removedSprite );

    for ( const sprite of [ insertedSprite, removedSprite ] ) {
      scale( sprite, duration );
      move( sprite, duration );
    }

    insertedSprite.hide();

    fadeOut( removedSprite, 2 * duration / 3 );
    yield wait( duration / 2 );
    insertedSprite.reveal();
    fadeIn( insertedSprite, 2 * duration / 3 );
  }

  /* -- editing state -- */

  @tracked
  editing = false;

  @action
  toggleEditing(){
    this.editing = !this.editing;
  }

  transition = fade;

  /* -- editing functionality -- */
  @action
  update() {
    this.args.productGroup.save();
  }

  @action
  undo() {
    this.args.productGroup.rollbackAttributes();
  }

  @action
  remove() {
    this.args.productGroup.destroyRecord();
  }

  @action
  updateSortIndex(event) {
    const value = parseInt( event.target.value || "0" );
    this.args.productGroup.sortIndex = value;
  }

  /* -- creation functionality -- */
  @tracked
  addingChild = false;
  @tracked
  newProductGroupLabel = null;
  @tracked
  newProductGroupSortIndex = null;

  @action
  async createChild( label, sortIndex ) {
    if( !label || label == "" ) {
      alert("Can't create product groups without label");
      return;
    }

    sortIndex = parseInt( sortIndex );
    const record = this.store.createRecord( 'product-group', { label, sortIndex } );
    await record.save();
    record.parentGroup = this.args.productGroup;
    await record.save();
    await wait( 250 );
    this.newProductGroupLabel = null;
    this.newProductGroupSortIndex = null;
    this.addingChild = false;
  }
}
