import { createStore } from '@stencil/store';

const { state, onChange } = createStore({
  bookmarks: []
});

onChange('bookmarks', value => {
  console.log(`bookmarks change detected`);
});

export default state;