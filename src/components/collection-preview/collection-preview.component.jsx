import React from 'react'
import CollectionItem from '../collection-item/collection-item.component'
import './collection-preview.styles.scss'

const CollectionPreview = ({ title, items }) => (
  <div className="collection-preview">
    <div className="title">{title}</div>
    <div className="preview">
      {items
        .filter((item, index) => index < 4)
        .map(({ id, ...itemProps }) => (
          <CollectionItem key={id} {...itemProps} />
        ))}
    </div>
  </div>
)

export default CollectionPreview
