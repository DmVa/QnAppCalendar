using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using PQ.QnAppCalendar.Utils;
using QFlow.Library;
using PQ.QnAppCalendar.Dto;
using static QFlow.Library.EntityType;

namespace PQ.QnAppCalendar.DataService
{
    public class QNomyDataService
    {
        QNomySettings _settings = new QNomySettings();
        private const string EXTREF_ServiceFilterUnitServices = "PQ.Calendar.UnitServices";

        public QNomyDataService()
        {
            
        }
        public int UpdateAppointmentTime(int id, DateTime from, DateTime to)
        {
            var app = Appointment.Get(id);
            app.AppointmentDate = from;
            TimeSpan duration = to - from;
            app.AppointmentDuration = (int)duration.TotalMinutes;
            int userId = 1;//current user loggined in system;

            int newAppointmentId = 0;
            //Reschedule old appointment (create a new appointment with the same details just diffrent date)
            if (app.AppointmentDate.Date < DateTime.Today)
            {
                newAppointmentId= SetAppointment(userId,  app);
            }
            //Reschedule future appointment 
            else
            {
                newAppointmentId = RescheduleAppointment(userId, app);
            }
            return newAppointmentId;
        }

        internal UserInfo GetUserInfo(string userName)
        {

            var sql = @"select TOP 1 UserId, CurrentUnitId from qf.Users where UserName= @UserName";
            UserInfo result = null;
            using (SqlConnection connection = new SqlConnection(_settings.QFlowConnectionString))
            {
                using (SqlCommand sqlCommand = new SqlCommand(sql, connection))
                {
                    sqlCommand.CommandType = CommandType.Text;
                    sqlCommand.Parameters.Add("@UserName", SqlDbType.NVarChar);
                    sqlCommand.Parameters["@UserName"].Value = userName;
                    connection.Open();
                    using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
                    {
                        if (sqlDataReader.Read())
                        {
                            result = new UserInfo();
                            result.UserName = userName;
                            result.UserId = Converter.ToInt32(sqlDataReader["UserId"]);
                            result.UnitId = Converter.ToInt32(sqlDataReader["CurrentUnitId"]);
                        }
                    }
                }
            }

            return result;

        }

        public int InsertCalendarStageService(CalendarStageService calendarStage)
        {

            var sql = $@"INSERT INTO [pq].[CalendarStageService] ([CalendarStageId] ,[ServiceId]) OUTPUT INSERTED.ID    
                    VALUES   (@CalendarStageId, @ServiceId)  ";

            int result = 0;
            using (SqlConnection connection = new SqlConnection(_settings.QFlowConnectionString))
            {
                using (SqlCommand sqlCommand = new SqlCommand(sql, connection))
                {
                    sqlCommand.Parameters.AddWithValue("@CalendarStageId", calendarStage.CalendarStageId);
                    sqlCommand.Parameters.AddWithValue("@ServiceId", calendarStage.ServiceId);

                    sqlCommand.CommandType = CommandType.Text;

                    connection.Open();
                    result = (int) sqlCommand.ExecuteScalar();
                }
            }

            return result;
        }

        public int InserCalendarStage(CalendarStage calendarStage)
        {
            var sql = $@"INSERT INTO [pq].[CalendarStage]      ([SortOrder],[Name],[StageType], [IsServiceDefault],[CalendarStageConfigId]) output INSERTED.ID  
            VALUES (@SortOrder,@Name, @StageType, @IsServiceDefault, @CalendarStageConfigId)";
           
            int result = 0;
            using (SqlConnection connection = new SqlConnection(_settings.QFlowConnectionString))
            {
                using (SqlCommand sqlCommand = new SqlCommand(sql, connection))
                {
                    sqlCommand.Parameters.Add("@SortOrder", SqlDbType.Int);
                    sqlCommand.Parameters["@SortOrder"].Value = calendarStage.SortOrder;

                    sqlCommand.Parameters.Add("@Name", SqlDbType.VarChar);
                    sqlCommand.Parameters["@Name"].Value = calendarStage.Name;

                    sqlCommand.Parameters.Add("@StageType", SqlDbType.Int);
                    sqlCommand.Parameters["@StageType"].Value = (int)calendarStage.StageType;

                    sqlCommand.Parameters.Add("@IsServiceDefault", SqlDbType.Int);
                    sqlCommand.Parameters["@IsServiceDefault"].Value = calendarStage.IsServiceDefault ? 1 :0;

                    sqlCommand.Parameters.Add("@CalendarStageConfigId", SqlDbType.Int);
                    sqlCommand.Parameters["@CalendarStageConfigId"].Value = calendarStage.CalendarStageConfigId;

                    sqlCommand.CommandType = CommandType.Text;

                    connection.Open();
                    result = (int)sqlCommand.ExecuteScalar();
                }
            }

            return result;
        }

