using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.Specialized;

namespace PQ.QnAppCalendar.ViewService
{
    public class QueryStringParams : NameValueCollection
    {
        private const string ACTION = "act";
        public const string GET_UNITS = "load-units";
        public const string GET_APPOINTMENTS = "load-appointmens";
        public const string SAVE_APPOINTMENT = "save-appointment";
        public const string GET_CUSTOMIZEDATA = "get-customizedata";
        public const string SAVE_CUSTOMIZEDATA = "save-customizedata";

        public QueryStringParams(NameValueCollection query): base(query)
        {
        }

        public string Value(string paramName)
        {
           var value = this.BaseGet(paramName);
            if (value == null)
                return string.Empty;
            object data = null;
            if (value is ArrayList)
            {
                ArrayList items = (ArrayList)value;
                if (items.Count == 0)
                    return string.Empty;
                data = items[0];
            }
            else
            {
                data = value;
            }

           return data.ToString() ?? string.Empty;
        }

        public string Action
        {
            get
            {
                return Value(ACTION);
            }
        }
    }
}
