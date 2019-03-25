using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PQ.QnAppCalendar
{
    public class ResponseWrapperError
    {
        public string Message { get; set; }

        public string Exception { get; set; }

        public ResponseWrapperError()
        {
        }
        public ResponseWrapperError(Exception ex)
        {
            Message = ex.Message;
            Exception = ex.ToString();
        }
    }
}
