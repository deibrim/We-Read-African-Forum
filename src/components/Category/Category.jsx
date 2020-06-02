import React, { useState } from 'react';
import './Category.scss';

import SubCategory from '../SubCategory/SubCategory';

const Category = (props) => { 

  const [showSub, setshowSub] = useState(true);

  const handleShowSubToggle = (e) => { 
    showSub ? setshowSub(false) : setshowSub(true);
  }


  let forumPreviewData = [ 
    { 
      subsCategory: { 
        subCatName: 'Forum Updates',
        subCatTilte: 'General updates on the future plans for our community.',
        subPostNum: 234,
        lastesPostDetails: { 
          title: `Do you like to like`,
          authorImg: 'https://avatars1.githubusercontent.com/u/30846348?s=460&u=2b42c8f066c074b3183772888aba9a58ac1d50de&v=4',
          date: `22, March`,
          author: 'Bolu'
        }
      }
    },
    { 
      subsCategory: { 
        subCatName: 'Introductions',
        subCatTilte: 'Come and introduce yourself to other members.',
        subPostNum: 1934,
        lastesPostDetails: { 
          title: `Buy a book today`,
          authorImg: 'https://i.pinimg.com/originals/5a/3d/df/5a3ddf6991d1d7f3cd278ce9b8b9862a.jpg',
          date: `12, March`,
          author: 'James'
        }
      }
    },
  ]

  return ( 
    <div id='category'>
      <div className='bar'>
        <p>{props.categoryName}</p>
        <div 
        id="arrowDown" 
        onClick={handleShowSubToggle}
        data-rotate={showSub}
        >
      </div>
      </div>
      {
        forumPreviewData.map(item => { 
          console.log(item)
          let subCatg = item.subsCategory;
          return ( 
            <div id="categorList" data-showsub={showSub}>
              <SubCategory 
                subCatName = {subCatg.subCatName}
                subTitle = {subCatg.subCatTilte}
                subPostNum = {subCatg.subPostNum}
                lastPostTitle = {
                  subCatg.lastesPostDetails.title
                }
                lastPostAuthor = {
                  subCatg.lastesPostDetails.author
                }
                lastPostDate = { 
                  subCatg.lastesPostDetails.date
                }
                lastPostAuthorImg = { 
                  subCatg.lastesPostDetails.authorImg
                }
              />

            </div>
          )
        })
      }
    </div>
  )
}

export default Category;