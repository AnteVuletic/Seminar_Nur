BEGIN TRANSACTION

CREATE TABLE Software(
	SoftwareId int PRIMARY KEY IDENTITY,
	OS varchar(30),
	Licenca varchar(30)
)

CREATE TABLE Hardware(
	HardwareId int PRIMARY KEY IDENTITY,
	KorisnikId int,
	ProstorijaId int,
	Model nvarchar(30)
)

CREATE TABLE Software_Hardware(
	SoftwareId int NOT NULL,
	HardwareId int NOT NULL,
	Azurirano bit,
	Namjena nvarchar(30)
)

CREATE TABLE Korisnik(
	KorisnikId int PRIMARY KEY IDENTITY,
	Oib varchar(11),
	Ime nvarchar(30),
	Prezime nvarchar(30)
)

CREATE TABLE Model(
	Model nvarchar(30) PRIMARY KEY,
	Marka varchar(30)
)

CREATE TABLE Prostorija(
	ProstorijaId int PRIMARY KEY IDENTITY,
	Adresa nvarchar(50)
)
COMMIT

BEGIN TRANSACTION
	ALTER TABLE dbo.Hardware
	ADD FOREIGN KEY (KorisnikId) REFERENCES dbo.Korisnik(KorisnikId)
	
	ALTER TABLE dbo.Hardware
	ADD FOREIGN KEY (ProstorijaId) REFERENCES dbo.Prostorija(ProstorijaId)

	ALTER TABLE dbo.Model
	ADD FOREIGN KEY (Model) REFERENCES dbo.Model(Model) 

	ALTER TABLE dbo.Software_Hardware
	ADD CONSTRAINT PK_SoftwareHardware PRIMARY KEY(SoftwareId,HardwareId)

	ALTER TABLE dbo.Software_Hardware
	ADD CONSTRAINT FK_Software FOREIGN KEY (SoftwareId) REFERENCES dbo.Software(SoftwareId)
	
	ALTER TABLE dbo.Software_Hardware
	ADD CONSTRAINT FK_Hardware FOREIGN KEY (HardwareId) REFERENCES dbo.Hardware(HardwareId)

COMMIT