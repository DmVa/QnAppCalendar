using PQ.QnAppCalendar;
using PQ.QnAppCalendar.DataService;
using PQ.QnAppCalendar.Dto;
using QFlow.Library;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PQ.QnAppCalendar.ViewService
{
    public class SchedulerDataService
    {
        public List<SchedulerEvent> GetSchedulerEvents(DateTime? from, DateTime? to)
        {
            var result = new List<SchedulerEvent>();
            var now = DateTime.Now;
            var dataService = new QNomyDataService();
            var appointments = dataService.GetAppointments(from, to);
            
            foreach (var app in appointments)
            {
                SchedulerEvent se = ToScheduleEvent(app);
                result.Add(se);
            }
            return result;
        }

        private SchedulerEvent ToScheduleEvent(AppointmentInfo app)
        {
            return new SchedulerEvent() { Text = GetEventText(app), Start_date = app.AppointmentDate, End_date = app.AppointmentDate.AddMinutes(app.AppointmentDuration), Unitid = 2, AppointmentId = app.AppointmentId };
        }

        internal int? GetUserUnit(string userName)
        {
            throw new NotImplementedException();
        }

        internal List<UnitInfo> GetUnits(int? rootUnitId)
        {
            var dataService = new QNomyDataService();
            
            var calendarStages = dataService.GetClendarStages();
            var result = new List<UnitInfo>();
            foreach (var stage in calendarStages)
            {
                result.Add(new UnitInfo { Key = stage.Id, Label = stage.Name });
            }
            

            return result;
        }

        internal CustomizeData GetCustomizeData(int? currentUnitId)
        {
            var result = new CustomizeData();
            var dataService = new QNomyDataService();
            result.Available = new List<StageStatus>();
            result.Stages = new List<CalendarStageWithStatuses>();
            var calendarStages = dataService.GetClendarStages();
            var services = dataService.GetServicesForUnit(currentUnitId);
            var stageServices = dataService.GetClendarStageServices();
                        

            foreach(var stage in calendarStages)
            {
                CalendarStageWithStatuses item = new CalendarStageWithStatuses() { Id = stage.Id, Name = stage.Name};
                item.Statuses = new List<StageStatus>();
                result.Stages.Add(item);
            }

            foreach(var service in services)
            {
                var stageForService = stageServices.Find(x => x.ServiceId == service.Id);
                if (stageServices == null)
                {
                    result.Available.Add(new StageStatus() { Id = service.Id, Name = service.Name, StageId = -1 });
                }
                else
                {
                    var stage = result.Stages.Find(x => x.Id == stageForService.CalendarStageId);
                    if (stage == null)
                    {
                        result.Available.Add(new StageStatus() { Id = service.Id, Name = service.Name, StageId = -1 }); // should not happen
                    }
                    else
                    {
                        stage.Statuses.Add(new StageStatus() { Id = service.Id, Name = service.Name, StageId = stage.Id });
                    }
                }
            }

            return result;
        }

        internal SchedulerEvent SaveAppointment(SchedulerEvent appointment)
        {
            var dataService = new QNomyDataService();
            var newAppointmentId = dataService.UpdateAppointmentTime(appointment.AppointmentId, appointment.Start_date, appointment.End_date);
            var qnomyApp = Appointment.Get(newAppointmentId);
            var app = new AppointmentInfo();
            app.AppointmentDate = qnomyApp.AppointmentDate;
            app.AppointmentDuration = qnomyApp.AppointmentDuration;
            app.AppointmentId = qnomyApp.Id;
            app.AppointmentTypeName = qnomyApp.AppointmentTypeName;
            
            SchedulerEvent se = ToScheduleEvent(app);
            return se;
        }

        private string GetEventText(AppointmentInfo app)
        {
            return $"{app.CustomerFirstName} {app.CustomerLastName} - {app.ServiceName}";
        }
    }
}