﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using PQ.QnAppCalendar.Utils;
using QFlow.Library;
using PQ.QnAppCalendar.Dto;

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

        internal int? GetUserUnit(string userName)
        {
            var sql = @"select TOP 1 CurrentUnitId from qf.Users where UserName= @UserName";
            int? result = null;
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
                            result = Converter.ToInt32(sqlDataReader["CurrentUnitId"]);
                        }
                    }
                }
            }

            return result;

        }

        public List<CalendarStage> GetClendarStages()
        {
            var sql = @"select Id, Name, SortOrder, StageType from pq.CalendarStage order by SortOrder";
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
                            item.StageType = (CalendarStageType) Converter.ToInt32(sqlDataReader["SortOrder"]);
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
            var sql = @"select app.AppointmentId, app.AppointmentDate, app.AppointmentDuration,s.ServiceId, s.ServiceName, appType.AppointmentTypeName, customer.FirstName, customer.LastName
FROM qf.AppointmentAll app WITH (NOLOCK) 
		JOIN qf.ProcessAll process WITH (NOLOCK) ON app.ProcessId = process.ProcessId -- AND process.ProcessStatus = 0
		JOIN qf.CaseAll c WITH (NOLOCK) ON process.CaseId = c.CaseId		
		JOIN qf.Service s WITH (NOLOCK) ON app.ServiceId = s.ServiceId
        LEFT JOIN qf.AppointmentType appType  WITH (NOLOCK) on appType.AppointmentTypeId = app.AppointmentTypeId
        LEFT JOIN qf.Customer   customer WITH (NOLOCK) on customer.PersonalId = process.EntityId
WHERE (@fromDate IS NULL OR app.AppointmentDate >= @fromDate) 
AND (@toDate IS NULL OR app.AppointmentDate<=@toDate)
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
                                    CustomerLastName = Converter.ToString(sqlDataReader["LastName"])
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
    }
}
