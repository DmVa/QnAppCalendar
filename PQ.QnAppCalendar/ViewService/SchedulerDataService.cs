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
            var calendarStages = dataService.GetClendarStages();
            var customizeData = GetCustomizeData(unitId);
            var statusMapping = GetMappingCalendarStageTypeToEntityStatus();

            foreach (var app in appointments)
            {
                app.CalendarStageType = statusMapping[app.CurrentEntityStatus];
                app.UnitId = GetStageByServiceId(app.ServiceId, app.CalendarStageType, calendarStages, customizeData);
                SchedulerEvent se = ToScheduleEvent(app);
                result.Add(se);
            }
            return result;
        }

        public int GetStageByServiceId(int serviceId, CalendarStageType stageType, List<CalendarStage> calendarStages, CustomizeData customizeData)
        {
            int inServiceStageId = GetInServiceStageByServiceId(serviceId, customizeData);
            if (inServiceStageId == -1)
                return -1;
            if (stageType == CalendarStageType.InService)
                return inServiceStageId;

            int result = -1;

            foreach (var stage in calendarStages)
            {
                if (stage.StageType == stageType)
                {
                    result = stage.Id;
                    break;
                }
            }
            return result;
        }

        /// <summary>
        /// Returns id of stage for "InService" calendar stage type,  returns -1 if not one valid type is found.
        /// </summary>
        /// <param name="serviceId"></param>
        /// <param name="customizeData"></param>
        /// <returns></returns>
        public int GetInServiceStageByServiceId(int serviceId, CustomizeData customizeData)
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
            result.CustomerName = $"{app.CustomerFirstName} {app.CustomerLastName}";
            result.Text = $"{app.CustomerFirstName} {app.CustomerLastName} - {app.ServiceName}";
            result.Start_date = app.AppointmentDate;
            result.End_date = app.AppointmentDate.AddMinutes(app.AppointmentDuration);
            result.AppointmentId = app.AppointmentId;
            result.ServiceId = app.ServiceId;
            result.CalendarStageType = app.CalendarStageType;
            result.Unitid = app.UnitId;
            result.ProcessId = app.ProcessId;
            return result;
        }

        internal  string UpdateEventServiceName(string text, string serviceName)
        {
            return $"{ text ?? ""}  - {serviceName ?? ""}";
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


            foreach (var stage in calendarStages)
            {
                CalendarStageWithStatuses item = new CalendarStageWithStatuses() { Id = stage.Id, Name = stage.Name, StageType = stage.StageType, SortOrder = stage.SortOrder };
                item.Statuses = new List<StageStatus>();
                result.Stages.Add(item);
            }

            foreach (var service in services)
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


        internal SchedulerEvent AppointmentChanged(int currentUserId,int? currentUnitId, int previousStageId,  SchedulerEvent theEvent)
        {
            var dataService = new QNomyDataService();
            
            int newUnitId = theEvent.Unitid;// unit id is a stageType.
            CustomizeData customizeData = GetCustomizeData(currentUnitId);
            // qnomy
            var calendarStages = dataService.GetClendarStages();
            var allCalendarStageServices = dataService.GetClendarStageServices();
            var prevCalendarStageType = GetStageTypeById(previousStageId, calendarStages);
            var nextCalendarStageType = GetStageTypeById(theEvent.Unitid, calendarStages);
            int previousServiceId = theEvent.ServiceId;
           

            int delegateId = 0;
            // calendar stage type - is old stageType.
            switch (nextCalendarStageType)
            {
                case CalendarStageType.Completed:
                    ProcessPromoteResults processPromoteResults = Process.Promote(theEvent.ProcessId, currentUserId, delegateId, Process.ProcessPromoteAction.Complete, false);
                    break;
                case CalendarStageType.Expected:
                    throw new NotSupportedException("Cannot back to expected status");
                case CalendarStageType.InService:
                    
                    var servicesInStage = GetServiceInStage(theEvent.Unitid, allCalendarStageServices);

                    if (servicesInStage.Count == 0)
                        throw new DataException("Cannot find service for this stage");


                    if (prevCalendarStageType != CalendarStageType.InService)
                    {
                        if (!servicesInStage.Contains(theEvent.ServiceId))
                        {
                            throw new DataException("This stage does not valid for appointment");
                        }

                        UserCallResults callResult = AppUser.Call(currentUserId, delegateId, theEvent.ProcessId, theEvent.ServiceId, false, Process.ProcessPromoteAction.Auto, false);
                        var callValidStatuses = new List<UserCallResults.CallStatus>();
                        callValidStatuses.Add(UserCallResults.CallStatus.Success);

                        //callValidStatuses.Add(UserCallResults.CallStatus.LimitReached);

                        if (!callValidStatuses.Contains(callResult.Status))
                        {
                            if (callResult.Status == UserCallResults.CallStatus.LimitReached)
                            {
                                throw new DataException("You are serving the maximum number of cases allowed by the system.");
                            }
                            throw new DataException(callResult.Status.ToString());
                        }
                        theEvent.ServiceId = callResult.ServiceId;
                    }
                    else
                    {
                        List<RouteInfo> routes = dataService.GetRouts(theEvent.ServiceId);

                        List<RouteInfo> routesToStage = new List<RouteInfo>();
                        foreach (var rout in routes)
                        {
                            if (servicesInStage.Contains(rout.TargetServiceId))
                            {
                                routesToStage.Add(rout);
                            }
                        }


                        if (routesToStage.Count == 0)
                            throw new DataException("Route to this stage does not exists.");

                        if (routesToStage.Count > 1)
                            throw new DataException("It's multiple routes to stage.");
                        RouteInfo route = routesToStage[0];

                        // Route operation.
                        ProcessRouteResults routeResult = Process.Route(theEvent.ProcessId, currentUserId, delegateId, route.RouteId, route.TargetServiceId, 0, 0, "", false, 0);
                        if (routeResult.Status != ProcessRouteResults.ProcessRouteResultsStatus.Success)
                        {
                            throw new DataException(routeResult.Status.ToString());
                        }
                        theEvent.ServiceId = routeResult.NewServiceId;
                    }
                  
                    break;
                case CalendarStageType.None:
                    throw new InvalidOperationException("Invalid stage is not defined");
                case CalendarStageType.Waiting:
                    if (prevCalendarStageType == CalendarStageType.Expected)
                    {
                        ProcessEnqueueAppointmentResults enqueResult = Process.EnqueueAppointment(theEvent.ProcessId, forceEarly: true, forceLate: true);
                        var enqueValidStatuses = new List<ProcessEnqueueAppointmentResults.ProcessEnqueueAppointmentResultsStatus>();
                        enqueValidStatuses.Add(ProcessEnqueueAppointmentResults.ProcessEnqueueAppointmentResultsStatus.Success);
                        enqueValidStatuses.Add(ProcessEnqueueAppointmentResults.ProcessEnqueueAppointmentResultsStatus.Late);
                        if (!enqueValidStatuses.Contains(enqueResult.Status))
                        {
                            throw DataException.GetDataException(enqueResult.Status);
                        }
                        break;
                    }

                    if (prevCalendarStageType == CalendarStageType.WaitingCustomerAction)
                    {
                        ProcessStopWaitingForCustomerActionResults stopWaitResult= Process.StopWaitingForCustomerAction(theEvent.ProcessId, currentUserId, delegateId);
                      
                        break;
                    }
                    if (prevCalendarStageType == CalendarStageType.Waiting)
                    {
                        break;
                    }
                    throw new DataException("This stage accesible only from Expected or Waiting stage");
                case CalendarStageType.WaitingCustomerAction:
                    ProcessWaitForCustomerActionResults waitResult = Process.WaitForCustomerAction(theEvent.ProcessId, currentUserId, 0);
                    break;
                default:
                    throw new InvalidOperationException("Stage is not supported");
            }

            var statusMapping = GetMappingCalendarStageTypeToEntityStatus();
            var qnomyApp = Appointment.Get(theEvent.AppointmentId);
            theEvent.CalendarStageType = statusMapping[qnomyApp.CurrentEntityStatus];
            theEvent.Unitid = GetStageByServiceId(theEvent.ServiceId, theEvent.CalendarStageType, calendarStages, customizeData);
            theEvent.Text = UpdateEventServiceName(theEvent.CustomerName, qnomyApp.ServiceName);
            
            return theEvent;
        }
        // do not use it, this method reschedules time
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



        private List<int> GetServiceInStage(int unitid, List<CalendarStageService> calendarStageServices)
        {
            List<int> result = new List<int>();
            foreach (var stageService in calendarStageServices)
            {
                if (stageService.CalendarStageId == unitid)
                {
                    result.Add(stageService.ServiceId);
                }
            }

            return result;
        }

        private CalendarStageType GetStageTypeById(int unitid, List<CalendarStage> calendarStages)
        {
            var calendarStage = calendarStages.Find(x => x.Id == unitid);
            if (calendarStage == null)
                return CalendarStageType.None;
            return (CalendarStageType)calendarStage.StageType;
        }
    }
}