const WebTorrentSubtitles = require('./webtorrent-subtitles.js')
const webTorrentSubtitles = new WebTorrentSubtitles()

exports.onApp = (app) => {
  webTorrentSubtitles.setApp(app)
}

exports.onWindow = (win) => {
  webTorrentSubtitles.setWindow(win)
}

exports.onCheckForSubtitles = () => {
  webTorrentSubtitles.onCheckForSubtitles()
}

exports.initRenderer = (params) => {
  webTorrentSubtitles.initRenderer(params)
}

exports.decorateConfig = (appConfig) => {
  return webTorrentSubtitles.decorateConfig(appConfig)
}

exports.decorateMenu = (menu) => {
  return webTorrentSubtitles.decorateMenu(menu)
}

exports.decorateWindow = (options) => {
  return webTorrentSubtitles.decorateWindow(options)
}
