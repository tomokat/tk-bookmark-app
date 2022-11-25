import { Component, Event, EventEmitter, h, State } from '@stencil/core';
import state from '../../../stores/tk-bookmark-store';

enum BOOKMARK_DISPLAY_TYPE {
  CARD = 'Card', 
  LIST = 'List',
  TABLE = 'Table'
};

@Component({
  tag: 'tk-bookmark-bar',
  shadow: false,
})
export class TkBookmarkBar {

  @Event() toggleBookmarkMode: EventEmitter;

  @State() isEditMode = false;

  @State() bookmarkDisplayType = BOOKMARK_DISPLAY_TYPE.CARD;

  toggleMode() {
    this.isEditMode = !this.isEditMode;
    this.toggleBookmarkMode.emit();
  }

  renderViewIcon() {
    return (
      <div>
        <sl-avatar shape="rounded" label="View">
          <sl-icon-button slot="icon" name="list"
            onClick={()=>this.toggleMode()}></sl-icon-button>
        </sl-avatar>
        {this.renderToggleViewTypeIcon()}
      </div>
      
    );
  }

  renderEditIcon() {
    return (
      <div>
        <sl-avatar shape="rounded" label="Edit">
          <sl-icon-button slot="icon" name="plus-circle"
            onClick={()=>this.toggleMode()}></sl-icon-button>
        </sl-avatar>
        {this.renderToggleViewTypeIcon()}
      </div>
    );
  }

  switchBookmarkDisplayType(displayType) {
    state.bookmarkDisplayType = displayType;
    this.bookmarkDisplayType = displayType;
  }

  getButtonVariant(displayType) {
    if(this.bookmarkDisplayType === displayType) {
      return 'primary';
    }
    return 'default';
  }

  renderToggleViewTypeIcon() {
    return (
      <span>
        <sl-button-group>
          <sl-button size="large" variant={this.getButtonVariant(BOOKMARK_DISPLAY_TYPE.CARD)}
            onClick={()=>this.switchBookmarkDisplayType(BOOKMARK_DISPLAY_TYPE.CARD)}>Card</sl-button>
          <sl-button size="large" variant={this.getButtonVariant(BOOKMARK_DISPLAY_TYPE.LIST)}
            onClick={()=>this.switchBookmarkDisplayType(BOOKMARK_DISPLAY_TYPE.LIST)}>List</sl-button>
          <sl-button size="large" variant={this.getButtonVariant(BOOKMARK_DISPLAY_TYPE.TABLE)}
            onClick={()=>this.switchBookmarkDisplayType(BOOKMARK_DISPLAY_TYPE.TABLE)}>Table</sl-button>
        </sl-button-group>
      </span>
    );
  }

  render() {
    return (
      <div style={{padding: '5px'}}>
        { this.isEditMode
          ? this.renderViewIcon()
          : this.renderEditIcon()
        }
      </div>
    );
  }

}
