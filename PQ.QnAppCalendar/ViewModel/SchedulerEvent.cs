using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PQ.QnAppCalendar.ViewModel
{
    public class SchedulerEvent
    {
        public SchedulerEvent() { }
        public string Id;
        public string Text;
        public DateTime Start_date;
        public DateTime End_date;
        public string Unitid;
        public int AppointmnetId;
    }
}