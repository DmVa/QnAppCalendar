﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PQ.QnAppCalendar.Dto
{
    public class AppointmentChangedData
    {
        public int PreviousUnitId;
        public int NextUnitId;
        public SchedulerEvent SchedulerEvent;
    }
}
