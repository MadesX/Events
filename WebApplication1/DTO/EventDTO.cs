namespace WebApplication1.DTO
{
    public class EventDTO
    {
        public string? EventName { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int? MaxRegistrations { get; set; }
        public string? Location { get; set; }
    }
}
