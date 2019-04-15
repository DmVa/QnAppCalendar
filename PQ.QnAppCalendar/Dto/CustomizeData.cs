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
        public List<CalendarStageWithStatuses> Stages { get; set; }
        public List<StageStatus> Available { get; set; }
    }

    public class CalendarStageWithStatuses
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int SortOrder { get; set; }
        public List<StageStatus> Statuses { get; set; }
        public CalendarStageType StageType { get;  set; }
    }

    public class StageStatus
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int StageId { get; set; }
    }
}
