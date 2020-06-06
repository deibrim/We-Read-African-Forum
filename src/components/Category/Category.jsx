import React, { useState } from 'react';
import './Category.scss';

import SubCategory from '../SubCategory/SubCategory';

const Category = ({ categoryName, categoryData }) => {
  const [showSub, setshowSub] = useState(true);
  const handleShowSubToggle = (e) => {
    showSub ? setshowSub(false) : setshowSub(true);
  }

  return (
    <div id='category'>
      <div className='bar'>
        <p>{categoryName}</p>
        <div
          id="arrowDown"
          onClick={handleShowSubToggle}
          data-rotate={showSub}
        >
      </div>
      </div>
      {
        categoryData.map((item, index) =>
          <div id="categorList" key={index} data-showsub={showSub}>
            <SubCategory
              subCatName={item.id}
              subTitle={item.description}
              subPostNum={item.post_count}
              categoryName={categoryName}
              data={item}
              latestPost={item.latest_post}
            />
          </div>)
      }
    </div>
  )
}

export default Category;