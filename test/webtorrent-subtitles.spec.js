const {expect} = require('chai')
const WebTorrentTransparent = require('../webtorrent-transparent')
const webTorrentTransparent = new WebTorrentTransparent()

const win = {
  setBackgroundColor: () => {},
  webContents: {
    executeJavaScript: () => {}
  }
}

describe('webtorrent-transparent', () => {
  it('WebTorrentTransparent should be defined', () => {
    expect(WebTorrentTransparent).to.not.be.undefined
  })

  it('an instance of WebTorrentTransparent should be created', () => {
    expect(webTorrentTransparent).to.not.be.undefined
  })

  it('it should have default config', () => {
    const defaultConfig = {backgroundColor: 'rgba(0,0,0,0.1)', opacity: 0.9}
    expect(webTorrentTransparent.config).to.eql(defaultConfig)
  })

  it('should set window', () => {
    webTorrentTransparent.setWindow(win)
    expect(webTorrentTransparent.win).to.eql(win)
  })

  it('should set transparency', () => {
    // note: background color should not change
    webTorrentTransparent.setTransparency(0)
    expect(webTorrentTransparent.config.backgroundColor).to.eql('rgba(0,0,0,0.1)')
    expect(webTorrentTransparent.config.opacity).to.eql(0)

    webTorrentTransparent.setTransparency(1)
    expect(webTorrentTransparent.config.backgroundColor).to.eql('rgba(0,0,0,0.1)')
    expect(webTorrentTransparent.config.opacity).to.eql(1)

    webTorrentTransparent.setTransparency(0.5)
    expect(webTorrentTransparent.config.backgroundColor).to.eql('rgba(0,0,0,0.1)')
    expect(webTorrentTransparent.config.opacity).to.eql(0.5)

    webTorrentTransparent.setTransparency(0.9)
    expect(webTorrentTransparent.config.backgroundColor).to.eql('rgba(0,0,0,0.1)')
    expect(webTorrentTransparent.config.opacity).to.eql(0.9)
  })

  it('should save latest config', () => {
    webTorrentTransparent.setTransparency(0)
    webTorrentTransparent.saveConfig()
    let config = require('../webtorrent-transparent.json')
    expect(config.backgroundColor).to.eql('rgba(0,0,0,0.1)')
    expect(webTorrentTransparent.config.opacity).to.eql(0)

    // restore default config and test again
    webTorrentTransparent.setTransparency(0.9)
    webTorrentTransparent.saveConfig()
    config = require('../webtorrent-transparent.json')
    expect(config.backgroundColor).to.eql('rgba(0,0,0,0.1)')
    expect(webTorrentTransparent.config.opacity).to.eql(0.9)
  })

  it('should decorate menu', () => {
    const menu = [
      {label: 'Other', submenu: []},
      {label: 'View', submenu: []}
    ]
    const decoratedMenu = webTorrentTransparent.decorateMenu(menu)

    expect(Array.isArray(decoratedMenu)).to.equal(true)
    expect(decoratedMenu[0].label).to.equal('Other')
    expect(decoratedMenu[1].label).to.equal('View')
    expect(decoratedMenu[1].submenu[1].label).to.equal('Transparency')
    expect(decoratedMenu[1].submenu[1].submenu[0].label).to.equal('Off')
    expect(decoratedMenu[1].submenu[1].submenu.slice(-1)[0].label).to.equal('Max')
  })

  it('should decorate config', () => {
    const config = {name: 'Something'}
    const decoratedConfig = webTorrentTransparent.decorateConfig(config)

    expect(decoratedConfig.name).to.eql(config.name)
    expect(decoratedConfig.backgroundColor).to.eql('rgba(0,0,0,0.1)')
    expect(decoratedConfig.opacity).to.eql(0.9)
  })
})
