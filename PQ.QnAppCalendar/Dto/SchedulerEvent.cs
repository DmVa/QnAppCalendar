using PQ.QnAppCalendar.DataService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PQ.QnAppCalendar.Dto
{
    public class SchedulerEvent
    {
        public SchedulerEvent() { }
        public string Id;
        public string Text;
        public DateTime Start_date;
        public DateTime End_date;
        public int Unitid;
        public int AppointmentId;
        public int ServiceId;
        public CalendarStageType CalendarStageType;
    }
}