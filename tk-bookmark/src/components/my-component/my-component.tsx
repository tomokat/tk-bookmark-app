import { Component, Prop, h } from '@stencil/core';
import { format } from '../../utils/utils';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: false,
})
export class MyComponent {
  /**
   * The first name
   */
  @Prop() first: string;

  /**
   * The middle name
   */
  @Prop() middle: string;

  /**
   * The last name
   */
  @Prop() last: string;

  private getText(): string {
    return format(this.first, this.middle, this.last);
  }

  render() {
    //return <div>Hello Tomo, World! I'm {this.getText()}</div>;
    return (
      <div>
        <sl-breadcrumb>
          <sl-breadcrumb-item>
            <sl-icon slot="prefix" name="house"></sl-icon>
            Home
          </sl-breadcrumb-item>
          <sl-breadcrumb-item>Clothing</sl-breadcrumb-item>
          <sl-breadcrumb-item>Shirts</sl-breadcrumb-item>
        </sl-breadcrumb>
        <sl-button>Button</sl-button>
      </div>
      
      // <sl-split-panel>
      //   <div slot="Labels"
      //     style={{height: '200px'}}>

      //   </div>
      //   <div slot="Bookmarks"
      //     style={{height: '200px'}}>

      //   </div>
      // </sl-split-panel>
    );
  }
}
