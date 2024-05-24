using AutoMapper;
using MapServer.Data.DTOs;
using MapServer.Store.Models;

namespace MapServer.Data.Mappers;

public class LocationMapper : Profile
{
    public LocationMapper()
    {
        CreateMap<Location, LocationDto>();
        CreateMap<LocationDto, Location>();
    }
}
