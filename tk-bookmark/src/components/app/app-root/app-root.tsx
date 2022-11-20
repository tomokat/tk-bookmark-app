import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: false,
})
export class AppRoot {

  render() {
    return (
      <div>
        <div class="header">
          <h1>Bookmark Application</h1>
        </div>
        
        <div class="row">
          <div class="col-3 col-s-3 menu">
            <tk-bookmark-label></tk-bookmark-label>
          </div>
          <div class="col-9 col-s-9">
            <tk-bookmark></tk-bookmark>
          </div>
        </div>

        <div class="footer">
          <p>Made with Stencil JS, Nest JS, Mongoose and MongoDB</p>
        </div>
      </div>
    );
  }

}
