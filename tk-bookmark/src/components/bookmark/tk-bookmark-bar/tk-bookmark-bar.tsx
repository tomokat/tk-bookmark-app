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
      <sl-avatar shape="rounded" label="View">
        <sl-icon-button slot="icon" name="list"
          onClick={()=>this.toggleMode()}></sl-icon-button>
      </sl-avatar>
    );
  }

  renderEditIcon() {
    return (
      <sl-avatar shape="rounded" label="Edit">
        <sl-icon-button slot="icon" name="plus-circle"
          onClick={()=>this.toggleMode()}></sl-icon-button>
      </sl-avatar>
    );
  }

  render() {
    return (
      <div>
        { this.isEditMode
          ? this.renderViewIcon()
          : this.renderEditIcon()
        }
      </div>
    );
  }

}
