import { createStore } from '@stencil/store';

const { state, onChange } = createStore({
  bookmarkDisplayType: 'Card',
  bookmarks: [],
  labels: [],
  loadedLabel: false
});

onChange('loadedLabel', value => {
  console.log(`loadedLabel change detected [${value}]`);
});

export default state;