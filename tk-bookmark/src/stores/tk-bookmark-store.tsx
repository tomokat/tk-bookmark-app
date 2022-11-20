import { createStore } from '@stencil/store';

const { state, onChange } = createStore({
  bookmarks: [],
  labels: []
});

onChange('labels', value => {
  console.log(`label change detected`);
});

export default state;