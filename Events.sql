
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
(N'Sarah Lee', '2000-03-01'),
(N'David Miller', '1988-04-12'),
(N'Linda Garcia', '1995-11-30'),
(N'James Anderson', '1993-02-18'),
(N'Patricia Wilson', '1999-07-21'),
(N'Robert Martinez', '1987-09-14'),
(N'Barbara Taylor', '1978-12-25'),
(N'Kevin Thomas', '1994-06-10'),
(N'Nancy Moore', '1983-08-19'),
(N'Christopher White', '1991-03-22'),
(N'Karen Harris', '2001-05-03'),
(N'Daniel Clark', '1996-10-07'),
(N'Susan Lewis', '1984-02-28'),
(N'Mark Robinson', '2002-11-09'),
(N'Donna Walker', '1998-01-12'),
(N'Joseph Hall', '1997-07-28'),
(N'Mary Allen', '1980-04-04');

-- Insert events
INSERT INTO [dbo].[Events] ([Name], [StartDate], [EndDate], [MaxRegistrations], [Location]) VALUES
(N'Tech Conference 2025', '2025-07-01 09:00', '2025-07-03 17:00', 100, N'New York'),
(N'Art & Design Expo', '2025-08-15 10:00', '2025-08-16 18:00', 50, N'Los Angeles'),
(N'Healthcare Innovations Summit', '2025-09-10 08:30', '2025-09-12 17:30', 200, N'Chicago'),
(N'AI & Robotics Forum', '2025-10-01 09:00', '2025-10-03 17:00', 150, N'San Francisco'),
(N'Music Festival 2025', '2025-06-20 14:00', '2025-06-22 23:00', 500, N'Austin'),
(N'GreenTech Expo', '2025-11-10 10:00', '2025-11-12 16:00', 80, N'Seattle'),
(N'Space Exploration Panel', '2025-12-01 09:00', '2025-12-02 17:00', 60, N'Houston'),
(N'Foodie Fest', '2025-07-25 11:00', '2025-07-26 22:00', 300, N'Portland'),
(N'International Film Showcase', '2025-09-05 10:00', '2025-09-08 23:00', 250, N'Toronto'),
(N'Historical Reenactment Days', '2025-10-15 08:00', '2025-10-17 18:00', 120, N'Boston');

-- Register users for events
INSERT INTO [dbo].[EventUser] ([EventRef], [UserRef]) VALUES
(1, 1),
(1, 5),
(1, 8),
(2, 3),
(2, 7),
(3, 2),
(3, 9),
(4, 4),
(4, 10),
(4, 11),
(5, 6),
(5, 12),
(6, 13),
(6, 14),
(7, 15),
(7, 1),
(8, 16),
(8, 2),
(9, 17),
(9, 5),
(10, 18),
(10, 6),
(2, 19),
(3, 20),
(5, 10),
(8, 19),
(7, 16),
(6, 12),
(9, 14),
(1, 20);
