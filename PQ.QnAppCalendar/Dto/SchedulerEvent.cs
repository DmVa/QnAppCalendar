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
        public string Id { get; set; }
        public string ServiceName { get; set; }
        public string CustomerName { get; set; }
        public DateTime Start_date { get; set; }
        public DateTime End_date { get; set; }
        public int StageId { get; set; }
        public int AppointmentId { get; set; }
        public int ServiceId { get; set; }
        public CalendarStageType StageType { get; set; }
        public int ProcessId { get; set; }
    }
}