var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "Cors",
                      policy =>
                      {
                          policy.WithOrigins("https://localhost:5173").AllowAnyHeader()
                                .WithMethods("GET")
                                .WithExposedHeaders("Access-Control-Allow-Origin"); ;
                      });
});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
if (app.Environment.IsDevelopment())
{
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();


app.UseCors("Cors");

app.UseAuthorization();

app.MapControllers();

app.Run();
