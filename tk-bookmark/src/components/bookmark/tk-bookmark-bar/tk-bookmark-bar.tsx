import { Component, Event, EventEmitter, h, State } from '@stencil/core';

@Component({
  tag: 'tk-bookmark-bar',
  shadow: false,
})
export class TkBookmarkBar {

  @Event() toggleBookmarkMode: EventEmitter;

  @State() isEditMode = false;

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

  renderToggleViewTypeIcon() {
    return (
      <span>
        <sl-button-group>
          <sl-button size="large">Card</sl-button>
          <sl-button size="large">List</sl-button>
          <sl-button size="large">Table</sl-button>
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