        public void UpdateCalendarStage(CalendarStage calendarStage)
        {
            var sql = $@"UPDATE [pq].[CalendarStage] SET [SortOrder] = @SortOrder, [Name] = @Name, [IsServiceDefault] = @IsServiceDefault, CalendarStageConfigId = @CalendarStageConfigId WHERE ID = @Id";
            using (SqlConnection connection = new SqlConnection(_settings.QFlowConnectionString))
            {
                using (SqlCommand sqlCommand = new SqlCommand(sql, connection))
                {
                    sqlCommand.Parameters.Add("@SortOrder", SqlDbType.Int);
                    sqlCommand.Parameters["@SortOrder"].Value = calendarStage.SortOrder;

                    sqlCommand.Parameters.Add("@Name", SqlDbType.VarChar);
                    sqlCommand.Parameters["@Name"].Value = calendarStage.Name;

                    sqlCommand.Parameters.Add("@Id", SqlDbType.Int);
                    sqlCommand.Parameters["@Id"].Value = calendarStage.Id;

                    sqlCommand.Parameters.Add("@IsServiceDefault", SqlDbType.Int);
                    sqlCommand.Parameters["@IsServiceDefault"].Value = calendarStage.IsServiceDefault ? 1 : 0;

                    sqlCommand.Parameters.Add("@CalendarStageConfigId", SqlDbType.Int);
                    sqlCommand.Parameters["@CalendarStageConfigId"].Value = calendarStage.CalendarStageConfigId;

                    sqlCommand.CommandType = CommandType.Text;

                    connection.Open();
                    sqlCommand.ExecuteNonQuery();
                }
            }
        }

        public void DeleteCalendarStageServices(int configId)
        {
            var sql = $@"delete from  pq.CalendarStageService WHERE ID IN  
                (SELECT css.ID FROM pq.CalendarStageService css  
                INNER JOIN pq.CalendarStage  cs ON cs.Id = css.CalendarStageId AND cs.CalendarStageConfigId = {configId})";
            var result = new List<CalendarStage>();
            using (SqlConnection connection = new SqlConnection(_settings.QFlowConnectionString))
            {
                using (SqlCommand sqlCommand = new SqlCommand(sql, connection))
                {
                    sqlCommand.CommandType = CommandType.Text;

                    connection.Open();
                    sqlCommand.ExecuteNonQuery();
                }
            }
        }

        private CalendarStage GetClendarStage(int configId, int id)
        {
            var stages = GetClendarStages(configId, id, null);
            if (stages.Count == 0)
                return null;
            else
                return stages[0];
        }

        public CalendarStage GetClendarStageByType(int configId, CalendarStageType stageType)
        {
            var stages = GetClendarStages(configId, null, stageType);
            if (stages.Count == 0)
                return null;
            else
                return stages[0];
        }

        internal void DeleteCalendarStagesExcept(int configId, List<int> stageIds)
        {
            string deleteClause = $" WHERE CalendarStageConfigId = {configId} ";
            if (stageIds.Count > 0)
            {
                string ids = Converter.ToCommaSeparated(stageIds);
                deleteClause  += $" AND ID NOT IN ({ids})";
            }

            var sql = $"delete from  pq.CalendarStage {deleteClause}";

            var result = new List<CalendarStage>();
            using (SqlConnection connection = new SqlConnection(_settings.QFlowConnectionString))
            {
                using (SqlCommand sqlCommand = new SqlCommand(sql, connection))
                {
                    sqlCommand.CommandType = CommandType.Text;

                    connection.Open();
                    sqlCommand.ExecuteNonQuery();
                }
            }
        }

