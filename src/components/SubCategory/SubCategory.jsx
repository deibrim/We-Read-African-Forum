import React, { useState } from 'react';
import './SubCategory.scss';

const SubCategory = (props) => { 

  return ( 
    <div id='subCategories'>
      <div id='subCategoriesIcon'></div>
      <div id='titleDeatils'>
        <h1> {props.subCatName} </h1>
        <p> {props.subTitle} </p>
      </div>
      <div id='subCategoriesNums'>
        <h1>{props.subPostNum}</h1>
        <p>Posts</p>
      </div>
      <div id='subCategoriesLatest'>
        <div className="latestUserImg">
          <img src={props.lastPostAuthorImg} alt=''/>
        </div>
        <div id="latestUserDetails">
          <p>{props.lastPostTitle}</p>
          <p>By {props.lastPostAuthor}</p>
          <p>{props.lastPostDate}</p>
        </div>
      </div>
  </div>
  )
}

export default SubCategory;