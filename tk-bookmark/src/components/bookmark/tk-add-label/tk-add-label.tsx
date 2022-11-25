import { Component, Event, EventEmitter, h } from '@stencil/core';

import state from '../../../stores/tk-bookmark-store';

@Component({
  tag: 'tk-add-label',
  shadow: false,
})
export class TkAddLabel {

  @Event() addLabelSuccess: EventEmitter;

  addLabel(event) {
   let newLabel = event.target.parentElement.value;
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
        event.target.parentElement.value = '';
        this.addLabelSuccess.emit();
      });
    } else {
      console.log(`looks like empty data? ${newLabel}`);
    }
  }

  render() {
    return (
      <div>
        <sl-input name="newLabelInput" placeholder="" size="large">
          <sl-icon-button name="plus-circle" slot="suffix" label="Add new label"
            onClick={(event) => this.addLabel(event)}></sl-icon-button>  
        </sl-input>
      </div>
      
      
    );
  }

}
