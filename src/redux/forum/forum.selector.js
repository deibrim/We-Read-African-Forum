import { createSelector } from 'reselect';

const selectForum = state => state.forum;
export const selectAllForumTopics = createSelector(
  [selectForum],
  forum => forum.forums
);
export const selectForumPreviewData = createSelector(
  [selectForum],
  forum => forum.forumPreviewData
);
export const selectSubForumRoutes = createSelector(
  [selectForumPreviewData],
  forum => {
    const routees = []
    forum.forEach(item => routees.push(item.id))
    return routees.length === forum.length ? routees : []
  }
);
export const selectLatestTopics = createSelector(
  [selectForumPreviewData],
  forum => {
    const routees = []
    forum.forEach(item => {
      item.data.forEach(item2 => {
        if (item2.latest_post.body) {
          routees.push(item2)
        }
      })
    })
    return routees
  }
);
export const selectSubForumTopicRoutes = createSelector(
  [selectForumPreviewData],
  forum => {
    const routees = []
    const routes = []
    forum.forEach(item => {
      routes.push(item.id)
    })
    routes.forEach(item => {
      forum.forEach(item2 => {
        if (item === item2.id) {
          const routeesObj = {
            route: item,
            subRoutes: []
          }
          item2.data.forEach(item3 => {
            routeesObj.subRoutes.push(`${item}/${item3.id.split('_').join(' ').split(',').join(' ').split(' ').join('_').split('/').join('').toLowerCase()}`)
          })
          routees.push(routeesObj.subRoutes)
        }
      })
    })
    return routees
  }
);
export const selectToggleEdit = createSelector(
  [selectForum],
  forum => forum.isEditing
);
