
export const getEventHelper = ({ eventEmitter }) => ({ type, payload }) => eventEmitter.emit(type, payload)