using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PQ.QnAppCalendar.Db
{
    [Table("CalendarStageService", Schema = "pq")]
    public class CalendarStageService
    {
        public int Id { get; set; }
        [ForeignKey("CalendarStageId")]
        public CalendarStage CalendarStage { get; set; }
        public int CalendarStageId { get; set; }

        public int ServiceId { get; set; }
    }
}
