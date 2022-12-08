import { Component, Event, EventEmitter, h, Listen, Prop, State } from '@stencil/core';
import state from '../../../stores/tk-bookmark-store';

@Component({
  tag: 'tk-bookmark-list-item',
  shadow: false,
})
export class TkBookmarkListItem {

  @Event() requestEditBookmark: EventEmitter;

  @Prop() bookmark;

  @State() cardWidth = this.getCardWidth();

  @Listen('resize', {target: 'window'})
  handleResizeWindow () {
    let newCardWidth = this.getCardWidth();

    console.log(`catch window.resize event NEW: ${newCardWidth} vs ${this.cardWidth}`);

    if(newCardWidth != this.cardWidth) {
      this.cardWidth = newCardWidth;
      console.log(`updated card width to ${this.cardWidth}`);
    }
  }

  editBookmark() {
    this.requestEditBookmark.emit(this.bookmark);
  }

  getCardWidth() {
    if(window) {
      let screenWidth = window.innerWidth;
      if(screenWidth > 1200) {
        return '33%';
      } else if(screenWidth > 900) {
        return '50%';
      }
    }
    return '100%';
  }

  renderCardView() {
    console.log(`render card view`);
    return (
      <sl-card class="card-header" style={{width: this.cardWidth}}>
        <div slot="header">
          <a href={this.bookmark.url} title={this.bookmark.title} target="_blank">
            {this.bookmark.title}
          </a>
          <sl-icon-button name="gear" label="Settings"
            onClick={()=>this.editBookmark()}></sl-icon-button>
        </div>
        {this.renderBookmarkLabels()}
        {this.bookmark.notes}
        <div style={{fontSize: '10px'}}>Last modified: {this.getDateString(this.bookmark.updatedAt)}</div>
        <div style={{fontSize: '10px'}}>Created at: {this.getDateString(this.bookmark.createdAt)}</div>
      </sl-card>
    );
  }
  
  getDateString(date) {
    return new Date(date).toLocaleDateString('en-US');
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
        <div style={{fontSize: '10px'}}>Last modified: {this.getDateString(this.bookmark.updatedAt)}, Created at: {this.getDateString(this.bookmark.createdAt)}</div>
        {this.renderBookmarkLabels()}
        <sl-divider style={{'--color': '#0069cc'}}></sl-divider>
      </div>
    )
  }

  renderTableView() {
    return (
      <tr>
        table row
      </tr>
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
