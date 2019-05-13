using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PQ.QnAppCalendar.Db
{
    [Table("CalendarStageConfig", Schema = "pq")]
    public class CalendarStageConfig
    {
        public int Id { get; set; }
        public int UnitId { get; set; }
    }
}
