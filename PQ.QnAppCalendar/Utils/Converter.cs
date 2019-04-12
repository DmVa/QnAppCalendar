using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PQ.QnAppCalendar.Utils
{
    public static class Converter
    {
        public static DateTime ToDateTime(int year, int month, int day)
        {
            DateTime ds;
            if (!DateTime.TryParse(string.Format("{2:00}/{1:00}/{0}", year, day, month), CultureInfo.CreateSpecificCulture("en-US"), DateTimeStyles.None, out ds))
                ds = DateTime.Now;

            return ds;
        }

        public static DateTime ToDateTime<T>(T value)
        {
            if (value == null)
                return DateTime.MinValue;

            DateTime dt;
            return DateTime.TryParse(value.ToString(), out dt) ? dt : DateTime.MinValue;
        }

        public static DateTime ToDateTime<T>(T value, string format)
        {
            if (value == null)
                return DateTime.MinValue;

            string val = value.ToString();
            if (string.IsNullOrEmpty(val))
                return DateTime.MinValue;

            try
            {
                return DateTime.ParseExact(val, format, CultureInfo.InvariantCulture);
            }
            catch
            {
                return DateTime.MinValue;
            }
        }

        public static bool ToBoolean<T>(T value)
        {
            if (value == null || value is DBNull)
                return false;

            string val = ToString(value).ToLower();
            if (val == "no" || string.IsNullOrWhiteSpace(val))
                return false;

            if (val == "yes")
                return true;

            if (val.IndexOf("false", StringComparison.Ordinal) > -1 || val.IndexOf("true", StringComparison.Ordinal) > -1)
            {
                try
                {
                    return System.Convert.ToBoolean(value);
                }
                catch
                {
                    return false;
                }
            }

            try
            {
                return System.Convert.ToBoolean(ToInt32(value));
            }
            catch
            {
                return false;
            }
        }

        public static bool ToBoolean<T>(T value, bool defaultValue)
        {
            return ToBooleanNullable(value) ?? defaultValue;
        }

        public static bool? ToBooleanNullable<T>(T value)
        {
            if (value == null || value is DBNull || ((value is string) && string.IsNullOrEmpty(Convert.ToString(value))))
                return null;

            string val = ToString(value).ToLower();

            if (val == "no" || val == "yes")
                return val == "yes";

            if (val.IndexOf("false", StringComparison.Ordinal) > -1 || val.IndexOf("true", StringComparison.Ordinal) > -1)
            {
                try
                {
                    return System.Convert.ToBoolean(value);
                }
                catch
                {
                    return null;
                }
            }

            try
            {
                return System.Convert.ToBoolean(ToInt32(value));
            }
            catch
            {
                return null;
            }
        }

        public static string ToStringNullable<T>(T value)
        {
            return value == null
                ? null
                : System.Convert.ToString(value);
        }

        public static string ToString<T>(T value)
        {
            return value == null
                ? string.Empty
                : System.Convert.ToString(value);
        }

        public static int ToInt32<T>(T value)
        {
            return ToInt32(value, false);
        }

        public static int ToInt32<T>(T value, bool isZero)
        {
            if (value == null)
                return isZero ? 0 : -1;

            string val = value.ToString();
            if (string.IsNullOrEmpty(val))
                return isZero ? 0 : -1;

            int dt;
            if (int.TryParse(val, out dt))
                return dt;

            try
            {
                return System.Convert.ToInt32(value);
            }
            catch
            {
                return isZero ? 0 : -1;
            }
        }

        public static int? ToInt32Nullable<T>(T value)
        {
            if (value == null)
                return null;

            string val = value.ToString();
            if (string.IsNullOrEmpty(val))
                return null;

            int dt;
            if (int.TryParse(val, out dt))
                return dt;

            try
            {
                return System.Convert.ToInt32(value);
            }
            catch
            {
                return null;
            }
        }

        public static double? ToDoubleNullable<T>(T value)
        {
            if (value == null)
                return null;

            string val = value.ToString();

            double dt;
            if (double.TryParse(val, out dt))
                return dt;

            try
            {
                return System.Convert.ToDouble(value);
            }
            catch
            {
                return double.TryParse(val.Replace(".", ","), out dt) ? (double?)dt : null;
            }
        }

        public static double ToDouble<T>(T value)
        {
            return ToDouble(value, false);
        }

        public static double ToDouble<T>(T value, bool isZero)
        {
            if (value == null)
                return isZero ? 0 : -1;

            string val = value.ToString();

            double dt;
            if (double.TryParse(val, out dt))
                return dt;

            try
            {
                return System.Convert.ToDouble(value);
            }
            catch
            {
                return double.TryParse(val.Replace(".", ","), out dt) ? dt : (isZero ? 0 : -1);
            }
        }

        public static int? ExtractInt32Nullable<T>(T value)
        {
            if (value == null)
                return null;

            string val = value.ToString();

            int startIndex = val.LastIndexOf('-') + 1;
            int lenght = val.Length - startIndex;
            val = val.Substring(startIndex, lenght);

            int dt;
            if (int.TryParse(val, out dt))
                return dt;

            try
            {
                return System.Convert.ToInt32(val);
            }
            catch
            {
                return null;
            }
        }

        public static float ToFloat32<T>(T value, bool isZero)
        {
            if (value == null)
                return isZero ? 0 : -1;

            string val = value.ToString();

            float dt;
            if (float.TryParse(val, out dt))
                return dt;

            try
            {
                return Convert.ToSingle(value);
            }
            catch
            {
                return float.TryParse(val.Replace(".", ","), out dt) ? dt : 0;
            }
        }

        public static float? ToFloatNullable<T>(T value)
        {
            if (value == null)
                return null;

            string val = value.ToString();

            float dt;
            if (float.TryParse(val, out dt))
                return dt;

            try
            {
                return Convert.ToSingle(value);
            }
            catch
            {
                return float.TryParse(val.Replace(".", ","), out dt) ? (float?)dt : null;
            }
        }

        public static decimal ToDecimal<T>(T value)
        {
            if (value == null)
                return 0m;

            string val = value.ToString();
            if (string.IsNullOrEmpty(val))
                return 0m;

            decimal d;
            if (decimal.TryParse(val, out d))
                return d;

            if (decimal.TryParse(val, NumberStyles.Currency | NumberStyles.AllowCurrencySymbol
                                        | NumberStyles.Number | NumberStyles.AllowDecimalPoint
                                        , CultureInfo.CurrentCulture.NumberFormat, out d))
                return d;

            return decimal.TryParse(val.Replace(".", ","), out d) ? d : 0m;
        }

        /// <summary>
        /// Convert value to decimal with round 
        /// </summary>
        public static decimal ToDecimal<T>(T value, int decimals)
        {
            return decimal.Round(ToDecimal(value), decimals);
        }

        public static string GetCorrectPercentString<T>(T value)
        {
            decimal? result = ToPercentNullable(value);

            return result == null
                ? ToString(value)
                : result.Value.ToString("G29");
        }

        public static decimal ToPercent<T>(T value)
        {
            decimal? result = ToPercentNullable(value);
            return result ?? 0;
        }

        public static decimal? ToPercentNullable<T>(T value)
        {
            if (value == null)
                return null;

            var numFormat = CultureInfo.CurrentCulture.NumberFormat;

            NumberFormatInfo nfi = new NumberFormatInfo()
            {
                CurrencyDecimalDigits = numFormat.PercentDecimalDigits,
                CurrencyDecimalSeparator = numFormat.PercentDecimalSeparator,
                CurrencyGroupSeparator = numFormat.PercentGroupSeparator,
                CurrencyGroupSizes = numFormat.PercentGroupSizes,
                CurrencyNegativePattern = numFormat.PercentNegativePattern,
                CurrencyPositivePattern = numFormat.PercentPositivePattern,
                CurrencySymbol = numFormat.PercentSymbol
            };

            decimal result;
            if (decimal.TryParse(value.ToString(), NumberStyles.Currency, nfi, out result))
                return result;
            else
                return null;
        }

        //public static decimal? ChangePersentStringToDecimal(string value)
        //{
        //    if (string.IsNullOrWhiteSpace(value))
        //        return null;

        //    if (value.Trim().EndsWith("%"))
        //        value = value.Trim().TrimEnd('%');

        //    decimal? valDec = ToDecimalNullable(value);
        //    if (valDec == null)
        //        return null;

        //    return valDec / 100;
        //}

        //public static decimal? GetCorrectPercentValue(string value)
        //{
        //    if (string.IsNullOrWhiteSpace(value))
        //        return null;

        //    if (value.Trim().EndsWith("%"))
        //    {
        //        value = value.Trim().TrimEnd('%');
        //        return ToDecimalNullable(value) / 100;
        //    }
        //    else
        //    {
        //        return ToDecimalNullable(value);
        //    }
        //}

        public static decimal? ToDecimalNullableTrim<T>(T value)
        {
            return ToDecimalNullable(value);
        }

        public static decimal? ToDecimalNullable<T>(T value)
        {
            if (value == null)
                return null;

            string val = value.ToString();
            if (string.IsNullOrEmpty(val))
                return null;

            decimal d;
            if (decimal.TryParse(val, out d))
                return d;

            if (decimal.TryParse(val, NumberStyles.Currency | NumberStyles.AllowCurrencySymbol
                                        | NumberStyles.Number | NumberStyles.AllowDecimalPoint
                                        , CultureInfo.CurrentCulture.NumberFormat, out d))
                return d;

            return decimal.TryParse(val.Replace(".", ","), out d) ? (decimal?)d : null;
        }

        public static short? ToInt16Nullable<T>(T value)
        {
            if (value == null)
                return null;

            short dt;
            if (short.TryParse(value.ToString(), out dt))
                return dt;
            else
                return null;
        }

        public static short ToInt16<T>(T value)
        {
            return ToInt16(value, false);
        }

        public static short ToInt16<T>(T value, bool isZero)
        {
            if (value == null)
                return (short)(isZero ? 0 : -1);

            short dt;
            if (short.TryParse(value.ToString(), out dt))
                return dt;
            else
                return (short)(isZero ? 0 : -1);
        }

        public static byte? ToByteNullable<T>(T value)
        {
            if (value == null)
                return null;

            byte dt;
            if (byte.TryParse(value.ToString(), out dt))
                return dt;
            else
                return null;
        }

        public static byte ToByte<T>(T value)
        {
            if (value == null)
                return 0;

            byte dt;
            if (byte.TryParse(value.ToString(), out dt))
                return dt;
            else
                return 0;
        }

        public static Guid? ToGuidNullable<T>(T value)
        {
            if (value == null)
                return null;

            string val = value.ToString();
            if (string.IsNullOrEmpty(val))
                return null;

            try
            {
                return new Guid(val);
            }
            catch
            {
                return null;
            }
        }

        public static Guid ToGuid<T>(T value)
        {
            if (value == null)
                return Guid.Empty;

            string val = value.ToString();
            if (string.IsNullOrEmpty(val))
                return Guid.Empty;

            try
            {
                return new Guid(val);
            }
            catch
            {
                return Guid.Empty;
            }
        }

        public static DateTime? ToDateTimeNullable<T>(T value)
        {
            if (value == null)
                return null;

            DateTime dt;
            if (DateTime.TryParse(value.ToString(), out dt))
                return dt;
            else
                return null;
        }

        public static DateTime? ToDateTimeNullable(string dateString)
        {
            if (string.IsNullOrEmpty(dateString) || dateString.Length != 6)
                return ToDateTimeNullable((object)dateString);

            return ToDateTimeNullable(ToInt32(dateString.Substring(0, 2)), ToInt32(dateString.Substring(2, 2)), (ToInt32Nullable(dateString.Substring(4, 2)) ?? -3000) + 2000);
        }


        public static DateTime? ToDateTimeNullable(int year, int month, int day)
        {
            DateTime ds;
            if (!DateTime.TryParse(string.Format("{2:00}/{1:00}/{0}", year, day, month), CultureInfo.CreateSpecificCulture("en-US"), DateTimeStyles.None, out ds))
                return null;

            return ds;
        }

        public static DateTime? ToDateTimeNullable<T>(T value, string format)
        {
            if (value == null)
                return null;

            string val = value.ToString();
            if (string.IsNullOrEmpty(val))
                return null;

            try
            {
                return DateTime.ParseExact(val, format, CultureInfo.InvariantCulture);
            }
            catch
            {
                return null;
            }
        }

        public static string ToFormattedPercentString<T>(T value)
        {
            decimal? val = ToDecimalNullable(value);
            if (!val.HasValue)
                return string.Empty;
            // if three numbers after dot 
            if (val.Value * 1000 - ((int)(val.Value * 100) * 10) > 1)
                return val.Value.ToString("#0.000");
            // if four numbers after dot 
            if (val.Value * 10000 - ((int)(val.Value * 1000) * 10) > 1)
                return val.Value.ToString("#0.0000");

            return val.Value.ToString("#0.00");
        }

        public static string ToFormattedPercentThreePlacesString<T>(T value)
        {
            decimal? val = ToDecimalNullable(value);
            return val?.ToString("#0.000") ?? string.Empty;
        }

        public static string ToFormattedDecimalString<T>(T value)
        {
            decimal? tmp = ToDecimalNullable(value);
            return tmp?.ToString("##,##0.##") ?? string.Empty;
        }

        public static string ToFormattedDecimalStringPlaces<T>(T value)
        {
            decimal? tmp = ToDecimalNullable(value);
            return tmp?.ToString("##,##0.00") ?? string.Empty;
        }

        public static string ToNameOfMonthString<T>(T value)
        {
            DateTime? dt = ToDateTimeNullable(value);
            return dt?.ToString("MMMM", CultureInfo.InvariantCulture) ?? string.Empty;
        }

        public static string ToDateTimeToString<T>(T value)
        {
            DateTime? dt = ToDateTimeNullable(value);
            return dt?.ToString("M/d/yyyy", CultureInfo.InvariantCulture) ?? string.Empty;
        }

        public static string ToDateTimeLongToString<T>(T value)
        {
            DateTime? dt = ToDateTimeNullable(value);
            return dt?.ToString("MMMM d, yyyy", CultureInfo.InvariantCulture) ?? string.Empty;
        }

        public static string ToDateTimeToStringFormat<T>(T value)
        {
            DateTime? dt = ToDateTimeNullable(value);
            return dt?.ToString("dd.MM.yyyy HH:mm") ?? string.Empty;
        }

        public static Int64 ToInt64<T>(T value)
        {
            return ToInt64(value, false);
        }

        public static Int64 ToInt64<T>(T value, bool isZero)
        {
            if (value == null)
                return isZero ? 0L : -1L;

            string val = value.ToString();
            if (string.IsNullOrEmpty(val))
                return isZero ? 0L : -1L;

            long dt;
            if (long.TryParse(val, out dt))
                return dt;

            try
            {
                return System.Convert.ToInt64(value);
            }
            catch
            {
                return isZero ? 0L : -1L;
            }
        }

        public static Int64? ToInt64Nullable<T>(T value)
        {
            if (value == null)
                return null;

            string val = value.ToString();
            if (string.IsNullOrEmpty(val))
                return null;

            long dt;
            if (long.TryParse(val, out dt))
                return dt;

            try
            {
                return System.Convert.ToInt64(value);
            }
            catch
            {
                return null;
            }
        }

        public static double RoundToNearest(double amount, double roundTo)
        {
            double excessAmount = amount % roundTo;

            if (excessAmount < (roundTo / 2))
            {
                amount -= excessAmount;
            }
            else
            {
                amount += (roundTo - excessAmount);
            }

            return amount;
        }

        public static decimal RoundToNearestDecimal(decimal amount, int digitsToRound)
        {
            return Math.Round(amount, digitsToRound, MidpointRounding.AwayFromZero);
        }

        public static T GetValue<T>(object value)
        {
            if (value == null)
                return default(T);

            Type t = typeof(T);
            t = Nullable.GetUnderlyingType(t) ?? t;

            return (DBNull.Value.Equals(value)) ? default(T) : (T)Convert.ChangeType(value, t);
        }

        public static List<string> ToListFromCommaSeparated(string source)
        {
            if (string.IsNullOrEmpty(source))
                return Enumerable.Empty<string>().ToList();

            var data = source.Split(',')
                .Select(x => x.Trim())
                .ToList();

            return data;
        }

        public static string[] ToArrayFromCommaSeparated(string source)
        {
            if (string.IsNullOrEmpty(source))
                return Enumerable.Empty<string>().ToArray();

            var data = source.Split(',')
                .Select(x => x.Trim())
                .ToArray();

            return data;
        }

        public static string ToCommaSeparated(string[] source)
        {
            if (source == null)
                return null;

            if (source.Length == 0)
                return string.Empty;

            string result = string.Join(",", source);

            return result;
        }

        public static string ToCommaSeparated(List<string> source)
        {
            if (source == null)
                return null;

            if (source.Count == 0)
                return string.Empty;

            string result = string.Join(",", source);

            return result;
        }

        public static string ToCommaSeparated(List<int> source)
        {
            if (source == null)
                return null;

            List<string> stringValues = new List<string>();
            source.ForEach(x => stringValues.Add(x.ToString()));

            return ToCommaSeparated(stringValues);
        }

       
        public static decimal Normalize(this decimal value)
        {
            return value / 1.000000000000000000000000000000000m;
        }

        public static byte[] ToByte(Stream stream)
        {
            byte[] buffer = new byte[16 * 1024];
            using (MemoryStream ms = new MemoryStream())
            {
                int read;
                while ((read = stream.Read(buffer, 0, buffer.Length)) > 0)
                {
                    ms.Write(buffer, 0, read);
                }
                return ms.ToArray();
            }
        }
    }
}
