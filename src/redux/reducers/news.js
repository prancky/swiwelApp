const news = (state = [], action) => {
  switch (action.type) {
    case 'NEWS_ACTION': {
      return {
        ...state,
        newsList: action.payload,
      };
    }
    case 'CUSTOM_NEWS_ACTION': {
      return {
        ...state,
        customNewsList: action.payload,
      };
    }
    default:
      return state;
  }
};
export default news;
