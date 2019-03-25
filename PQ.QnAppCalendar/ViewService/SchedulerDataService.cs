using PQ.QnAppCalendar;
using PQ.QnAppCalendar.DataService;
using PQ.QnAppCalendar.ViewModel;
using PQ.QnAppCalendar.ViewService.Data;
using PQ.QnAppCalendar.ViewService.Dto;
using QFlow.Library;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PQ.QnAppCalendar.ViewService
{
    public class SchedulerDataService
    {
        public List<SchedulerEvent> GetSchedulerEvents()
        {
            var result = new List<SchedulerEvent>();
            var now = DateTime.Now;
            var dataService = new QNomyDataService();
            var appointments = dataService.GetAppointments(null, null);
            
            foreach (var app in appointments)
            {
                SchedulerEvent se = ToScheduleEvent(app);
                result.Add(se);
            }
            return result;
        }

        private SchedulerEvent ToScheduleEvent(AppointmentInfo app)
        {
            return new SchedulerEvent() { Text = GetEventText(app), Start_date = app.AppointmentDate, End_date = app.AppointmentDate.AddMinutes(app.AppointmentDuration), Unitid = "1", AppointmnetId = app.AppointmentId };
        }

        internal List<UnitInfo> GetUnits()
        {
            var result = new List<UnitInfo>();
            result.Add(new UnitInfo { Key = "1", Label = "Wait" });
            result.Add(new UnitInfo { Key = "2", Label = "Reception" });
            result.Add(new UnitInfo { Key = "3", Label = "In Service" });
            result.Add(new UnitInfo { Key = "4", Label = "Done" });

            return result;
        }

        internal SchedulerEvent SaveAppointment(SchedulerEvent appointment)
        {
            var dataService = new QNomyDataService();
            var newAppointmentId = dataService.UpdateAppointmentTime(appointment.AppointmnetId, appointment.Start_date, appointment.End_date);
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
            return $"{app.ServiceName} - {app.AppointmentTypeName} {Environment.NewLine} {app.CustomerFirstName} {app.CustomerLastName}";
        }
    }
}