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

    //     [HttpGet("[action]/{rulesetNamespace}/{rulesetName}")]
    //     public InteractiveUrl PrepareForInteractive(string rulesetNamespace, string rulesetName)
    //     {
    //         var hs = new HostServices(_configuratorSettings.TenantId, _configuratorSettings.TenantId, _configuratorSettings.BaseUrl, _configuratorSettings.ApiKey);
    //         var ip = new TDCI.BuyDesign.Configurator.Integration.Data.InputParameters();
    //         ip.SetExchangeRate(1, "USD");
    //         ip.HeaderId = "PostMessage";
    //         ip.DetailId = "PostMessage";
    //         ip.PartNamespace = rulesetNamespace;
    //         ip.PartNumber = rulesetName;
    //         ip.Profile = "Default";

    //         var url = hs.PrepareForInteractiveConfiguration(ip, "", _configuratorSettings.RedirectUrl);
    //         return new InteractiveUrl() { Url = url };
    //     }

        [HttpPost("[action]")]
        public InteractiveUrl PrepareForInteractive([FromBody] ConfiguratorSettings settings)
        {
            var directory = settings.UseApiKey ? "/ConfiguratorService" : "/ConfiguratorServiceInternal";
            var url = $"{settings.BaseUrl}{directory}/v3/ProductConfigurator.svc";
            var hs = (settings.UseApiKey) 
                ? new HostServices(settings.TenantId, settings.TenantId, url, settings.ApiKey)
                : new HostServices(settings.TenantId, settings.TenantId, url, settings.Key, settings.Secret);
            var ip = new TDCI.BuyDesign.Configurator.Integration.Data.InputParameters();
            ip.SetExchangeRate(1, "USD");
            ip.HeaderId = "PostMessage";
            ip.DetailId = "PostMessage";
            ip.PartNamespace = settings.Namespace;
            ip.PartNumber = settings.Ruleset; 
            ip.Profile = "Default";

            hs.SetInProgressInputParameters(ip);
            var result = hs.GetInteractiveUrl(ip.HeaderId, ip.DetailId, "", settings.RedirectUrl);
            //var result = hs.PrepareForInteractiveConfiguration(ip, "", settings.RedirectUrl);

            return new InteractiveUrl() { Url = result };
        }

        // [HttpGet("[action]")]
        // public ConfiguratorSettings Settings()
        // {
        //     return _configuratorSettings;
        // }

        // [HttpPut("[action]")]
        // public ConfiguratorSettings Settings([FromBody] ConfiguratorSettings settings)
        // {
        //     _configuratorSettings = settings;
        //     return _configuratorSettings;
        // }
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
        public string RedirectUrl { get; set; }
        public string Key { get; set; }
        public string Secret { get; set; }
        public string Namespace { get; set; }
        public string Ruleset { get; set; }
    }
}