        internal int GetConfigId(int unitId)
        {
            var sql = @"select TOP 1  Id from pq.[CalendarStageConfig] WHERE UnitId = @UnitId";
            var result = -1;;
            using (SqlConnection connection = new SqlConnection(_settings.QFlowConnectionString))
            {
                using (SqlCommand sqlCommand = new SqlCommand(sql, connection))
                {
                    sqlCommand.CommandType = CommandType.Text;
                    
                    sqlCommand.Parameters.Add("@UnitId", SqlDbType.Int);
                    sqlCommand.Parameters["@UnitId"].Value = unitId;

                    connection.Open();
                    int? resObj = Converter.ToInt32Nullable(sqlCommand.ExecuteScalar());
                    if (resObj.HasValue)
                        result = resObj.Value;
                }
            }
            return result;
        }
        internal int InsertConfigId(int unitId)
        {

            var sql = $@"INSERT INTO [pq].[CalendarStageConfig] ([UnitId]) OUTPUT INSERTED.ID    
                    VALUES   (@UnitId)  ";

            int result = -1;
            using (SqlConnection connection = new SqlConnection(_settings.QFlowConnectionString))
            {
                using (SqlCommand sqlCommand = new SqlCommand(sql, connection))
                {
                    sqlCommand.Parameters.AddWithValue("@UnitId", unitId);

                    sqlCommand.CommandType = CommandType.Text;

                    connection.Open();
                    result = (int)sqlCommand.ExecuteScalar();
                }
            }

            return result;
        }

        public List<CalendarStage> GetClendarStages(int configId)
        {
            if (configId > 0)
                return GetClendarStages(configId, null, null);
            else
                return GetDefaultCalendarStages();
        }

        private List<CalendarStage> GetDefaultCalendarStages()
        {
            List<CalendarStage> result = new List<CalendarStage>();
            int configId = -1;

            result.Add(new CalendarStage()
            {
                Id = -1,
                Name = "None",
                SortOrder = 0,
                StageType = CalendarStageType.None,
                IsServiceDefault = false,
                CalendarStageConfigId = configId
            });

            result.Add(new CalendarStage()
            {
                Id = -2,
                Name = "Expected",
                SortOrder = 1,
                StageType = CalendarStageType.Expected,
                IsServiceDefault = false,
                CalendarStageConfigId = configId
            });

            result.Add(new CalendarStage()
            {
                Id = -3,
                Name = "Waiting",
                SortOrder = 2,
                StageType = CalendarStageType.Waiting,
                IsServiceDefault = false,
                CalendarStageConfigId = configId
            });

            result.Add(new CalendarStage()
            {
                Id = -4,
                Name = "In Service",
                SortOrder = 3,
                StageType = CalendarStageType.InService,
                IsServiceDefault = true,
                CalendarStageConfigId = configId
            });

            result.Add(new CalendarStage()
            {
                Id = -5,
                Name = "Completed",
                SortOrder = 4,
                StageType = CalendarStageType.Completed,
                IsServiceDefault = false,
                CalendarStageConfigId = configId
            });

            result.Add(new CalendarStage()
            {
                Id = -6,
                Name = "Waiting for Customer Action",
                SortOrder = 5,
                StageType = CalendarStageType.WaitingCustomerAction,
                IsServiceDefault = false,
                CalendarStageConfigId = configId
            });
            return result;
        }

