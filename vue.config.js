module.exports = {
    
    configureWebpack: (config) => {
        config.externals = { 'child_process': 'require("electron").remote.require("child_process")' };
      },
    pluginOptions: {
      electronBuilder: {
        nodeIntegration: true
      }
    }
  }