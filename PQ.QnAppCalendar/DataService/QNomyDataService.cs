using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using PQ.QnAppCalendar.ViewService.Data;
using PQ.QnAppCalendar.Utils;
using QFlow.Library;
namespace PQ.QnAppCalendar.DataService
{
    public class QNomyDataService
    {
        QNomySettings _settings = new QNomySettings();
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

        public List<AppointmentInfo> GetAppointments(DateTime? from, DateTime? to)
        {
            var sql = @"select app.AppointmentId, app.AppointmentDate, app.AppointmentDuration, s.ServiceName, appType.AppointmentTypeName, customer.FirstName, customer.LastName
FROM qf.AppointmentAll app WITH (NOLOCK) 
		JOIN qf.ProcessAll process WITH (NOLOCK) ON app.ProcessId = process.ProcessId AND process.ProcessStatus = 0
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

        private DateTime ToDateTime(object dateObj)
        {
            return Convert.ToDateTime(dateObj); 
        }
    }
}
