import React from "react";

import classNames from "classnames";
import { root, titleBlock, date, description } from './ListItem.scss';

interface ListItemProps {
  itemData: { [key: string]: any }
}

const ListItem: React.FC<ListItemProps> = ({ itemData }) => {
  const maxOverviewLength = 150;
  const { title, release_date: release, poster_path: cover, overview } = itemData;
  const coverPath = 'https://image.tmdb.org/t/p/w185/'

  return (
    <li className={root}>
      <div>
        <div className={titleBlock}>
          <h4>{title}</h4>
          <span className={date}>{release}</span>
        </div>
        <img src={coverPath + cover} width="" height="" alt={title} className={cover} />
        <div>
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