        private List<CalendarStage> GetClendarStages(int configId, int? id, CalendarStageType? stageType)
        {
            string whereCalusesql = $" WHERE CalendarStageConfigId = {configId} ";

            var clauses = new List<string>();
            if (id.HasValue)
                clauses.Add($"(ID = {id.Value})");

            if (stageType.HasValue)
                clauses.Add($"(StageType = {(int)stageType.Value})");

            if (clauses.Count > 0)
            {
                whereCalusesql += $" AND {string.Join(" AND ", clauses)}";
            }

            var sql = $"select Id, Name, SortOrder, StageType, IsServiceDefault, CalendarStageConfigId from pq.CalendarStage {whereCalusesql} order by SortOrder";
            var result = new List<CalendarStage>();
            using (SqlConnection connection = new SqlConnection(_settings.QFlowConnectionString))
            {
                using (SqlCommand sqlCommand = new SqlCommand(sql, connection))
                {
                    sqlCommand.CommandType = CommandType.Text;

                    connection.Open();
                    using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
                    {
                        while (sqlDataReader.Read())
                        {
                            var item = new CalendarStage();
                            item.Id = Converter.ToInt32(sqlDataReader["Id"]);
                            item.Name = Converter.ToString(sqlDataReader["Name"]);
                            item.SortOrder = Converter.ToInt32(sqlDataReader["SortOrder"]);
                            item.StageType = (CalendarStageType)Converter.ToInt32(sqlDataReader["StageType"]);
                            item.IsServiceDefault = Converter.ToBoolean(sqlDataReader["IsServiceDefault"]);
                            item.CalendarStageConfigId = Converter.ToInt32(sqlDataReader["CalendarStageConfigId"]);
                            
                            result.Add(item);
                        }
                    }
                }
            }
            return result;
        }


        public List<CalendarStageService> GetClendarStageServices()
        {
            var sql = @"select Id, CalendarStageId, ServiceId from pq.[CalendarStageService]";
            var result = new List<CalendarStageService>();
            using (SqlConnection connection = new SqlConnection(_settings.QFlowConnectionString))
            {
                using (SqlCommand sqlCommand = new SqlCommand(sql, connection))
                {
                    sqlCommand.CommandType = CommandType.Text;

                    connection.Open();
                    using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
                    {
                        while (sqlDataReader.Read())
                        {
                            var item = new CalendarStageService();
                            item.Id = Converter.ToInt32(sqlDataReader["Id"]);
                            item.CalendarStageId = Converter.ToInt32(sqlDataReader["CalendarStageId"]);
                            item.ServiceId = Converter.ToInt32(sqlDataReader["ServiceId"]);
                            result.Add(item);
                        }
                    }
                }
            }
            return result;
        }

        private int RescheduleAppointment(int userId, AppointmentGetResults app)
        {
            ProcessRescheduleAppointmentResults result =  Process.RescheduleAppointment(
               app.ProcessId,
               1,//cancelationReason
               app.ServiceId,
               app.AppointmentDate,
               userId,
               app.AppointmentTypeId,
               TreatmentPlan.PlanCancelationMethod.Undefined,
               app.CaseSubject,
               "",
               app.ExtRef,
               null,
               app.PreventAutoQueue,
               "",
               app.IsWalkIn,
               true,
               false,
               false,
               null,
               0,
               "",
               app.AppointmentDuration,
               null
               );

            return result.AppointmentId;
         
        }

        private int SetAppointment(int userId, AppointmentGetResults app)
        {
            ServiceSetAppointmentResults result =  Service.SetAppointment(app.ServiceId,0, app.AppointmentDate, userId, app.CustomerId, app.AppointmentTypeId,app.CaseSubject,"","", (List<int>)null,
                app.PreventAutoQueue, "");
            return result.AppointmentId;
        
        }

        public List<AppointmentTypeInfo> GetAppointmentTypes()
        {
            var sql = @"select AppointmentTypeId, AppointmentTypeName, ServiceTypeId from qf.AppointmentType where IsActive =1";
            var result = new List<AppointmentTypeInfo>();
            using (SqlConnection connection = new SqlConnection(_settings.QFlowConnectionString))
            {
                using (SqlCommand sqlCommand = new SqlCommand(sql, connection))
                {
                    sqlCommand.CommandType = CommandType.Text;

                    connection.Open();
                    using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
                    {
                        if (sqlDataReader.HasRows)
                        {
                            while (sqlDataReader.Read())
                                result.Add(new AppointmentTypeInfo()
                                {
                                    Id = Converter.ToInt32(sqlDataReader["AppointmentTypeId"]),
                                    Name = Converter.ToString(sqlDataReader["Name"]),
                                    ServiceTypeId = Converter.ToInt32(sqlDataReader["ServiceTypeId"])
                                });
                        }
                    }
                }
            }
            return result;

        }

