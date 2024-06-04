namespace MapServer.ApiModels.Requests;

public record AddNewCompanyRequest
{
    // Company fields
    public required string CompanyName { get; init; }
    public required string StreetAddress { get; init; }
    public required string StreetNumber { get; init; }
    public required DateTime EstablishmentDate { get; init; }
    // Rest location fields
    public required double Longitude { get; init; }
    public required double Latitude { get; init; }
    public required string City { get; init; }
    public string? PostalCode { get; init; }
    public string? Suburb { get; init; }
}
