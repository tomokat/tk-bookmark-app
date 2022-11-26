import { createStore } from '@stencil/store';

function getBookmarkApiPerEnvironment() {
  if(location.hostname === 'localhost' && location.port === '3333') {
    return 'http://localhost:3000/bookmark-api';
  }
  return 'bookmark-api';
}

const { state, onChange } = createStore({
  bookmarkApi: getBookmarkApiPerEnvironment(),
  bookmarkDisplayType: 'Card',
  bookmarks: [],
  labels: [],
  loadedLabel: false
});

onChange('loadedLabel', value => {
  console.log(`loadedLabel change detected [${value}]`);
});

export default state;