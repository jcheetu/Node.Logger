USE [PrimeCloud_Beta_8]
GO

/****** Object:  Table [dbo].[PC_Logging_ActivityLog]    Script Date: 7/18/2017 6:21:30 PM ******/
SET ANSI_PADDING ON
DROP TABLE [dbo].[PC_Logging_ActivityLog]
GO

/****** Object:  Table [dbo].[PC_Logging_ActivityLog]    Script Date: 7/18/2017 6:21:30 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[PC_Logging_ActivityLog](
	[ActivityLogId] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[LogType] [nvarchar](50) NOT NULL,
	[ModuleId] [numeric](18, 0) NOT NULL,
	[ClientId] [numeric](18, 0) NOT NULL,
	[UserEmail] [nvarchar](1050) NULL,
	[InterfaceName] [nvarchar](80) NOT NULL,
	[ModuleName] [nvarchar](200) NOT NULL,
	[MethodName] [nvarchar](max) NULL,
	[ActionTaken] [nvarchar](50) NOT NULL,
	[ActionType] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](max) NULL,
	[Platform] [char](3) NOT NULL,
	[CreatedBy] [numeric](18, 0) NULL,
	[CreatedOn] [datetime] NULL
PRIMARY KEY CLUSTERED 
(
	[ActivityLogId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO


