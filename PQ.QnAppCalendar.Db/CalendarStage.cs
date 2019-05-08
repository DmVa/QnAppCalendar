using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PQ.QnAppCalendar.Db
{
    [Table("CalendarStage", Schema = "pq")]
    public class CalendarStage
    {
        public int Id { get; set; }
        public int SortOrder { get; set; }
        [Column(TypeName = "NVARCHAR")]
        [StringLength(250)]
        public string Name { get; set; }
        public int StageType  {get;set; }
        public int IsServiceDefault { get; set; }
    }
}
