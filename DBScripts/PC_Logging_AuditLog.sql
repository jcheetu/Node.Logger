USE [PrimeCloud_Beta_8]
 
 SET ANSI_PADDING ON
 DROP TABLE [dbo].[PC_Logging_AuditLog]

CREATE TABLE [dbo].[PC_Logging_AuditLog](
	[AuditLogId] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[AuthenticationToken] [nvarchar](1050) NULL,
	[ClientId] [numeric](18, 0) NOT NULL,
	[UserEmail] [nvarchar](1050) NULL,
	[IP] [nvarchar](100) NOT NULL,
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
	[AuditLogId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO


