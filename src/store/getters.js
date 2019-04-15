const getters = {
  navType: state => state.app.navType,
  sidebar: state => state.app.sidebar,
  tagsView: state => state.app.tagsView,
  token: state => state.user.token
}
export default getters
