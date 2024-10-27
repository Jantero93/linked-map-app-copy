using MapServer.Data.Models;
using Microsoft.AspNetCore.Identity;

namespace MapServer.OpenIddict;

public class ApplicationUser : IdentityUser<Guid>
{
    public ICollection<WorkExperience> WorkExperiences { get; set; } = [];
}
