using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using QFlow.Library;

namespace PQ.QnAppCalendar
{
    public class DataException: Exception
    {
        public DataException(string message) : base(message)
        {
        }

        public static DataException GetDataException(ProcessEnqueueAppointmentResults.ProcessEnqueueAppointmentResultsStatus status)
        {
            string message = "";
            switch (status)
            {
                case ProcessEnqueueAppointmentResults.ProcessEnqueueAppointmentResultsStatus.Late:
                    message = "Late";
                    break;
                case ProcessEnqueueAppointmentResults.ProcessEnqueueAppointmentResultsStatus.PreventAutoQueue:
                    message = "Auto Queue is prevented";
                    break;
                case ProcessEnqueueAppointmentResults.ProcessEnqueueAppointmentResultsStatus.Success:
                    message = "Ok";
                    break;
                case ProcessEnqueueAppointmentResults.ProcessEnqueueAppointmentResultsStatus.TooEarly:
                    message = "Too early";
                    break;
                case ProcessEnqueueAppointmentResults.ProcessEnqueueAppointmentResultsStatus.TooLate:
                    message = "Too late";
                    break;
            }

            return new DataException(message);
        }
    }
}
