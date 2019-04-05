using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PQ.QnAppCalendar.Db
{
    public class PQDbContext:  DbContext
    {
        public PQDbContext() : base("QFlowDB")
        {

        }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
          
        
        }

        public virtual DbSet<CalendarStage> CalendarStages { get; set; }
       public virtual DbSet<CalendarStageService> CalendarStageServices { get; set; }
    }
}
