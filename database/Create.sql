CREATE DATABASE WAREHOUSE;

USE WAREHOUSE;
DROP TABLE RequirementLogs
DROP TABLE Requirement
DROP TABLE RequirementsPlotter
DROP TABLE RequirementsSublimated

CREATE TABLE General_Area(
	ID_Area int PRIMARY KEY,
	Area varchar(50),
	AreaStatus int, --1 Activo 2 No Activo
	Comments varchar(350)
)
CREATE TABLE General_Locations(
	ID_Locations int PRIMARY KEY,
	ID_Area int,
	Locations varchar(50),
	LocationsStatus int, --1 Activo 2 No Activo
	Comments varchar(350)
	CONSTRAINT FK_AreaLocations FOREIGN KEY (ID_Area) REFERENCES General_Area (ID_Area)
)

CREATE TABLE Requirement(
	ID_Requirement int Primary Key,
	ID_Area int, -- LLave Foranea para saber que area que pertenece la requiza
	RequirementType int, --1 Interna 2 Externa
	ID_AreaRequirement int, -- LLave Foranea para saber que area esta solicitando la requisa
	CantRequirement int,
	PartRequirement varchar(150),
	SizeRequirement varchar(150),
	UserRequirement Varchar(150),
	StatusRequirement int, --1 New, 2 Inspeccion, 3 BodegaIn, 4 Plotter, 5 Sublimado, 6 BodegaOn, 7 Complete, 0 Deleted
	PONumberPPM varchar(150),
	StyleNumberPPM varchar(150),
	MOPPM varchar(150),
	OrderQtyPPM int,
	SportPPM varchar(150),
	TypePPM varchar(150),
	Color1PPM varchar(150),
	Color2PPM varchar(150),
	Comments varchar(350),
	CreateDate datetime DEFAULT GETDATE(),
	CONSTRAINT FK_AreaRequirement FOREIGN KEY (ID_AreaRequirement) REFERENCES General_Area (ID_Area),
	CONSTRAINT FK_Area FOREIGN KEY (ID_Area) REFERENCES General_Area (ID_Area)
)

CREATE TABLE RequirementDetail(
	ID_RequirementDetail int Primary Key,
	ID_Requirement int,
	GarmentSizePPM varchar(50),
	Part varchar(150),
	OrderQtyPPM int,
	CantRequirement int,
	CreateDate datetime DEFAULT GETDATE(),
	CONSTRAINT FK_RequirementDetail FOREIGN KEY (ID_Requirement) REFERENCES Requirement (ID_Requirement)
)

CREATE TABLE RequirementLogs(
	ID_RequirementLogs int PRIMARY KEY,
	ID_Requirement int,
	RequirementType int, --1 Interna 2 Externa
	ID_AreaRequirement int, -- LLave Foranea para saber que area esta solicitando la requisa
	CantRequirement int,
	PartRequirement varchar(150),
	SizeRequirement varchar(150),
	UserRequirement Varchar(150),
	StatusRequirement int,
	Comments varchar(350),
	CreateDate datetime DEFAULT GETDATE(),
	CONSTRAINT FK_Requirement FOREIGN KEY (ID_Requirement) REFERENCES Requirement (ID_Requirement)
)

CREATE TABLE RequirementsPlotter(
	ID_RequirementsPlotter int PRIMARY KEY,
	ID_Requirement int,
	ID_Warehouse int,
	UserIN varchar(150),
	DateIN date,
	TurnoIN varchar(25),
	UserOut varchar(150),
	DateOut date,
	TurnoOut varchar(25),
	StatusRequirementPlotter int, --1 New 2 Complete
	Comments varchar(350),
	CONSTRAINT FK_RequirementsPlotterWarehouse FOREIGN KEY (ID_Warehouse) REFERENCES WarehouseSublimated (ID_Warehouse),
	CONSTRAINT FK_RequirementsPlotterRequirement FOREIGN KEY (ID_Requirement) REFERENCES Requirement (ID_Requirement)
)
CREATE TABLE RequirementsSublimated(
	ID_RequirementsSublimated int PRIMARY KEY,
	ID_Requirement int,
	ID_Warehouse int,
	UserIN varchar(150),
	DateIN date,
	TurnoIN varchar(25),
	UserOut varchar(150),
	DateOut date,
	TurnoOut varchar(25),
	StatusRequirementPlotter int, --1 New 2 Complete
	Comments varchar(350),
	CONSTRAINT FK_RequirementsSublimatedWarehouse FOREIGN KEY (ID_Warehouse) REFERENCES WarehouseSublimated (ID_Warehouse),
	CONSTRAINT FK_RequirementsSublimatedRequirement FOREIGN KEY (ID_Requirement) REFERENCES Requirement (ID_Requirement)
)

CREATE TABLE WarehouseSublimated(
	ID_Warehouse int PRIMARY KEY,
	ID_Locations int,
	UserWarehouseIN varchar(150),
	DateIN date,
	TurnoIN varchar(25),
	UserWarehouseOut varchar(150),
	DateOut date,
	TurnoOut varchar(25),
	StatusWarehouse int, --1 New 2 Complete
	Comments varchar(350),
	PONumberPPM varchar(150),
	StyleNumberPPM varchar(150),
	MOPPM varchar(150),
	OrderQtyPPM int,
	SportPPM varchar(150),
	TypePPM varchar(150),
	CONSTRAINT FK_WarehouseSublimatedLocations FOREIGN KEY (ID_Locations) REFERENCES General_Locations (ID_Locations),
	
)

CREATE TABLE General_Display(
	ID_General_Display int PRIMARY KEY,
	DisplayName varchar(150),
	StatusDisplay int, --1 Active 2 No Active
	Comments varchar(350)
)
CREATE TABLE General_User(
	ID_General_User int PRIMARY KEY,
	UserName varchar(150),
	StatusUser int, --1 Active 2 No Active
	Comments varchar(350)
)
CREATE TABLE General_Access(
	ID_General_Access int PRIMARY KEY,
	ID_General_Display int,
	ID_General_User int,
	StatusUser int, --1 Active 2 No Active
	Comments varchar(350)
	CONSTRAINT FK_General_AccessDisplay FOREIGN KEY (ID_General_Display) REFERENCES General_Display (ID_General_Display),
	CONSTRAINT FK_General_AccessUser FOREIGN KEY (ID_General_User) REFERENCES General_User (ID_General_User)
)

CREATE TABLE WarehouseSublimatedLogs(
	ID_WarehouseSublimatedLogs int PRIMARY KEY,
	ID_Warehouse int,
	ID_Locations int,
	UserWarehouseIN varchar(150),
	DateIN date,
	TurnoIN varchar(25),
	UserWarehouseOut varchar(150),
	DateOut date,
	TurnoOut varchar(25),
	StatusWarehouse int, --1 New 2 Complete
	Comments varchar(350),
	CONSTRAINT FK_WarehouseSublimatedLogs FOREIGN KEY (ID_Warehouse) REFERENCES WarehouseSublimated (ID_Warehouse),
)