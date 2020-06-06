import React from 'react';
import { Link } from 'react-router-dom';
import userIcon from '../../assets/userIco.svg'
import './SubCategory.scss';

const SubCategory = ({ data, categoryName,
}) => {
  const date = new Date(data.latest_post.posted_at ? data.latest_post.posted_at * 1000 : 1591257725),
    months = [
      'January',
      'Febuary',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    currentMonth = months[date.getMonth()],
    day = date.getDay();

  return (
    <div id='subCategories'>
      <div id='subCategoriesIcon'></div>
      <div id='titleDeatils'>
        <Link to={`/${categoryName.split(' ').join('_').toLowerCase()}/${data.id.split('_').join(' ').split(',').join(' ').split(' ').join('_').split('/').join('').toLowerCase()}`} >
          <h1> {data.id.split('_').join(' ')} </h1>
        </Link>
        <p> {data.description} </p>
      </div>
      <div id='subCategoriesNums'>
        <h1>{data.post_count}</h1>
        <p>Posts</p>
      </div>
      <div id='subCategoriesLatest'>
        <div className="latestUserImg">
          <img src={data.latest_post.user !== undefined ? data.latest_post.user.profile_pic : userIcon} alt='' />
        </div>
        <div id="latestUserDetails">
          <p>{data.latest_post.title ? data.latest_post.title : ''}</p>
          <p>{data.latest_post.user ? `By ${data.latest_post.user.displayName}` : ''}</p>
          <p>{`${currentMonth} ${day}`}</p>
        </div>
      </div>
    </div>
  )
}

export default SubCategory;