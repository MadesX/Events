
USE [Events]
GO
/****** Object:  Table [dbo].[Events]    Script Date: 20/07/2024 14:56:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Events](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[StartDate] [datetime] NOT NULL,
	[EndDate] [datetime] NOT NULL,
	[MaxRegistrations] [int] NOT NULL,
	[Location] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Events] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EventUser]    Script Date: 20/07/2024 14:56:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EventUser](
	[EventRef] [int] NOT NULL,
	[UserRef] [int] NOT NULL,
	[Creation] [datetime] NOT NULL,
 CONSTRAINT [PK_EventUser] PRIMARY KEY CLUSTERED 
(
	[EventRef] ASC,
	[UserRef] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 20/07/2024 14:56:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[DateOfBirth] [date] NOT NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[EventUser] ADD  CONSTRAINT [DF_EventUser_Creation]  DEFAULT (getdate()) FOR [Creation]
GO
ALTER TABLE [dbo].[EventUser]  WITH CHECK ADD  CONSTRAINT [FK_EventUser_Events] FOREIGN KEY([EventRef])
REFERENCES [dbo].[Events] ([ID])
GO
ALTER TABLE [dbo].[EventUser] CHECK CONSTRAINT [FK_EventUser_Events]
GO
ALTER TABLE [dbo].[EventUser]  WITH CHECK ADD  CONSTRAINT [FK_EventUser_Users] FOREIGN KEY([UserRef])
REFERENCES [dbo].[Users] ([ID])
GO
ALTER TABLE [dbo].[EventUser] CHECK CONSTRAINT [FK_EventUser_Users]
GO
USE [master]
GO
ALTER DATABASE [Events] SET  READ_WRITE 
GO

---------------------------------------------------------------------------------------------------

USE [Events]
GO

-- Insert users
INSERT INTO [dbo].[Users] ([Name], [DateOfBirth]) VALUES
(N'John Smith', '1990-05-15'),
(N'Emily Johnson', '1985-10-22'),
(N'Michael Brown', '1992-07-09'),
(N'Sarah Lee', '2000-03-01');

-- Insert events
INSERT INTO [dbo].[Events] ([Name], [StartDate], [EndDate], [MaxRegistrations], [Location]) VALUES
(N'Tech Conference 2025', '2025-07-01 09:00', '2025-07-03 17:00', 100, N'New York'),
(N'Art & Design Expo', '2025-08-15 10:00', '2025-08-16 18:00', 50, N'Los Angeles'),
(N'Healthcare Innovations Summit', '2025-09-10 08:30', '2025-09-12 17:30', 200, N'Chicago');

-- Insert user registrations for events
INSERT INTO [dbo].[EventUser] ([EventRef], [UserRef]) VALUES
(1, 1),
(1, 2),
(2, 3),
(3, 1),
(3, 4);