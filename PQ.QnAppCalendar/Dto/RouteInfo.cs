using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PQ.QnAppCalendar.Dto
{
    public class RouteInfo
    {
        public int RouteId { get; set; }
        public int ServiceId { get; set; }
        public int TargetServiceId { get; set; }
        public int TargetType { get; set; }
    }
}
