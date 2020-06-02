import React, { useState } from 'react';
import Category from '../Category/Category';
import './Categories.scss';

const Categories = (props) => { 
  return ( 
    <div id='catgories'>
      <Category 
        categoryName = 'The Lougue'
      />
    </div>

  )
}

export default Categories;