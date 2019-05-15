using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PQ.QnAppCalendar.Dto
{
    public class AppointmentChangedResult
    {
        public SchedulerEvent EventData { get; set; }
        public RouteResultData RouteData  { get; set; }
    }
}
