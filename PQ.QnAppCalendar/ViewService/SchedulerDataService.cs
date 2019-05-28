using PQ.QnAppCalendar;
using PQ.QnAppCalendar.DataService;
using PQ.QnAppCalendar.Dto;
using QFlow.Library;

using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;

namespace PQ.QnAppCalendar.ViewService
{
    public class SchedulerDataService
    {
        public GetAppointmentsData GetAppointmentsData(int unitId)
        {
            var result = new GetAppointmentsData();
            var dt = DateTime.Now.Date;
            result.CurrentDateStr = dt.ToString("MMMM dd, yyyy", new CultureInfo("en-US"));
            result.SchedulerEvents = GetSchedulerEvents(dt, dt, unitId);
            return result;
        }

        public List<SchedulerEvent> GetSchedulerEvents(DateTime? from, DateTime? to, int unitId)
        {
            var result = new List<SchedulerEvent>();
            var now = DateTime.Now;
            var dataService = new QNomyDataService();
            var appointments = dataService.GetAppointments(from, to);
            
            CustomizeData customizeData = GetCustomizeData(unitId);
            var calendarStages = dataService.GetClendarStages(customizeData.ConfigId);
            var statusMapping = GetMappingCalendarStageTypeToEntityStatus();

            foreach (var app in appointments)
            {
                app.CalendarStageType = statusMapping[app.CurrentEntityStatus];
                app.StageId = GetStageByServiceId(app.ServiceId, app.CalendarStageType, calendarStages, customizeData);
                if (app.StageId == -1)
                    continue;
                SchedulerEvent se = ToScheduleEvent(app);
                result.Add(se);
            }
            return result;
        }