        internal int? GetTranseredFromServiceId(int processId)
        {
            int? result = null;

            var sql = @"select top 1 TransferredFromServiceId from qf.ProcessAll where processId = @processId";
            using (SqlConnection connection = new SqlConnection(_settings.QFlowConnectionString))
            {
                using (SqlCommand sqlCommand = new SqlCommand(sql, connection))
                {
                    sqlCommand.CommandType = CommandType.Text;
                    sqlCommand.Parameters.Add("@processId", SqlDbType.Int);
                    sqlCommand.Parameters["@processId"].Value = processId;

                    connection.Open();
                    object resObj = sqlCommand.ExecuteScalar();
                    result = Converter.ToInt32Nullable(resObj);
                }
            }
            return result;
        }

        internal void UpdateOrInsertStage(int configId, CustomizeCalendarStage stagedata)
        {
            CalendarStage stage = null;
            if (stagedata.Id > 0)
            {
                stage = GetClendarStage(configId, stagedata.Id);
            }
            
            if (stage == null)
            {
                stage = new CalendarStage()
                {
                    Name = stagedata.Name,
                    SortOrder = stagedata.SortOrder,
                    IsServiceDefault = stagedata.IsServiceDefault,
                    StageType = (CalendarStageType)stagedata.StageType,
                    CalendarStageConfigId = configId

                };
                stage.Id = InserCalendarStage(stage);
            }
            else
            {
                stage.Name = stagedata.Name;
                stage.SortOrder = stagedata.SortOrder;
                stage.IsServiceDefault = stagedata.IsServiceDefault;
                stage.CalendarStageConfigId = configId;
                UpdateCalendarStage(stage);
            }

            stagedata.Id = stage.Id;

            if (stagedata.Services?.Count > 0)
            {
                InsertCalendarStageServices(stage.Id, stagedata.Services);
            }
        }

        public void InsertCalendarStageServices(int stageId, List<CustomizeStageService> services)
        {
            foreach (var stageServiceData in services)
            {
                var stageService = new CalendarStageService() { CalendarStageId = stageId, ServiceId = stageServiceData.ServiceId };
                InsertCalendarStageService(stageService);
            }
        }

        public List<ServiceInfo> GetAllServices()
        {
            var sql = @"select ServiceId, ServiceName from qf.Service where IsActive =1";
            var result = new List<ServiceInfo>();
            using (SqlConnection connection = new SqlConnection(_settings.QFlowConnectionString))
            {
                using (SqlCommand sqlCommand = new SqlCommand(sql, connection))
                {
                    sqlCommand.CommandType = CommandType.Text;

                    connection.Open();
                    using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
                    {
                        if (sqlDataReader.HasRows)
                        {
                            while (sqlDataReader.Read())
                                result.Add(new ServiceInfo()
                                {
                                    Id = Converter.ToInt32(sqlDataReader["ServiceId"]),
                                    Name = Converter.ToString(sqlDataReader["ServiceName"]),
                                });
                        }
                    }
                }
            }
            return result;

        }
        public List<ServiceInfo> GetServicesForUnit(int? unitId)
        {
            if (!unitId.HasValue)
                unitId = 4; // for test reason.
            int filterid = GetServicesFilterIdByUnits();
            var sql = @"select [Order], ServiceId, ServiceName  from qf.ServiceFilterGetServices(@ServiceFilterId, @RootUnitId)";
            var result = new List<ServiceInfo>();
            using (SqlConnection connection = new SqlConnection(_settings.QFlowConnectionString))
            {
                using (SqlCommand sqlCommand = new SqlCommand(sql, connection))
                {
                    sqlCommand.CommandType = CommandType.Text;
                    sqlCommand.Parameters.Add("@ServiceFilterId", SqlDbType.Int);
                    sqlCommand.Parameters["@ServiceFilterId"].Value = filterid;

                    sqlCommand.Parameters.Add("@RootUnitId", SqlDbType.Int);
                    sqlCommand.Parameters["@RootUnitId"].Value = unitId;
                    connection.Open();
                    using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
                    {
                        if (sqlDataReader.HasRows)
                        {
                            while (sqlDataReader.Read())
                                result.Add(new ServiceInfo()
                                {
                                    Id = Converter.ToInt32(sqlDataReader["ServiceId"]),
                                    Name = Converter.ToString(sqlDataReader["ServiceName"]),
                                    Order = Converter.ToInt32(sqlDataReader["Order"])
                                });
                        }
                    }
                }
            }
            return result;

        }

