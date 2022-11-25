# app-root



<!-- Auto Generated Below -->


## Dependencies

### Depends on

- [tk-bookmark-label](../../bookmark/tk-bookmark-label)
- [tk-bookmark](../../bookmark/tk-bookmark)

### Graph
```mermaid
graph TD;
  app-root --> tk-bookmark-label
  app-root --> tk-bookmark
  tk-bookmark-label --> tk-bookmark-label-bar
  tk-bookmark-label --> tk-label-list
  tk-bookmark-label --> tk-add-label
  tk-bookmark --> tk-bookmark-bar
  tk-bookmark --> tk-bookmark-list
  tk-bookmark --> tk-add-or-edit-bookmark
  tk-bookmark-list --> tk-add-or-edit-bookmark
  tk-bookmark-list --> tk-bookmark-list-item
  tk-add-or-edit-bookmark --> tk-add-tags
  style app-root fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
