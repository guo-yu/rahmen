import debug from 'debug'

export default (globalName) => {
  return () => {
    var args = Array.prototype.slice.call(arguments, 0);

    return debug(
      args.length > 0 ?
      [globalName, args.join(':')].join(':') :
      globalName
    )
  }
}
