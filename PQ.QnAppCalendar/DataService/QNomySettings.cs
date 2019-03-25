using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PQ.QnAppCalendar.DataService
{
    public class QNomySettings
    {
        public string QFlowConnectionString
        {
            get
            {
                return ConfigurationManager.ConnectionStrings["QFlowDB"].ConnectionString;
            }
        }
    }
}
