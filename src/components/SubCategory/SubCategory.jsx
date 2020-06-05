import React, { useState } from 'react';
import './SubCategory.scss';

const SubCategory = ({ subCatName,
  subTitle,
  subPostNum,
  latestPost }) => {
  const date = new Date(latestPost.posted_at ? latestPost.posted_at * 1000 : 1591257725),
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
        <h1> {subCatName.split('_').join(' ')} </h1>
        <p> {subTitle} </p>
      </div>
      <div id='subCategoriesNums'>
        <h1>{subPostNum}</h1>
        <p>Posts</p>
      </div>
      <div id='subCategoriesLatest'>
        <div className="latestUserImg">
          <img src={latestPost.user !== undefined ? latestPost.user.profile_pic : null} alt='' />
        </div>
        <div id="latestUserDetails">
          <p>{latestPost.title ? latestPost.title : ''}</p>
          <p>{latestPost.user ? `By ${latestPost.user.displayName}` : ''}</p>
          <p>{`${currentMonth} ${day}`}</p>
        </div>
      </div>
    </div>
  )
}

export default SubCategory;