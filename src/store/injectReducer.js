// eslint-disable-next-line import/no-anonymous-default-export
export default (initialState, handlers) => (
  state = initialState,
  action = {},
) =>
  action.hasOwnProperty('type')
    ? handlers[action.type]
    ? handlers[action.type](state, action)
    : state
    : state;
