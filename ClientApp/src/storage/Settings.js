export default class SettingsStore{
    static get() {
        let defaultProps = {
            baseUrl: "https://cfgdev.pcm.infor.com",
            tenantId: "CPQ_DEV",
            redirectUrl: "https://ignore.me",
            useApiKey: false,
            key: "key",
            secret: "secret"
          };
      
          return JSON.parse(localStorage.getItem('configurator-settings')) || defaultProps
    }

    static set(settings)
    {
        localStorage.setItem('configurator-settings', JSON.stringify(settings));
    }
}