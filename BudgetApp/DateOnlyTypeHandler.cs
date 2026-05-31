using System.Data;
using Dapper;
using NpgsqlTypes;
using Npgsql;

public class DateOnlyTypeHandler : SqlMapper.TypeHandler<DateTime>
{
    public override void SetValue(IDbDataParameter parameter, DateTime value)
    {
        if (parameter is NpgsqlParameter npgsqlParameter)
        {
            npgsqlParameter.NpgsqlDbType = NpgsqlDbType.Date;
        }
        parameter.Value = value.Date;
    }

    public override DateTime Parse(object value)
    {
        return DateTime.SpecifyKind(Convert.ToDateTime(value), DateTimeKind.Utc);
    }
}