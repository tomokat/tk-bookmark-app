import { Component, Event, EventEmitter, h, Method, Prop, State } from '@stencil/core';

@Component({
  tag: 'tk-label-list',
  shadow: false,
})
export class TkLabelList {

  @Event() deleteLabelSuccess: EventEmitter;
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

  async getLabelData() {
    let response = await fetch('http://localhost:3000/label');
    let json = await response.json();
    this.labelList = [...json];
    return;
  }

  async deleteLabel(label) {
    console.log(`requested to delete [${label._id}, ${label.caption}]`);
    let response = await fetch(`http://localhost:3000/label/${label._id}`, {
      method: 'DELETE'
    }).then(()=> {
      console.log(`Successfully deleted a label`);
      this.deleteLabelSuccess.emit();
      this.getLabelData();
    });
  }

  async updateLabel(event, label) {
    let updateData = { caption: event.target.value };
    let response = await fetch(`http://localhost:3000/label/${label._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData)
    }).then(()=> {
      this.updateLabelSuccess.emit();
    });
  }

  toggleLabelSelection(event, label) {
    label.selected = !label.selected;
    event.target.checked = label.selected;
  }

  renderNormal() {
    return (
      <div>
        <sl-menu>
        {this.labelList.map(label =>
          <sl-menu-item onClick={(event)=>this.toggleLabelSelection(event, label)}>
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
        { this.labelList.map(label =>
          <div>
            <sl-input name="newLabelInput" value={label.caption} style={{width: '100%'}}
              onBlur={(event)=>this.updateLabel(event, label)}>
              <sl-icon-button name="trash" slot="suffix" label="Add new label"
                onClick={() => this.deleteLabel(label)}></sl-icon-button>
            </sl-input>
          </div>
        )}
      </div>
    );
  }

  render() {
    if(!this.labelList) {
      return;
    }

    if(this.isEditMode) {
      return this.renderEditMode();
    }
    return this.renderNormal();
  }

}
