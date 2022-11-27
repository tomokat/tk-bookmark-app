import { Component, Event, EventEmitter, h } from '@stencil/core';

import state from '../../../stores/tk-bookmark-store';

@Component({
  tag: 'tk-add-label',
  shadow: false,
})
export class TkAddLabel {

  @Event() addLabelSuccess: EventEmitter;



  addLabelWithEnterKey(event) {
    let newLabel = event.target.value;
    if(event.keyCode === 13) {

      if(this.isExistingLabel(newLabel)) {
        console.log(`[${newLabel}] is alredy existed - abort add label`);  
        return;
      }

      this.addLabel(newLabel);
      event.target.value = '';
    }
  }

  addLabelWithButtonClick(event) {
    let newLabel = event.target.parentElement.value;

    if(this.isExistingLabel(newLabel)) {
      console.log(`[${newLabel}] is alredy existed - abort add label`);  
      return;
    }

    this.addLabel(newLabel);
    event.target.parentElement.value = '';
  }

  isExistingLabel(newLabel) {
    let targetLabel = state.labels.find(label => {
      return label.caption.toLowerCase() === newLabel.toLowerCase()
    });
    return targetLabel;
  }

  addLabel(newLabel) {
    if(newLabel && newLabel.trim() !== '') {
      let requestData = { 'caption': newLabel };
      fetch(`${state.bookmarkApi}/label`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      }).then((res)=> {
        console.log(`Successfully added label! ${JSON.stringify(res.json())}`);
        //event.target.parentElement.value = '';
        this.addLabelSuccess.emit();
      });
    } else {
      console.log(`looks like empty data? ${newLabel}`);
    }
  }

  render() {
    return (
      <div>
        <sl-input name="newLabelInput" placeholder="" size="large"
          onKeyDown={(event)=>{this.addLabelWithEnterKey(event)}}>
          <sl-button size="small" variant="primary" slot="suffix" label="Add new label"
            onClick={(event) => this.addLabelWithButtonClick(event)}>Add</sl-button>  
        </sl-input>
      </div>
    );
  }

}
