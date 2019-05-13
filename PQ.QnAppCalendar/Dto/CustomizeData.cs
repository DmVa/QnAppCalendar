using PQ.QnAppCalendar.DataService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PQ.QnAppCalendar.Dto
{
    public class CustomizeData
    {
        public int UnitId { get; set; }
        public int ConfigId { get; set; }
        public List<CustomizeCalendarStage> Stages { get; set; }
        public List<CustomizeStageService> NotShownServices { get; set; } 
    }

    public class CustomizeCalendarStage : CalendarStage
    {
        public List<CustomizeStageService> Services { get; set; }
    }

    public class CustomizeStageService: CalendarStageService
    {
        public string Name { get; set; }
    }
}
