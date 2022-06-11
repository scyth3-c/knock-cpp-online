//electron file

module.exports = {
    pluginOptions: {
    electronBuilder: {
        builderOptions: {

            productName: "Knock Compiler",
            appId: 'bohordo.codes.compiler',
            win: {
                "target": [
                    "nsis"
                ],
              icon: 'public/svg.png',
              "requestedExecutionLevel": "requireAdministrator"
            },
            linux: {
              "target": [
                  "deb"
              ],
              icon: 'public/svg.png',
            },
            
            "deb": {
                "maintainer": "bohordo.png@gmail.com",
                "synopsis": "a small compiler for c++",
                "category": "development",
            },

            "nsis": {
                "installerIcon": "public/favicon.ico",
                "uninstallerIcon": "public/favicon.ico",
                "uninstallDisplayName": "Knock Compiler",
                "license": "licence.txt",
                "oneClick": false,
                "allowToChangeInstallationDirectory": true
            }

        },
    },
},
}