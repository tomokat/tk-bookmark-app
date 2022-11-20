import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';

@Component({
  tag: 'tk-bookmark-list-item',
  shadow: false,
})
export class TkBookmarkListItem {

  @Event() requestEditBookmark: EventEmitter;

  @Prop() bookmark;

  editBookmark() {
    this.requestEditBookmark.emit(this.bookmark);
  }

  renderBookmarkLabels() {
    return (
      <div>
        {this.bookmark.labelsForDisplay.map(label=>
          <sl-badge>{label}</sl-badge>
        )}
      </div>
    );
  }

  render() {
    return (
      <sl-card class="card-header">
        <div slot="header">
          <a href={this.bookmark.url} title={this.bookmark.title} target="_blank">
            {this.bookmark.title}
          </a>
          <sl-icon-button name="gear" label="Settings"
            onClick={()=>this.editBookmark()}></sl-icon-button>
        </div>
        {this.renderBookmarkLabels()}
        {this.bookmark.notes}
      </sl-card>
    );
  }

}
