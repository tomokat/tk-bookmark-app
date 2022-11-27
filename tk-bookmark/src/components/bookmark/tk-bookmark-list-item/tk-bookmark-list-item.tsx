import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';
import state from '../../../stores/tk-bookmark-store';

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

  renderCardView() {
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
  
  renderListView() {
    return (
      <div style={{padding: '3px'}}>
        <a href={this.bookmark.url} title={this.bookmark.title} target="_blank">
          {this.bookmark.title}
        </a>
        <span>{this.bookmark.notes}</span>
        <sl-icon-button name="gear" label="Settings"
            onClick={()=>this.editBookmark()}></sl-icon-button>
        {this.renderBookmarkLabels()}
        <sl-divider style={{'--color': '#0069cc'}}></sl-divider>
      </div>
    )
  }

  renderTableView() {
    return (
      <div>Table view</div>
    )
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
    if(state.bookmarkDisplayType === 'Card') {
      return this.renderCardView()
    } else if(state.bookmarkDisplayType === 'List') {
      return this.renderListView();
    } else if(state.bookmarkDisplayType === 'Table') {
      return this.renderTableView();
    }
  }

}
