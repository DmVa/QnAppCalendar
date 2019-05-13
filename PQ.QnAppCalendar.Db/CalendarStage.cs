using System;
using System.Collections.Generic;
using System.ComponentModel;
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
        [ForeignKey("CalendarStageConfigId")]
        public CalendarStageConfig CalendarStageConfig { get; set; }
        public int CalendarStageConfigId { get; set; }
        [DefaultValue(0)]
        public int SortOrder { get; set; }
        [Column(TypeName = "NVARCHAR")]
        [StringLength(250)]
        public string Name { get; set; }
        public int StageType  {get;set; }
        [DefaultValue(0)]
        public int IsServiceDefault { get; set; }
    }
}
