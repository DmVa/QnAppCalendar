using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using PQ.QnAppCalendar.DataService;
using PQ.QnAppCalendar.ViewModel;
using PQ.QnAppCalendar.ViewService;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
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
            var query = new QueryStringParams(context.Request.Params);
            var dataService = new SchedulerDataService();
            var response = WrapResponse(() =>
            {
                object data = null;

                switch (query.Action)
                {
                    case QueryStringParams.GET_UNITS:
                        data = dataService.GetUnits();
                        break;
                    case QueryStringParams.GET_APPOINTMENTS:
                        data = dataService.GetSchedulerEvents();
                        break;
                    case QueryStringParams.SAVE_APPOINTMENT:
                        string objJson = GetData(context.Request);
                        JsonSerializerSettings jsonSerializerSettings = GetJsonSettings();
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
