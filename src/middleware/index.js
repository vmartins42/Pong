const simpleMiddleWare = info => ({ dispatch, getState }) => {

  return next => action => {
    if (info && action.type && action.type.indexOf('server/') === 0) {
      const serverAction = action.type.split('/')
      /* send to your server */
      console.log("4rhe");
    }
    return next(action)
  }
}

export default simpleMiddleWare
