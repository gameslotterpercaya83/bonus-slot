'use babel';

import BonusSlotView from './bonus-slot-view';
import { CompositeDisposable } from 'atom';

export default {

  bonusSlotView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.bonusSlotView = new BonusSlotView(state.bonusSlotViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.bonusSlotView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'bonus-slot:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.bonusSlotView.destroy();
  },

  serialize() {
    return {
      bonusSlotViewState: this.bonusSlotView.serialize()
    };
  },

  toggle() {
    console.log('BonusSlot was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