        public int GetStageByServiceId(int serviceId, CalendarStageType stageType, List<DataService.CalendarStage> calendarStages, CustomizeData customizeData)
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
                foreach (var stageService in stage.Services)
                {
                    if (stageService.ServiceId == serviceId)
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


        private Dictionary<EntityType.EntityStatus, CalendarStageType> GetMappingCalendarStageTypeToEntityStatus()
        {
            var result = new Dictionary<EntityType.EntityStatus, CalendarStageType>();
            result.Add(EntityType.EntityStatus.Expected, CalendarStageType.Expected);
            result.Add(EntityType.EntityStatus.Frozen, CalendarStageType.Expected);
            result.Add(EntityType.EntityStatus.Suspended, CalendarStageType.Expected);
            result.Add(EntityType.EntityStatus.Waiting, CalendarStageType.Waiting);
            result.Add(EntityType.EntityStatus.Abandoned, CalendarStageType.Completed);
            result.Add(EntityType.EntityStatus.InService, CalendarStageType.InService);
            result.Add(EntityType.EntityStatus.OnHold, CalendarStageType.Expected);
            result.Add(EntityType.EntityStatus.Completed, CalendarStageType.Completed);
            result.Add(EntityType.EntityStatus.Reception, CalendarStageType.Waiting);
            result.Add(EntityType.EntityStatus.Pending, CalendarStageType.Expected);
            result.Add(EntityType.EntityStatus.WaitingWithRules, CalendarStageType.Waiting);
            result.Add(EntityType.EntityStatus.WaitForCustomerAction, CalendarStageType.WaitingCustomerAction);
            result.Add(EntityType.EntityStatus.Canceled, CalendarStageType.Completed);
            result.Add(EntityType.EntityStatus.Aborted, CalendarStageType.Completed);
            result.Add(EntityType.EntityStatus.NoShow, CalendarStageType.Completed);
            result.Add(EntityType.EntityStatus.WaitingOnCustomer, CalendarStageType.Waiting);
            result.Add(EntityType.EntityStatus.WaitedAndAbsent, CalendarStageType.Waiting);
            result.Add(EntityType.EntityStatus.Absent, CalendarStageType.Expected);
            result.Add(EntityType.EntityStatus.WaitedAndTransferred, CalendarStageType.Completed);
            result.Add(EntityType.EntityStatus.ExpectedAndCanceled, CalendarStageType.Completed);
            result.Add(EntityType.EntityStatus.NoShowAndCompleted, CalendarStageType.Completed);
            result.Add(EntityType.EntityStatus.WaitedAndReExpected, CalendarStageType.Completed);
            result.Add(EntityType.EntityStatus.WaitedAndAborted, CalendarStageType.Completed);
            result.Add(EntityType.EntityStatus.ServedAndAborted, CalendarStageType.Completed);
            result.Add(EntityType.EntityStatus.PendingAndAborted, CalendarStageType.Completed);
            result.Add(EntityType.EntityStatus.HeldAndAborted, CalendarStageType.Completed);
            result.Add(EntityType.EntityStatus.ExpectedAndAborted, CalendarStageType.Completed);
            result.Add(EntityType.EntityStatus.SuspendedAndAborted, CalendarStageType.Completed);
            result.Add(EntityType.EntityStatus.Documented, CalendarStageType.Completed);
            result.Add(EntityType.EntityStatus.WrappedUp, CalendarStageType.Completed);
            result.Add(EntityType.EntityStatus.SupportingServiceStarted, CalendarStageType.InService);
            result.Add(EntityType.EntityStatus.SupportingServiceUndone, CalendarStageType.InService);
            result.Add(EntityType.EntityStatus.Unknown, CalendarStageType.Expected);

            return result;
        }


        private SchedulerEvent ToScheduleEvent(AppointmentInfo app)
        {
            var result = new SchedulerEvent();
            result.CustomerName = $"{app.CustomerFirstName} {app.CustomerLastName}";
            result.ServiceName = $"{app.ServiceName}";
            result.Start_date = app.AppointmentDate;
            result.End_date = app.AppointmentDate.AddMinutes(app.AppointmentDuration);
            result.AppointmentId = app.AppointmentId;
            result.ServiceId = app.ServiceId;
            result.StageType = app.CalendarStageType;
            result.StageId = app.StageId;
            result.ProcessId = app.ProcessId;
            return result;
        }

        internal List<StageInfo> GetStages(int rootUnitId)
        {
            var dataService = new QNomyDataService();
            var configId = dataService.GetConfigId(rootUnitId);
            List<CalendarStage> calendarStages = dataService.GetClendarStages(configId);
            

            var result = new List<StageInfo>();
            foreach (var stage in calendarStages)
            {
                result.Add(new StageInfo { Key = stage.Id, Label = stage.Name });
            }


            return result;
        }
        internal bool SaveCustomizeData(CustomizeData data)
        {
            if (data.UnitId <= 0)
                throw new ArgumentException("unit is not defined");

            int sortOrder = 0;
            var stageIds = new List<int>();
            var dataService = new QNomyDataService();
            
            if (data.ConfigId <= 0)
            {
                data.ConfigId = dataService.InsertConfigId(data.UnitId);
            }

            dataService.DeleteCalendarStageServices(data.ConfigId);
            var dataNotShownStage = dataService.GetClendarStageByType(data.ConfigId, CalendarStageType.None);
            if (dataNotShownStage == null)
            {
                dataNotShownStage = new CalendarStage() { Name = "None", StageType = CalendarStageType.None, CalendarStageConfigId = data.ConfigId };
                dataNotShownStage.Id = dataService.InserCalendarStage(dataNotShownStage);
            }

            stageIds.Add(dataNotShownStage.Id);
            dataService.InsertCalendarStageServices(dataNotShownStage.Id, data.NotShownServices);

            foreach (var stage in data.Stages)
            {
                sortOrder++;
                stage.SortOrder = sortOrder;
                dataService.UpdateOrInsertStage(data.ConfigId, stage);
                stageIds.Add(stage.Id);
            }


            dataService.DeleteCalendarStagesExcept(data.ConfigId, stageIds);

            return true;
        }

        internal CustomizeData GetCustomizeData(int currentUnitId)
        {
            var result = new CustomizeData();
            var dataService = new QNomyDataService();
            result.UnitId = currentUnitId;
            result.ConfigId = dataService.GetConfigId(currentUnitId);
            result.NotShownServices = new List<CustomizeStageService>();
            result.Stages = new List<CustomizeCalendarStage>();
            List<CalendarStage> calendarStages = dataService.GetClendarStages(result.ConfigId);

            var services = dataService.GetServicesForUnit(currentUnitId);
            var stageServices = dataService.GetClendarStageServices(currentUnitId);


            foreach (var stage in calendarStages)
            {
                if (stage.StageType == CalendarStageType.None)
                    continue;

                var calendarStage = new CustomizeCalendarStage { Id = stage.Id, Name = stage.Name, StageType = stage.StageType, SortOrder = stage.SortOrder, IsServiceDefault = stage.IsServiceDefault, CalendarStageConfigId = stage.CalendarStageConfigId };
                calendarStage.Services = new List<CustomizeStageService>();
                result.Stages.Add(calendarStage);
            }

            CustomizeCalendarStage defaultInServiceStageForNotMappedServices = result.Stages.Find(x => x.IsServiceDefault); //can be null;

            foreach (var service in services)
            {
                CustomizeCalendarStage stage = null;
                CalendarStageService stageForService = stageServices.Find(x => x.ServiceId == service.Id);
                if (stageForService == null)
                {
                    stage = defaultInServiceStageForNotMappedServices;
                }
                else
                {
                    stage = result.Stages.Find(x => x.Id == stageForService.CalendarStageId);
                }

                if (stage != null && stage.StageType == CalendarStageType.None)
                {
                    stage = null;
                }

                if (stage == null)
                {
                    result.NotShownServices.Add(new CustomizeStageService() { ServiceId = service.Id, Name = service.Name, CalendarStageId = -1 });
                }
                else
                {
                    stage.Services.Add(new CustomizeStageService() { ServiceId = service.Id, Name = service.Name, CalendarStageId = stage.Id });
                }
            }

            return result;
        }


        internal AppointmentChangedResult AppointmentChanged(int currentUserId,int currentUnitId, int previousStageId, int nextStageId,  SchedulerEvent theEvent, int? routeId)
        {
            AppointmentChangedResult result = new AppointmentChangedResult();
            var dataService = new QNomyDataService();
            
          
            CustomizeData customizeData = GetCustomizeData(currentUnitId);
            // qnomy
            var calendarStages = customizeData.Stages.ToList<CalendarStage>();

            //var allCalendarStageServices = customizeData.GetClendarStageServices();
            var prevCalendarStageType = GetStageTypeById(previousStageId, calendarStages);
            var nextCalendarStageType = GetStageTypeById(nextStageId, calendarStages);
            int previousServiceId = theEvent.ServiceId;
            RouteResultData routeResult = null;

            int delegateId = 0;
          
            if ((nextCalendarStageType == CalendarStageType.InService) || (prevCalendarStageType != nextCalendarStageType))
            {
                // calendar stage type - is old stageType.
                if (prevCalendarStageType == CalendarStageType.Completed)
                {
                    throw new DataException("Already Completed, cannot change");
                }

                switch (nextCalendarStageType)
                {
                    case CalendarStageType.Completed:
                        ProcessPromoteResults processPromoteResults = Process.Promote(theEvent.ProcessId, currentUserId, delegateId, Process.ProcessPromoteAction.Complete, false);
                        break;
                    case CalendarStageType.Expected:
                        throw new NotSupportedException("Cannot back to expected status");
                    case CalendarStageType.InService:
                        var nextStage = customizeData.Stages.Find(x => x.Id == nextStageId);
                        if (nextStage == null)
                            throw new DataException("stage is not valid");
                        var servicesInStage = GetServicesIds(nextStage.Services);

                        if (servicesInStage.Count == 0)
                            throw new DataException("Cannot find any service for this stage");

                        if (prevCalendarStageType != CalendarStageType.InService)
                        {
                            
                            if (servicesInStage.Contains(theEvent.ServiceId))
                            {
                                CallUser(currentUserId, theEvent, delegateId);
                            }
                            else
                            {
                                routeResult= RouteUser(currentUserId, theEvent, dataService, delegateId, servicesInStage, true, routeId);
                            }
                        }
                        else
                        {
                            routeResult = RouteUser(currentUserId, theEvent, dataService, delegateId, servicesInStage, true, routeId);
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
                            ProcessStopWaitingForCustomerActionResults stopWaitResult = Process.StopWaitingForCustomerAction(theEvent.ProcessId, currentUserId, delegateId);

                            break;
                        }
                        if (prevCalendarStageType == CalendarStageType.Waiting)
                        {
                            break;
                        }
                        if (prevCalendarStageType == CalendarStageType.InService)
                        {
                            ProcessRequeueInServiceResults requeResult = Process.RequeueInService(theEvent.ProcessId, currentUnitId, delegateId);
                            break;
                        }
                        throw new DataException("Waiting stage does not accessible from this stage");
                    case CalendarStageType.WaitingCustomerAction:
                        ProcessWaitForCustomerActionResults waitResult = Process.WaitForCustomerAction(theEvent.ProcessId, currentUserId, 0);
                        break;
                    default:
                        throw new InvalidOperationException("Stage is not supported");
                }
            }

            if (routeResult != null && !routeResult.IsRouted)
            {
                result.RouteData = routeResult;
                return result;
            }

            
            AdjustStageType(theEvent, calendarStages, customizeData);

            result.EventData = theEvent;
            return result;
        }

        private List<int> GetServicesIds(List<CustomizeStageService> services)
        {
            var result = new List<int>();
            services.ForEach(x => result.Add(x.ServiceId));
            return result;
        }

        private void AdjustStageType(SchedulerEvent theEvent, List<CalendarStage> calendarStages, CustomizeData customizeData)
        {
            var qnomyApp = Appointment.Get(theEvent.AppointmentId);
            var statusMapping = GetMappingCalendarStageTypeToEntityStatus();
            theEvent.StageType = statusMapping[qnomyApp.CurrentEntityStatus];
            theEvent.StageId = GetStageByServiceId(theEvent.ServiceId, theEvent.StageType, calendarStages, customizeData);
            var currentService = Service.Get(theEvent.ServiceId);
            theEvent.ServiceName = currentService.Name;
        }


        internal AppointmentChangedResult AppointmentCancel(int userId, int unitId, SchedulerEvent schedulerEvent)
        {
            var dataService = new QNomyDataService();
            AppointmentChangedResult result = new AppointmentChangedResult();
            int processId = schedulerEvent.ProcessId;
            ProcessCancelCaseResults cancelResult = Process.CancelCase(processId, userId, 0);
            

            if (cancelResult.CurrentProcessId > 0)
            {
                schedulerEvent.ProcessId = cancelResult.CurrentProcessId;


                CustomizeData customizeData = GetCustomizeData(unitId);

                var calendarStages = dataService.GetClendarStages(customizeData.ConfigId);
                AdjustStageType(schedulerEvent, calendarStages, customizeData);

                result.EventData = schedulerEvent;

            }

            List<AppUser.UserStatus> okStatus = new List<AppUser.UserStatus>() { AppUser.UserStatus.Idle, AppUser.UserStatus.Unknown, AppUser.UserStatus.SignedOut };
            if (!okStatus.Contains(cancelResult.UserStatus))
            {
                throw new DataException($"Not Canceled, user status {cancelResult.UserStatus.ToString()}");
            }
            return result;

        }

        private RouteResultData RouteUser(int currentUserId, SchedulerEvent theEvent, QNomyDataService dataService, int delegateId, List<int> servicesInStage, bool callAfterRoute, int? routeId)
        {
            RouteResultData result = new RouteResultData();
            List<RouteListItem> availableRoutes = Service.GetAvailableRoutes(theEvent.ServiceId);
            int? transferedFromServiceId = dataService.GetTranseredFromServiceId(theEvent.ProcessId);

            var routesToStage = new List<RouteListItem>();
            var returnToSender = new List<RouteListItem>();
            bool skipAddRoute = false;
            foreach (var rout in availableRoutes)
            {
                skipAddRoute = routeId.HasValue && routeId.Value > 0 && routeId.Value != rout.Id;
                if (!skipAddRoute && transferedFromServiceId.HasValue && rout.TargetType == Route.RouteTargetType.ReturnToSender && servicesInStage.Contains(transferedFromServiceId.Value))
                {
                        routesToStage.Add(rout);
                        continue;
                }

                if (!skipAddRoute && servicesInStage.Contains(rout.TargetServiceId))
                {
                    routesToStage.Add(rout);
                    continue;
                }
            }


            if (routesToStage.Count == 0)
                throw new DataException("Route to this stage does not exists.");

            if (routesToStage.Count > 1)
            {
                result.Selection = new SelectOptionData();
                result.Selection.Options = new List<KeyValuePair<int, string>>();
                foreach (var item in routesToStage)
                {
                    result.Selection.Options.Add(new KeyValuePair<int, string>(item.Id, item.Name));
                }

                return result;
            }

            var route = routesToStage[0];

            // Route operation.
            ProcessRouteResults routeResult = Process.Route(theEvent.ProcessId, currentUserId, delegateId, route.Id, route.TargetServiceId, 0, 0, "", false, 0);
            if (routeResult.Status != ProcessRouteResults.ProcessRouteResultsStatus.Success)
            {
                throw new DataException(routeResult.Status.ToString());
            }

            if (routeResult.NewServiceId > 0)
                theEvent.ServiceId = routeResult.NewServiceId;

            if (routeResult.NewProcessId > 0)
                theEvent.ProcessId = routeResult.NewProcessId;

            if (callAfterRoute && routeResult.NewEntityStatus == (int)EntityType.EntityStatus.Waiting)
            {
                try
                {
                    CallUser(currentUserId, theEvent, delegateId);
                }
                catch (DataException)
                {

                }
            }
            result.IsRouted = true;
            return result;
        }

        private static void CallUser(int currentUserId, SchedulerEvent theEvent, int delegateId)
        {
            UserCallResults callResult = AppUser.Call(currentUserId, delegateId, theEvent.ProcessId, theEvent.ServiceId, false, Process.ProcessPromoteAction.Auto, false);
            var callValidStatuses = new List<UserCallResults.CallStatus>();
            callValidStatuses.Add(UserCallResults.CallStatus.Success);

            if (!callValidStatuses.Contains(callResult.Status))
            {
                if (callResult.Status == UserCallResults.CallStatus.LimitReached)
                {
                    throw new DataException("You are serving the maximum number of cases allowed by the system.");
                }
                throw new DataException(callResult.Status.ToString());
            }

            if (callResult.ServiceId > 0)
                theEvent.ServiceId = callResult.ServiceId;
        }

        private string GetStageName(CalendarStageService calendarStageService, List<DataService.CalendarStage> calendarStages)
        {
            string result = "undefined";
            foreach(var stage in calendarStages)
            {
                if (stage.Id == calendarStageService.CalendarStageId)
                {
                    result = stage.Name;
                }
            }
            return result;
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

            app.StageId = appointment.StageId;
            app.CalendarStageType = appointment.StageType;

            SchedulerEvent se = ToScheduleEvent(app);
            return se;
        }




        private List<CalendarStageService> GetValidStagesForService(int serviceId, List<CalendarStageService> calendarStageServices)
        {
            List<CalendarStageService> result = new List<CalendarStageService>();
            foreach (var stageService in calendarStageServices)
            {
                if (stageService.ServiceId == serviceId)
                {
                    result.Add(stageService);
                }
            }

            return result;
        }
        
        private CalendarStageType GetStageTypeById(int stageid, List<CalendarStage> calendarStages)
        {
            var calendarStage = calendarStages.Find(x => x.Id == stageid);
            if (calendarStage == null)
                return CalendarStageType.None;
            return (CalendarStageType)calendarStage.StageType;
        }
    }
}