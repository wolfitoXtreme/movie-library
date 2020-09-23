import React from "react";

import classNames from "classnames";
import { root, content, titleBlock, date, image, description } from './ListItem.scss';

interface ListItemProps {
  itemData: { [key: string]: any }
}

const ListItem: React.FC<ListItemProps> = ({ itemData }) => {
  const maxOverviewLength = 150;
  const { title, release_date: release, poster_path: cover, overview } = itemData;
  const coverPath = 'https://image.tmdb.org/t/p/w185/'

  return (
    <li className={root}>
      <div className={content}>
        <div className={titleBlock}>
          <h4>{title}</h4>
          <span className={date}>{release}</span>
        </div>
        <div className={image}>
          <figure>
            <img src={coverPath + cover} width="" height="" alt={title} />
          </figure>
        </div>
        <div className={description}>
          <p>
            {overview.substring(0, maxOverviewLength)} {overview.length > maxOverviewLength && '...'}
          </p>
        </div>
      </div>
      {/* <pre>{JSON.stringify(itemData, null, 2)}</pre> */}
    </li>
  )
}

export default ListItem;