        public List<AppointmentInfo> GetAppointments(DateTime? from, DateTime? to)
        {
            var sql = @"select app.AppointmentId, app.AppointmentDate, app.AppointmentDuration,
    s.ServiceId, s.ServiceName, appType.AppointmentTypeName, customer.FirstName, customer.LastName, 
process.ProcessId, process.CurrentEntityStatus
FROM qf.AppointmentAll app WITH (NOLOCK) 
		JOIN qf.ProcessAll process WITH (NOLOCK) ON app.ProcessId = process.ProcessId
		JOIN qf.CaseAll c WITH (NOLOCK) ON process.CaseId = c.CaseId		
		JOIN qf.Service s WITH (NOLOCK) ON process.CurrentServiceId = s.ServiceId
        LEFT JOIN qf.AppointmentType appType  WITH (NOLOCK) on appType.AppointmentTypeId = app.AppointmentTypeId
        LEFT JOIN qf.Customer   customer WITH (NOLOCK) on customer.PersonalId = process.EntityId
WHERE (process.CurrentEntityStatus not in (15,16,17)) AND
(@fromDate IS NULL OR app.AppointmentDate >= @fromDate) AND (@toDate IS NULL OR app.AppointmentDate<=@toDate)
";
            List<AppointmentInfo> serviceList = new List<AppointmentInfo>();
            using (SqlConnection connection = new SqlConnection(_settings.QFlowConnectionString))
            {
                using (SqlCommand sqlCommand = new SqlCommand(sql, connection))
                {
                    sqlCommand.CommandType = CommandType.Text;
                    sqlCommand.Parameters.Add("@fromDate", SqlDbType.DateTime);
                    sqlCommand.Parameters["@fromDate"].Value =  DBNull.Value;
                    if (from.HasValue)
                    {
                        sqlCommand.Parameters["@fromDate"].Value = from.Value.Date;
                    }
                    else
                        sqlCommand.Parameters["@fromDate"].Value = DBNull.Value;

                    sqlCommand.Parameters.Add("@toDate", SqlDbType.DateTime);
                    if (to.HasValue)
                        sqlCommand.Parameters["@toDate"].Value = to.Value.Date.AddDays(1).AddSeconds(-1);
                    else
                        sqlCommand.Parameters["@toDate"].Value = DBNull.Value;

                    connection.Open();
                    using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
                    {
                        if (sqlDataReader.HasRows)
                        {
                            while (sqlDataReader.Read())
                                serviceList.Add(new AppointmentInfo()
                                {
                                    AppointmentId = Converter.ToInt32(sqlDataReader["AppointmentId"]),
                                    AppointmentDate = Converter.ToDateTime(sqlDataReader["AppointmentDate"]),
                                    AppointmentDuration = Converter.ToInt32(sqlDataReader["AppointmentDuration"]),
                                    ServiceId = Converter.ToInt32(sqlDataReader["ServiceId"]),
                                    ServiceName = Converter.ToString(sqlDataReader["ServiceName"]),
                                    AppointmentTypeName = Converter.ToString(sqlDataReader["AppointmentTypeName"]),
                                    CustomerFirstName = Converter.ToString(sqlDataReader["FirstName"]),
                                    CustomerLastName = Converter.ToString(sqlDataReader["LastName"]),
                                    CurrentEntityStatus = (EntityStatus) Converter.ToInt32(sqlDataReader["CurrentEntityStatus"]),
                                    ProcessId = Converter.ToInt32(sqlDataReader["ProcessId"]),
                                });
                        }
                    }
                }
            }
            return serviceList;
        }

