using PQ.QnAppCalendar;
using PQ.QnAppCalendar.DataService;
using PQ.QnAppCalendar.Dto;
using QFlow.Library;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static QFlow.Library.EntityType;

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
            var statusMapping = GetMappingEntityStatusToCalendarStatus();

            foreach (var app in appointments)
            {
                SchedulerEvent se = ToScheduleEvent(app, statusMapping);
                result.Add(se);
            }
            return result;
        }

        private Dictionary<EntityStatus, int> GetMappingEntityStatusToCalendarStatus()
        {
            var dataService = new QNomyDataService();

            var calendarStages = dataService.GetClendarStages();
            var mapping = GetMappingCalendarStageTypeToEntityStatus();
            var statusMapping = GetMappingEntityStatusToCalendarStatus(mapping, calendarStages);
            return statusMapping;
        }

            private Dictionary<EntityStatus, int> GetMappingEntityStatusToCalendarStatus(Dictionary<EntityStatus, CalendarStageType> mapping, List<CalendarStage> stages)
        {
            
            var result = new Dictionary<EntityStatus, int>();
            if (stages.Count == 0)
                return result;
            var defaultStage = stages[0];
            foreach(var map in mapping)
            {
                var stage = stages.Find(x => x.StageType == map.Value);
                if (stage != null)
                    result.Add(map.Key, stage.Id);
                else
                    result.Add(map.Key, defaultStage.Id);
            }

            return result;
        }

        private Dictionary<EntityStatus, CalendarStageType> GetMappingCalendarStageTypeToEntityStatus()
        {
            var result = new Dictionary<EntityStatus, CalendarStageType>();
            result.Add(EntityStatus.Expected, CalendarStageType.Expected);
            result.Add(EntityStatus.Frozen, CalendarStageType.Expected);
            result.Add(EntityStatus.Suspended, CalendarStageType.Expected);
            result.Add(EntityStatus.Waiting, CalendarStageType.Waiting);
            result.Add(EntityStatus.Abandoned, CalendarStageType.Completed);
            result.Add(EntityStatus.InService, CalendarStageType.InService);
            result.Add(EntityStatus.OnHold, CalendarStageType.Expected);
            result.Add(EntityStatus.Completed, CalendarStageType.Completed);
            result.Add(EntityStatus.Reception, CalendarStageType.Waiting);
            result.Add(EntityStatus.Pending, CalendarStageType.Expected);
            result.Add(EntityStatus.WaitingWithRules, CalendarStageType.Waiting);
            result.Add(EntityStatus.WaitForCustomerAction, CalendarStageType.WaitingCustomerAction);
            result.Add(EntityStatus.Canceled, CalendarStageType.Completed);
            result.Add(EntityStatus.Aborted, CalendarStageType.Completed);
            result.Add(EntityStatus.NoShow, CalendarStageType.Completed);
            result.Add(EntityStatus.WaitingOnCustomer, CalendarStageType.Waiting);
            result.Add(EntityStatus.WaitedAndAbsent, CalendarStageType.Waiting);
            result.Add(EntityStatus.Absent, CalendarStageType.Expected);
            result.Add(EntityStatus.WaitedAndTransferred, CalendarStageType.Completed);
            result.Add(EntityStatus.ExpectedAndCanceled, CalendarStageType.Completed);
            result.Add(EntityStatus.NoShowAndCompleted, CalendarStageType.Completed);
            result.Add(EntityStatus.WaitedAndReExpected, CalendarStageType.Completed);
            result.Add(EntityStatus.WaitedAndAborted, CalendarStageType.Completed);
            result.Add(EntityStatus.ServedAndAborted, CalendarStageType.Completed);
            result.Add(EntityStatus.PendingAndAborted, CalendarStageType.Completed);
            result.Add(EntityStatus.HeldAndAborted, CalendarStageType.Completed);
            result.Add(EntityStatus.ExpectedAndAborted, CalendarStageType.Completed);
            result.Add(EntityStatus.SuspendedAndAborted, CalendarStageType.Completed);
            result.Add(EntityStatus.Documented, CalendarStageType.Completed);
            result.Add(EntityStatus.WrappedUp, CalendarStageType.Completed);
            result.Add(EntityStatus.SupportingServiceStarted, CalendarStageType.InService);
            result.Add(EntityStatus.SupportingServiceUndone, CalendarStageType.InService);
            result.Add(EntityStatus.Unknown, CalendarStageType.Expected);
            
            return result;
        }

        private SchedulerEvent ToScheduleEvent(AppointmentInfo app, Dictionary<EntityStatus, int> mapping)
        {
            var result = new SchedulerEvent();
            result.Text = $"{app.CustomerFirstName} {app.CustomerLastName} - {app.ServiceName}"; 
            result.Start_date = app.AppointmentDate;
            result.End_date = app.AppointmentDate.AddMinutes(app.AppointmentDuration);
            result.Unitid = mapping[app.CurrentEntityStatus];
            result.AppointmentId = app.AppointmentId;
            return result;
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
            app.CurrentEntityStatus = qnomyApp.CurrentEntityStatus;

            var statusMapping = GetMappingEntityStatusToCalendarStatus();

            SchedulerEvent se = ToScheduleEvent(app, statusMapping);
            return se;
        }

    }
}