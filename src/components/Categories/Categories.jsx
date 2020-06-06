import React from 'react';
import Category from '../Category/Category';
import './Categories.scss';

const Categories = ({ data }) => {
  // console.log(data);

  return (
    <div id='catgories'>
      <Category
        categoryName={data.id.split('_').join(' ').replace(/\b[a-z]/gi, char => char.toUpperCase())}
        categoryData={data.data}
      />
    </div>
  )
}

export default Categories;