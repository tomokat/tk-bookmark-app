import { Component, Event, EventEmitter, h, Method, Prop, State } from '@stencil/core';
import state from '../../../stores/tk-bookmark-store';

@Component({
  tag: 'tk-label-list',
  shadow: false,
})
export class TkLabelList {

  @Event() deleteLabelSuccess: EventEmitter;
  @Event() notifyLabelSelection: EventEmitter;
  @Event() updateLabelSuccess: EventEmitter;

  @Prop() isEditMode = false;
  @State() labelList = [];

  componentWillLoad() {
    this.getLabelData();
  }

  @Method()
  async reloadLabelList() {
    this.getLabelData();
  }

  getDataUrl() {
    if(state.user.email) {
      return `${state.bookmarkApi}/label/user/${state.user.email}`;
    }
    return `${state.bookmarkApi}/label/user/guest`;
  }

  async getLabelData() {
    state.loadedLabel = false;
    let response = await fetch(this.getDataUrl());
    let json = await response.json();
    this.labelList = [...json.sort((a,b) => a.caption.toLowerCase() > b.caption.toLowerCase() ? 1: -1)];
    state.labels = this.labelList;
    state.loadedLabel = true;
    return;
  }

  async deleteLabel(label) {
    console.log(`requested to delete [${label._id}, ${label.caption}]`);
    await fetch(`${state.bookmarkApi}/label/${label._id}`, {
      method: 'DELETE'
    }).then(() => {
      console.log(`Successfully deleted a label`);
      this.deleteLabelSuccess.emit();
      this.getLabelData();
    });
  }

  async updateLabel(event, label) {
    let updateData = { 
      caption: event.target.value,
      user: state.user.email
    };
    await fetch(`${state.bookmarkApi}/label/${label._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData)
    }).then(() => {
      this.updateLabelSuccess.emit();
    });
  }

  toggleLabelSelection(event, label) {
    label.selected = !label.selected;
    event.target.checked = label.selected;
    console.log(`toggle label ${label.caption}`);
    this.notifyLabelSelection.emit(this.labelList);
  }

  filterLabelList(event) {
    let filterValue = event.target.value;
    //console.log(`label fiter: ${filterValue}`);
    this.labelList = state.labels;
    if (filterValue && filterValue.trim()) {
      let filterList = this.labelList.filter(label => {
        return label.caption.toLowerCase().includes(filterValue.toLowerCase());
      });
      this.labelList = [...filterList];
    }
  }

  renderLabelFilter() {
    return (
      <sl-input class="labelListFilter" size="medium" style={{paddingBottom: '5px'}}
        onKeyUp={(event) => { this.filterLabelList(event) }}>
        <sl-icon name="search" slot="prefix"></sl-icon>
        <sl-badge slot="suffix" pill>{this.labelList.length}/{state.labels.length}</sl-badge>
      </sl-input>
    );
  }

  renderNormal() {
    return (
      <div>
        {this.renderLabelFilter()}
        <sl-menu>
          {this.labelList.map(label =>
            <sl-menu-item onClick={(event) => this.toggleLabelSelection(event, label)}>
              {label.caption}
            </sl-menu-item>
          )}
        </sl-menu>
      </div>
    );
  }

  renderEditMode() {
    return (
      <div>
        {this.renderLabelFilter()}
        {this.labelList.map(label =>
          <div>
            <sl-input name="newLabelInput" value={label.caption} style={{ width: '100%' }}
              onBlur={(event) => this.updateLabel(event, label)}>
              <sl-icon-button name="trash" slot="suffix" label="Add new label"
                onClick={() => this.deleteLabel(label)}></sl-icon-button>
            </sl-input>
          </div>
        )}
      </div>
    );
  }

  render() {
    if (!this.labelList) {
      return;
    }

    if (this.isEditMode) {
      return this.renderEditMode();
    }
    return this.renderNormal();
  }
}