        public void AddServicesFilterIfNotExstis()
        {
            var sql = $@"IF NOT EXISTS (SELECT * FROM qf.ServiceFilter WHERE ExtRef='{EXTREF_ServiceFilterUnitServices}')
BEGIN
INSERT INTO [qf].[ServiceFilter]
           ([FilterName]
           ,[Description]
           ,[ExtRef]
           ,[IsActive]
           ,[RootUnit]
           ,[IsRecursive]
           ,[MaxDepth]
           ,[UnitTypeId]
           ,[FilterServiceTypes]
           ,[FilterServiceNames]
           ,[FilterServiceAttributes]
           ,[ExcludeNonWorkingHours]
           ,[ExcludeNoAvailableAgent]
           ,[ExcludeEmptyQueue]
           ,[OrderByUnit]
           ,[OrderByServiceType]
           ,[OrderByServiceName]
           ,[QueueManagement])
     VALUES
           ('Scheduler services'
           ,NULL
           ,'{EXTREF_ServiceFilterUnitServices}'
           ,1
           ,NULL
           ,0
           ,0
           ,NULL
           ,0
           ,0
           ,0
           ,0
           ,0
           ,0
           ,0
           ,0
           ,1
           ,2)
END
";
            using (SqlConnection connection = new SqlConnection(_settings.QFlowConnectionString))
            {
                using (SqlCommand sqlCommand = new SqlCommand(sql, connection))
                {
                    sqlCommand.CommandType = CommandType.Text;
                    connection.Open();
                    int affected = sqlCommand.ExecuteNonQuery();
                }
            }
        }
        private int GetServicesFilterIdByUnits()
        {
            int result = 0;
            var sql = $@"SELECT TOP 1 ServiceFilterId FROM qf.ServiceFilter WHERE ExtRef='{EXTREF_ServiceFilterUnitServices}'";

            using (SqlConnection connection = new SqlConnection(_settings.QFlowConnectionString))
            {
                using (SqlCommand sqlCommand = new SqlCommand(sql, connection))
                {
                    sqlCommand.CommandType = CommandType.Text;
                    connection.Open();
                    result = Converter.ToInt32(sqlCommand.ExecuteScalar());
                    if (result == 0)
                    {
                        AddServicesFilterIfNotExstis();
                        result = Converter.ToInt32(sqlCommand.ExecuteScalar());
                    }
                }
            }
            return result;
        }
        #region "services flow"
        public ProcessEnqueueAppointmentResults EnqueueAppointment(
      string apiSessionId,
      int processId,
      int receptionPointId,
      string languageCode,
      string subject,
      string notes,
      string extRef,
      List<int> classificationIds,
      bool forcePAQ,
      bool forceEarly,
      bool forceLate,
      bool autoPrintTicket)
        {
            return null;
            //UserState userState = Authorization.IsAuthorized(apiSessionId, "", nameof(EnqueueAppointment));
            //try
            //{
            //    return Process.EnqueueAppointment(processId, userState.UserId, receptionPointId, languageCode, subject, notes, extRef, classificationIds, forcePAQ, forceEarly, forceLate, autoPrintTicket, Process.ProcessAgentAssignmentType.Default, 0, false, (ProcessNeeds)null, 0, 0, 0, 0, 0, (Dictionary<int, int>)null, (Dictionary<int, string>)null);
            //}
            //catch (QFlowException ex)
            //{
            //    ProjectData.SetProjectError((Exception)ex);
            //    QFlowException qflowException = ex;
            //    throw new FaultException<QFlowAPIApplicationException>(new QFlowAPIApplicationException(qflowException.ErrorNumber), qflowException.Message);
            //}
        }
        #endregion
    }
}
