import React, { useState } from 'react';
import Category from '../Category/Category';
import './Categories.scss';

let categoriesData = [ 
  'The Library Shelves',
  'The Lounge',
  'Readeer’s Hub',
  'Forum Statistics'
]
const Categories = (props) => {
  
  return ( 
    <div id='catgories'>
      { 
        categoriesData.map(item => { 
          return (
            <Category 
              categoryName = 'The Lougue'
            />
            
          )
        })
      }
    </div>
  )
}

export default Categories;