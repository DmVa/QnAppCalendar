using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PQ.QnAppCalendar
{
    public class ResponseWrapper
    {
        public bool IsSuccess { get; set; }

        public TimeSpan ProcessingTime { get; set; }

        public ResponseWrapperError Error { get; set; }
    }

    public class ResponseWrapper<T> : ResponseWrapper
    {
        public T Data { get; set; }
    }
}
