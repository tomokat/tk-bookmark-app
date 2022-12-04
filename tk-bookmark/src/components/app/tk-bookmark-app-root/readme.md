# app-root



<!-- Auto Generated Below -->


## Dependencies

### Depends on

- [tk-app-splash](../../common/tk-app-splash)
- [tk-bookmark-label](../../bookmark/tk-bookmark-label)
- [tk-bookmark](../../bookmark/tk-bookmark)

### Graph
```mermaid
graph TD;
  tk-bookmark-app-root --> tk-app-splash
  tk-bookmark-app-root --> tk-bookmark-label
  tk-bookmark-app-root --> tk-bookmark
  tk-bookmark-label --> tk-bookmark-label-bar
  tk-bookmark-label --> tk-label-list
  tk-bookmark-label --> tk-add-label
  tk-bookmark --> tk-bookmark-bar
  tk-bookmark --> tk-bookmark-list
  tk-bookmark --> tk-add-or-edit-bookmark
  tk-bookmark-list --> tk-add-or-edit-bookmark
  tk-bookmark-list --> tk-bookmark-list-item
  tk-bookmark-list --> tk-bookmark-table
  tk-add-or-edit-bookmark --> tk-add-tags
  tk-bookmark-table --> tk-table
  style tk-bookmark-app-root fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
