using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PQ.QnAppCalendar.ViewService.Data
{
    public class AppointmentInfo
    {
        public int AppointmentId { get; set; }
        public int UnitId { get; set; }
        public DateTime AppointmentDate { get; set; }
        public int AppointmentDuration { get; set; }
        public string ServiceName { get; set; }
        public string AppointmentTypeName { get; set; }
        public string CustomerFirstName { get; set; }
        public string CustomerLastName { get; set; }
    }
}
