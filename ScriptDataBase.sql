USE [master]
GO

/****** Object:  Database [Tora-bank]    Script Date: 24/06/2024 21:25:30 ******/
CREATE DATABASE [Tora-bank]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Tora-bank', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\Tora-bank.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Tora-bank_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\Tora-bank_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO

IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Tora-bank].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO

ALTER DATABASE [Tora-bank] SET ANSI_NULL_DEFAULT OFF 
GO

ALTER DATABASE [Tora-bank] SET ANSI_NULLS OFF 
GO

ALTER DATABASE [Tora-bank] SET ANSI_PADDING OFF 
GO

ALTER DATABASE [Tora-bank] SET ANSI_WARNINGS OFF 
GO

ALTER DATABASE [Tora-bank] SET ARITHABORT OFF 
GO

ALTER DATABASE [Tora-bank] SET AUTO_CLOSE OFF 
GO

ALTER DATABASE [Tora-bank] SET AUTO_SHRINK OFF 
GO

ALTER DATABASE [Tora-bank] SET AUTO_UPDATE_STATISTICS ON 
GO

ALTER DATABASE [Tora-bank] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO

ALTER DATABASE [Tora-bank] SET CURSOR_DEFAULT  GLOBAL 
GO

ALTER DATABASE [Tora-bank] SET CONCAT_NULL_YIELDS_NULL OFF 
GO

ALTER DATABASE [Tora-bank] SET NUMERIC_ROUNDABORT OFF 
GO

ALTER DATABASE [Tora-bank] SET QUOTED_IDENTIFIER OFF 
GO

ALTER DATABASE [Tora-bank] SET RECURSIVE_TRIGGERS OFF 
GO

ALTER DATABASE [Tora-bank] SET  DISABLE_BROKER 
GO

ALTER DATABASE [Tora-bank] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO

ALTER DATABASE [Tora-bank] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO

ALTER DATABASE [Tora-bank] SET TRUSTWORTHY OFF 
GO

ALTER DATABASE [Tora-bank] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO

ALTER DATABASE [Tora-bank] SET PARAMETERIZATION SIMPLE 
GO

ALTER DATABASE [Tora-bank] SET READ_COMMITTED_SNAPSHOT OFF 
GO

ALTER DATABASE [Tora-bank] SET HONOR_BROKER_PRIORITY OFF 
GO

ALTER DATABASE [Tora-bank] SET RECOVERY FULL 
GO

ALTER DATABASE [Tora-bank] SET  MULTI_USER 
GO

ALTER DATABASE [Tora-bank] SET PAGE_VERIFY CHECKSUM  
GO

ALTER DATABASE [Tora-bank] SET DB_CHAINING OFF 
GO

ALTER DATABASE [Tora-bank] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO

ALTER DATABASE [Tora-bank] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO

ALTER DATABASE [Tora-bank] SET DELAYED_DURABILITY = DISABLED 
GO

ALTER DATABASE [Tora-bank] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO

ALTER DATABASE [Tora-bank] SET QUERY_STORE = OFF
GO

ALTER DATABASE [Tora-bank] SET  READ_WRITE 
GO

