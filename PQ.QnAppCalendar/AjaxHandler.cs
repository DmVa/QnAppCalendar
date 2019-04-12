using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using PQ.QnAppCalendar.DataService;
using PQ.QnAppCalendar.Dto;
using PQ.QnAppCalendar.ViewService;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Script.Serialization;

namespace PQ.QnAppCalendar
{
    public class AjaxHandler : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string userName= HttpContext.Current?.User?.Identity?.Name;
            if (string.IsNullOrEmpty(userName))
                userName = "admin";

            int? currentUnitId = null;

            if (!string.IsNullOrEmpty(userName))
            {
                var qnomy = new QNomyDataService();
                currentUnitId = qnomy.GetUserUnit(userName);
            }
            
            var query = new QueryStringParams(context.Request.Params);

            var dataService = new SchedulerDataService();
            var response = WrapResponse(() =>
            {
                object data = null;

                switch (query.Action)
                {
                    case QueryStringParams.GET_UNITS:
                        data = dataService.GetUnits(currentUnitId);
                        break;
                    case QueryStringParams.GET_CUSTOMIZEDATA:
                        data = dataService.GetCustomizeData(currentUnitId);
                        break;
                    case QueryStringParams.SAVE_CUSTOMIZEDATA:
                        string objJsonCustomize = GetData(context.Request);
                        var dataObjCustomize = JsonConvert.DeserializeObject<CustomizeData>(objJsonCustomize);
                        data = dataService.SaveCustomizeData(dataObjCustomize);
                        break;
                    case QueryStringParams.GET_APPOINTMENTS:
                        string filterData = GetData(context.Request);
                        DateFromTo filter = JsonConvert.DeserializeObject<DateFromTo>(filterData);
                        data = dataService.GetSchedulerEvents(filter.From, filter.To, currentUnitId);
                        break;
                    case QueryStringParams.SAVE_APPOINTMENT:
                        string objJson = GetData(context.Request);
                        var dataObj = JsonConvert.DeserializeObject<SchedulerEvent>(objJson);
                        data = dataService.SaveAppointment(dataObj);
                        break;
                    default:
                        throw new InvalidOperationException($"Action {query.Action} not supported");
                }

                return data;
            });

            ResponseSetData(context.Response, response);
        }

        private void ResponseSetData(HttpResponse response, ResponseWrapper data)
        {
            JsonSerializerSettings jsonSerializerSettings = GetJsonSettings();
            var serializedJson = JsonConvert.SerializeObject(data, jsonSerializerSettings);
            response.ContentType = "text/json";
            response.Write(serializedJson);
        }

        protected ResponseWrapper WrapResponse<T>(Func<T> reponseBuilder)
        {
            var stopwatch = new Stopwatch();
            stopwatch.Start();

            var wrapper = new ResponseWrapper<T>();

            try
            {
                wrapper.Data = reponseBuilder();
                wrapper.IsSuccess = true;
            }
            catch (Exception ex)
            {
                wrapper.Error = new ResponseWrapperError(ex);
                wrapper.IsSuccess = false;

                //Logger.Error("WrapResponse", ex);
            }

            stopwatch.Stop();
            wrapper.ProcessingTime = stopwatch.Elapsed;

            return wrapper;
        }

        private string GetData(HttpRequest request)
        {
            var jsonString = string.Empty;
            request.InputStream.Position = 0;
            using (var inputStream = new StreamReader(request.InputStream))
            {
                jsonString = inputStream.ReadToEnd();
            }

            return jsonString;
        }

        private static JsonSerializerSettings GetJsonSettings()
        {
            var jsonSerializerSettings = new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver(),
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            };
            var converter = new IsoDateTimeConverter() { DateTimeFormat = "yyyy-MM-dd HH:mm" };
            jsonSerializerSettings.Converters.Add(converter);
            return jsonSerializerSettings;
        }

        private void ResponseSetError(HttpResponse response, Exception error)
        {
            
            response.ClearHeaders();
            response.ClearContent();
            response.Status = "503 ServiceUnavailable";
            response.StatusCode = 503;
            response.StatusDescription = error.Message;
            response.Flush();
        }

        public bool IsReusable
        {
            get
            {
                return true;
            }
        }
    }
}
