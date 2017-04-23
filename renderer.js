const {resolve} = require('path')

/**
 * WebTorrent plugin to easily set window transparency.
 */
module.exports = class WebTorrentSubtitlesRenderer {
  constructor () {
    this.configFile = resolve(__dirname, 'config.json')
    this.config = require(this.configFile)
    this.state = {}
    this.dispatch
  }

  init ({state, dispatch}) {
    this.state = state
    this.dispatch = dispatch
  }

  onCheckForSubtitles (value) {
    console.log('--------- webtorrent-subtitles: onCheckForSubtitles', this)

    if (this.state.playing.type !== 'video') return
    const torrentSummary = this.state.getPlayingTorrentSummary()
    if (!torrentSummary || !torrentSummary.progress) return

    const subtitles = ['PATH-TO-SUBS-FILE-FOR-LOCAL-TESTING.srt']
    this.dispatch('addSubtitles', subtitles, true)
  }
}
