using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PQ.QnAppCalendar.Dto
{
    public class GetAppointmentsData
    {
        public string CurrentDateStr { get; set; }
        public List<SchedulerEvent> SchedulerEvents { get; set; }
    }
}
