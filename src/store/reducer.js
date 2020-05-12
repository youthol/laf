const urls = {
    serve: 'https://youthapi.sdut.edu.cn/api/laf',
  };
  const initialState = {
    BASE_API: urls.serve
  };
  
  export default (state = initialState, actions) => {
    switch (actions.type) {
      default:
        return state;
    }
  };