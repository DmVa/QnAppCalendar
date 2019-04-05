using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PQ.QnAppCalendar.DataService
{
    public enum CalendarStageType
    {
        None,
        Expected,
        Waiting,
        InService,
        Completed,
        WaitingCustomerAction
    }
}
