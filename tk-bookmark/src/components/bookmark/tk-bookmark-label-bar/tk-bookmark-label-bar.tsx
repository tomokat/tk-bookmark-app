import { Component, Event, h, State, EventEmitter } from '@stencil/core';

@Component({
  tag: 'tk-bookmark-label-bar',
  shadow: false,
})
export class TkBookmarkLabelBar {

  @Event() toggleLabelMode: EventEmitter;

  @State() isEditMode = false;

  toggleMode() {
    this.isEditMode = !this.isEditMode;
    this.toggleLabelMode.emit();
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
        <sl-icon-button slot="icon" name="pencil"
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
