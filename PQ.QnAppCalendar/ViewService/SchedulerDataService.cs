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
        public List<SchedulerEvent> GetSchedulerEvents(DateTime? from, DateTime? to, int? unitId)
        {
            var result = new List<SchedulerEvent>();
            var now = DateTime.Now;
            var dataService = new QNomyDataService();
            var appointments = dataService.GetAppointments(from, to);
            var customizeData = GetCustomizeData(unitId);
            var statusMapping = GetMappingCalendarStageTypeToEntityStatus();
            
            foreach (var app in appointments)
            {
                app.CalendarStageType = statusMapping[app.CurrentEntityStatus];
                app.UnitId = GetStageByServiceId(app.ServiceId, app.CalendarStageType, customizeData);
                SchedulerEvent se = ToScheduleEvent(app);
                result.Add(se);
            }
            return result;
        }

        public int GetStageByServiceId(int serviceId, CalendarStageType stageType, CustomizeData customizeData)
        {
            int result = -1;
            foreach (var stage in customizeData.Stages)
            {
                foreach (var status in stage.Statuses)
                {
                    if (status.Id == serviceId)
                    {
                        result = stage.Id;
                        break;
                    }
                }
                if (result >= 0)
                {
                    break;
                }
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

        private SchedulerEvent ToScheduleEvent(AppointmentInfo app)
        {
            var result = new SchedulerEvent();
            result.Text = $"{app.CustomerFirstName} {app.CustomerLastName} - {app.ServiceName}"; 
            result.Start_date = app.AppointmentDate;
            result.End_date = app.AppointmentDate.AddMinutes(app.AppointmentDuration);
            result.AppointmentId = app.AppointmentId;
            result.ServiceId = app.ServiceId;
            result.CalendarStageType = app.CalendarStageType;
            result.Unitid = app.UnitId;
            return result;
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
        internal bool SaveCustomizeData(CustomizeData data)
        {
            int sortOrder = 0;
            var stageIds = new List<int>();
            var dataService = new QNomyDataService();
            dataService.DeleteCalendarStageServices();
            foreach (var stage in data.Stages)
            {
                sortOrder++;
                stage.SortOrder = sortOrder;
                dataService.UpdateOrInsertStage(stage);
                stageIds.Add(stage.Id);
            }

            dataService.DeleteCalendarStagesExcept(stageIds);

            return true;
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
                CalendarStageWithStatuses item = new CalendarStageWithStatuses() { Id = stage.Id, Name = stage.Name, StageType = stage.StageType, SortOrder = stage.SortOrder};
                item.Statuses = new List<StageStatus>();
                result.Stages.Add(item);
            }

            foreach(var service in services)
            {
                CalendarStageService stageForService = stageServices.Find(x => x.ServiceId == service.Id);
                CalendarStageWithStatuses stage = null;
                if (stageForService != null)
                {
                    stage = result.Stages.Find(x => x.Id == stageForService.CalendarStageId);
                    
                }
                if (stageForService == null || stage == null)
                {
                    result.Available.Add(new StageStatus() { Id = service.Id, Name = service.Name, StageId = -1 });
                }
                else
                {
                    stage.Statuses.Add(new StageStatus() { Id = service.Id, Name = service.Name, StageId = stage.Id });
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

            app.UnitId = appointment.Unitid;
            app.CalendarStageType = appointment.CalendarStageType;

            SchedulerEvent se = ToScheduleEvent(app);
            return se;
        }

    }
}