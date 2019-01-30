using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Infor.Configurator.ServiceContract.V3;
using Microsoft.AspNetCore.Mvc;
using TDCI.BuyDesign.Configurator.Integration.Web;

namespace ConfiguratorWithPostMessage.Controllers
{
    [Route("api/[controller]")]
    public class ConfiguratorController : Controller
    {
        static ConfiguratorSettings _configuratorSettings = new ConfiguratorSettings()
        {
            BaseUrl = "https://cfgdev.pcm.infor.com/ConfiguratorService/v3/ProductConfigurator.svc",
            UseApiKey = true,
            ApiKey="A2FC31C11E35643F3947CBB7E1B24D",
            TenantId="CPQ_DEV",
            RedirectUrl = "https://ignore.me"
        };

        [HttpGet("[action]/{rulesetNamespace}/{rulesetName}")]
        public InteractiveUrl PrepareForInteractive(string rulesetNamespace, string rulesetName)
        {
            var hs = new HostServices(_configuratorSettings.TenantId, _configuratorSettings.TenantId,_configuratorSettings.BaseUrl, _configuratorSettings.ApiKey);
            var ip = new TDCI.BuyDesign.Configurator.Integration.Data.InputParameters();
            ip.SetExchangeRate(1, "USD");
            ip.HeaderId="PostMessage";
            ip.DetailId="PostMessage";
            ip.PartNamespace = rulesetNamespace;
            ip.PartNumber = rulesetName;
            ip.Profile = "Default";

            var url = hs.PrepareForInteractiveConfiguration(ip, "", _configuratorSettings.RedirectUrl);
            return new InteractiveUrl() {Url= url };
        }
        [HttpGet("[action]")]
        public ConfiguratorSettings Settings(){
            return _configuratorSettings;
        }

        [HttpPut("[action]")]
        public ConfiguratorSettings Settings(ConfiguratorSettings settings)
        {
            _configuratorSettings = settings;
            return _configuratorSettings;
        }
    }
    public class InteractiveUrl
    {
        public string Url { get; set; }
    }
    public class ConfiguratorSettings
    {    
        public string BaseUrl { get; set; }
        public string TenantId { get; set; }
        public bool UseApiKey { get; set; }
        public string ApiKey { get; set; }
        public string RedirectUrl { get; internal set; }
    }
}
