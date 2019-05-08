using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PQ.QnAppCalendar.DataService
{
    public class CalendarStage
    {
        public int Id { get; set; }
        public int SortOrder { get; set; }
        public string Name { get; set; }
        public CalendarStageType StageType  {get;set; }
        public bool IsServiceDefault { get; set; }
    }
}
