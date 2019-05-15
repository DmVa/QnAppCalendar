using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PQ.QnAppCalendar.Dto
{
    public class SelectOptionData
    {
        public int SelectedId { get; set; }
        public List<KeyValuePair<int, string>> Options { get; set; }
    }
}
