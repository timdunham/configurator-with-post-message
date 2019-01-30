using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace ConfiguratorWithPostMessage.Controllers
{
    [Route("api/[controller]")]
    public class ConfiguratorController : Controller
    {
        [HttpGet("[action]/{rulesetNamespace}/{rulesetName}")]
        public InteractiveUrl PrepareForInteractive(string rulesetNamespace, string rulesetName)
        {
            return new InteractiveUrl() {Url=$"https://localhost:5001/{rulesetNamespace}/{rulesetName}"  };
        }
    }
    public class InteractiveUrl{
        public string Url { get; set; }
    }
}
