-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: localhost    Database: project_manage
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `leader_member_relation`
--

DROP TABLE IF EXISTS `leader_member_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `leader_member_relation` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键自动递增',
  `member_id` int(11) NOT NULL COMMENT '成员表ID',
  `team_leader_id` int(11) NOT NULL COMMENT '队长ID',
  `iscanceld` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0:未注销1:已注销',
  `creator` varchar(32) NOT NULL DEFAULT '' COMMENT '创建者',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `team` varchar(32) DEFAULT NULL COMMENT '所属团队',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='成员队长关系表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leader_member_relation`
--

LOCK TABLES `leader_member_relation` WRITE;
/*!40000 ALTER TABLE `leader_member_relation` DISABLE KEYS */;
/*!40000 ALTER TABLE `leader_member_relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member_role_relation`
--

DROP TABLE IF EXISTS `member_role_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `member_role_relation` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键自动递增',
  `member_id` int(11) NOT NULL COMMENT '成员表id',
  `role_id` int(11) NOT NULL COMMENT '角色表id',
  `creator` varchar(32) NOT NULL DEFAULT '' COMMENT '创建人',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updater` varchar(32) DEFAULT '' COMMENT '更新人',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='成员角色关系表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_role_relation`
--

LOCK TABLES `member_role_relation` WRITE;
/*!40000 ALTER TABLE `member_role_relation` DISABLE KEYS */;
/*!40000 ALTER TABLE `member_role_relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_member_relation`
--

DROP TABLE IF EXISTS `project_member_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `project_member_relation` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键自动递增',
  `project_id` int(11) NOT NULL COMMENT '项目表id',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updater` varchar(100) DEFAULT '' COMMENT '更新人',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  `member_name` varchar(32) NOT NULL COMMENT '成员名',
  `collect` tinyint(4) NOT NULL DEFAULT '1' COMMENT '是否收藏，默认为1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COMMENT='项目成员关系表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_member_relation`
--

LOCK TABLES `project_member_relation` WRITE;
/*!40000 ALTER TABLE `project_member_relation` DISABLE KEYS */;
INSERT INTO `project_member_relation` VALUES (8,11,'2020-02-02 15:00:16','','2020-02-02 15:00:16','qqqq',1),(9,8,'2020-02-02 15:28:28','','2020-02-02 15:28:28','qqqq',1),(10,9,'2020-02-02 15:28:32','','2020-02-02 15:28:32','qqqq',1),(11,10,'2020-02-03 02:26:13','','2020-02-03 02:26:13','qqqq',1);
/*!40000 ALTER TABLE `project_member_relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_task_relation`
--

DROP TABLE IF EXISTS `project_task_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `project_task_relation` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键自动递增',
  `project_id` int(11) NOT NULL COMMENT '项目表id',
  `task_name` varchar(32) NOT NULL COMMENT '任务表id',
  `creator` varchar(32) NOT NULL DEFAULT '' COMMENT '创建人',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updater` varchar(32) DEFAULT '' COMMENT '更新人',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  `able` tinyint(4) NOT NULL DEFAULT '0' COMMENT '项目对应任务是否被删除',
  `complete` tinyint(4) NOT NULL DEFAULT '0' COMMENT '任务是否完成',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='项目任务关系表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_task_relation`
--

LOCK TABLES `project_task_relation` WRITE;
/*!40000 ALTER TABLE `project_task_relation` DISABLE KEYS */;
INSERT INTO `project_task_relation` VALUES (1,16,'项目任务','member_name','2020-01-26 13:50:00','','2020-01-26 13:50:00',0,0),(2,16,'项目任务','member_name','2020-01-26 13:50:00','','2020-01-26 13:50:00',0,0),(3,17,'项目任务','member_name','2020-01-26 13:50:20','','2020-01-26 13:50:20',0,0),(4,17,'项目任务','member_name','2020-01-26 13:50:20','','2020-01-26 13:50:20',0,0),(5,17,'122222','','2020-01-26 14:57:09','','2020-01-26 14:57:09',0,0),(6,21,'项目任务','member_name','2020-01-27 06:36:08','','2020-01-27 06:36:08',0,0),(7,21,'项目任务','member_name','2020-01-27 06:36:08','','2020-01-27 06:36:08',0,0),(8,22,'项目任务','member_name','2020-01-27 06:46:17','','2020-01-27 06:46:17',0,0),(9,22,'项目任务','member_name','2020-01-27 06:46:17','','2020-01-27 06:46:17',0,0);
/*!40000 ALTER TABLE `project_task_relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_template`
--

DROP TABLE IF EXISTS `project_template`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `project_template` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键自动递增',
  `picture_path` varchar(256) NOT NULL DEFAULT '' COMMENT '模板图片路径',
  `template_name` varchar(64) NOT NULL DEFAULT '' COMMENT '模板名字',
  `description` varchar(256) DEFAULT '' COMMENT '描述',
  `creator` varchar(32) NOT NULL DEFAULT '' COMMENT '创建人',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updater` varchar(32) DEFAULT '' COMMENT '更新人',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  `system_task` tinyint(4) NOT NULL DEFAULT '0' COMMENT '默认任务',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='模板表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_template`
--

LOCK TABLES `project_template` WRITE;
/*!40000 ALTER TABLE `project_template` DISABLE KEYS */;
INSERT INTO `project_template` VALUES (1,'链接','系统模板','简介','member_name','2020-01-26 12:25:55','','2020-01-26 12:25:55',0);
/*!40000 ALTER TABLE `project_template` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_menu_relation`
--

DROP TABLE IF EXISTS `role_menu_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `role_menu_relation` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键自动递增',
  `role_id` int(11) NOT NULL COMMENT '角色表id',
  `menu_id` int(11) NOT NULL COMMENT '菜案表id',
  `creator` varchar(32) NOT NULL DEFAULT '' COMMENT '更新人',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updater` varchar(32) DEFAULT '' COMMENT '更新人',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='权限关系表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_menu_relation`
--

LOCK TABLES `role_menu_relation` WRITE;
/*!40000 ALTER TABLE `role_menu_relation` DISABLE KEYS */;
/*!40000 ALTER TABLE `role_menu_relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_member`
--

DROP TABLE IF EXISTS `system_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `system_member` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键自动递增',
  `member_name` varchar(64) NOT NULL COMMENT '名称',
  `nickname` varchar(64) DEFAULT NULL COMMENT '昵称',
  `email` varchar(64) NOT NULL COMMENT '邮箱',
  `mobile` varchar(32) DEFAULT '' COMMENT '手机号',
  `password` varchar(64) NOT NULL COMMENT '密码',
  `iscanceld` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0:未注销1:已注销',
  `is_team_leader` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否是队长  0：不是 1：是',
  `creator` varchar(32) NOT NULL DEFAULT '' COMMENT '创建者',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updater` varchar(32) DEFAULT NULL COMMENT '更新人',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  `question` varchar(100) DEFAULT NULL COMMENT '密保问题',
  `answer` varchar(100) DEFAULT NULL COMMENT '密保答案',
  `team` varchar(32) DEFAULT NULL COMMENT '所属团队',
  `super_leader` tinyint(4) NOT NULL DEFAULT '0' COMMENT '超级管理员',
  PRIMARY KEY (`id`),
  UNIQUE KEY `member_un` (`member_name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='成员表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_member`
--

LOCK TABLES `system_member` WRITE;
/*!40000 ALTER TABLE `system_member` DISABLE KEYS */;
INSERT INTO `system_member` VALUES (1,'undefined',NULL,'undefined','','qqqQQQQq',0,0,'','2020-01-13 12:06:02',NULL,'2020-01-13 12:06:02','你的手机号码','123','ss',0),(2,'member_name',NULL,'email','','123',0,1,'','2020-01-13 12:11:49',NULL,'2020-01-13 12:11:49','你的手机号码','undefined','',0),(3,'test',NULL,'emai1l','','test',0,1,'','2020-01-13 12:16:30',NULL,'2020-01-13 12:16:30','你的手机号码','undefined','',0),(4,'sss',NULL,'test@qq.com','','qwe123',0,0,'','2020-01-28 14:19:06',NULL,'2020-01-28 14:19:06','你的手机号码','123','',0),(5,'test@qq.com',NULL,'vqon63@163.com','','qwe123',0,0,'','2020-01-28 14:19:40',NULL,'2020-01-28 14:19:40','你的手机号码','123','',0),(6,'test@qq.com1',NULL,'aqon631@16113.com','','qwe123',0,0,'','2020-01-28 14:22:07',NULL,'2020-01-28 14:22:07','你的手机号码','undefined','ss',0),(7,'qqqq',NULL,'bqon6q3@163.com','','qq11111',0,1,'','2020-01-29 07:05:47',NULL,'2020-01-29 07:05:47','你的手机号码','qq','qq',0),(8,'qqq',NULL,'vqon63@q163.com','','qqq123',0,0,'','2020-01-29 11:45:38',NULL,'2020-01-29 11:45:38','你的手机号码','qqq','',0);
/*!40000 ALTER TABLE `system_member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_menu`
--

DROP TABLE IF EXISTS `system_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `system_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键自动递增',
  `menu_name` varchar(32) NOT NULL COMMENT '菜单名称',
  `type` varchar(16) NOT NULL COMMENT '类型  innerPage:内页,navication:导航菜单',
  `sort` int(11) NOT NULL DEFAULT '0' COMMENT '排序',
  `is_show_left` tinyint(4) NOT NULL DEFAULT '1' COMMENT '是否显示侧栏  1：显示 0：不显示',
  `request_path` varchar(256) DEFAULT '' COMMENT '请求路径',
  `request_address` varchar(256) DEFAULT '' COMMENT '请求地址',
  `parent_id` int(11) NOT NULL DEFAULT '0' COMMENT '父节点ID',
  `remark` varchar(256) DEFAULT '' COMMENT '备注',
  `creator` varchar(32) NOT NULL DEFAULT '' COMMENT '创建者',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updater` varchar(32) DEFAULT '' COMMENT '更新人',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='菜单表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_menu`
--

LOCK TABLES `system_menu` WRITE;
/*!40000 ALTER TABLE `system_menu` DISABLE KEYS */;
/*!40000 ALTER TABLE `system_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_project`
--

DROP TABLE IF EXISTS `system_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `system_project` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键自动递增',
  `project_name` varchar(64) NOT NULL DEFAULT '' COMMENT '项目名称',
  `template_id` int(11) NOT NULL COMMENT '模板ID',
  `description` varchar(512) DEFAULT '' COMMENT '项目简介',
  `creator` varchar(32) NOT NULL DEFAULT '' COMMENT '创建人',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updater` varchar(32) DEFAULT '' COMMENT '更新人',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  `able` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否允许创建，默认为0',
  `team` varchar(64) DEFAULT NULL COMMENT '所属团队',
  `recycle` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否进入回收站',
  `pigeonhole` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否归档',
  `plan` int(11) NOT NULL DEFAULT '0' COMMENT '项目进度',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COMMENT='项目表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_project`
--

LOCK TABLES `system_project` WRITE;
/*!40000 ALTER TABLE `system_project` DISABLE KEYS */;
INSERT INTO `system_project` VALUES (1,'temp',-2,'temp','member_name','2020-01-19 05:59:19','','2020-01-19 05:59:19',1,'qq',1,0,11),(2,'测试',-2,'简介','member_name','2020-01-19 06:05:42','','2020-01-19 06:05:42',0,'qq',0,0,11),(3,'temp1',-2,'temp','member_name','2020-01-19 06:08:08','','2020-01-19 06:08:08',0,'qq',0,0,11),(4,'temp1',-2,'temp','member_name','2020-01-19 06:08:10','','2020-01-19 06:08:10',0,'qq',0,0,11),(5,'temp1',-2,'temp','member_name','2020-01-19 06:08:11','','2020-01-19 06:08:11',0,'qq',0,0,11),(6,'项目测试1',1,'description','member_name','2020-01-26 13:03:49','','2020-01-26 13:03:49',0,'qq',0,0,11),(7,'项目测试1',1,'description','member_name','2020-01-26 13:04:50','','2020-01-26 13:04:50',0,'qq',0,0,11),(8,'项目测试1',1,'description','member_name','2020-01-26 13:09:25','','2020-01-26 13:09:25',1,'qq',1,0,11),(9,'项目测试2',1,'description','member_name','2020-01-26 13:26:34','','2020-01-26 13:26:34',1,'qq',0,0,11),(10,'项目测试3',1,'description','member_name','2020-01-26 13:27:10','','2020-01-26 13:27:10',1,'qq',0,0,11),(11,'项目测试4',1,'description','member_name','2020-01-26 13:29:38','','2020-01-26 13:29:38',1,'qq',0,0,11),(12,'项目测试5',1,'description','member_name','2020-01-26 13:36:28','','2020-01-26 13:36:28',1,'qq',0,0,11),(13,'项目测试6',1,'description','member_name','2020-01-26 13:42:27','','2020-01-26 13:42:27',1,'qq',1,0,0),(14,'项目测试7',1,'description','member_name','2020-01-26 13:45:06','','2020-01-26 13:45:06',1,'qq',0,0,0),(15,'项目测试8',1,'description','member_name','2020-01-26 13:45:42','','2020-01-26 13:45:42',1,'qq',1,0,0),(16,'项目测试9',1,'description','member_name','2020-01-26 13:50:00','','2020-01-26 13:50:00',1,'qq',0,0,0),(17,'项目测试10',1,'description','member_name','2020-01-26 13:50:20','','2020-01-26 13:50:20',1,'qq',0,0,0),(18,'项目测试110',1,'test','member_name','2020-01-27 06:33:25','','2020-01-27 06:33:25',1,'qq',0,0,0),(19,'项目测试1110',1,'test','member_name','2020-01-27 06:35:02','','2020-01-27 06:35:02',1,'qq',0,0,0),(20,'项目测试11110',1,'test','member_name','2020-01-27 06:35:19','','2020-01-27 06:35:19',1,'qq',0,0,0),(21,'项目测试111110',1,'test','member_name','2020-01-27 06:36:08','','2020-01-27 06:36:08',1,'qq',1,0,0),(22,'qqqq',1,'test','member_name','2020-01-27 06:46:17','','2020-01-27 06:46:17',1,'qq',1,0,50);
/*!40000 ALTER TABLE `system_project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_role`
--

DROP TABLE IF EXISTS `system_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `system_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键自动递增',
  `role_name` varchar(32) NOT NULL DEFAULT '' COMMENT '角色名称',
  `description` varchar(256) NOT NULL DEFAULT '' COMMENT '描述',
  `creator` varchar(32) NOT NULL DEFAULT '' COMMENT '创建人',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updater` varchar(32) DEFAULT '' COMMENT '更新人',
  `update_time` timestamp NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_role`
--

LOCK TABLES `system_role` WRITE;
/*!40000 ALTER TABLE `system_role` DISABLE KEYS */;
/*!40000 ALTER TABLE `system_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task_sontask_relation`
--

DROP TABLE IF EXISTS `task_sontask_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `task_sontask_relation` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键自动递增',
  `project_id` int(11) NOT NULL COMMENT '项目表id',
  `task_name` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '任务表id',
  `creator` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '创建人',
  `updater` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '更新人',
  `able` tinyint(4) NOT NULL DEFAULT '0' COMMENT '项目对应任务是否被删除',
  `complete` tinyint(4) NOT NULL DEFAULT '0' COMMENT '任务是否完成',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  `member` int(11) DEFAULT NULL COMMENT '任务所属成员',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='任务与子任务关系表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task_sontask_relation`
--

LOCK TABLES `task_sontask_relation` WRITE;
/*!40000 ALTER TABLE `task_sontask_relation` DISABLE KEYS */;
/*!40000 ALTER TABLE `task_sontask_relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team_create`
--

DROP TABLE IF EXISTS `team_create`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `team_create` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键自动递增',
  `team` varchar(32) NOT NULL COMMENT '团队名称',
  `creator` varchar(32) NOT NULL COMMENT '创建人',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `permission` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否允许创建团队',
  `resolve` tinyint(4) NOT NULL DEFAULT '0' COMMENT '该申请是否处理完成',
  `del` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否被删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team_create`
--

LOCK TABLES `team_create` WRITE;
/*!40000 ALTER TABLE `team_create` DISABLE KEYS */;
INSERT INTO `team_create` VALUES (1,'222','321','2020-02-02 07:57:29',1,0,1),(2,'ss','321','2020-01-30 08:07:20',1,0,0),(3,'qq','321','2020-02-04 06:36:52',1,0,0),(4,'33333','321','2020-02-02 07:57:03',1,0,1),(5,'333','321','2020-02-02 07:57:20',1,0,1),(6,'1231','321','2020-01-30 07:34:31',1,0,0),(7,'12311','321','2020-01-30 07:34:31',1,0,0),(8,'1111','321','2020-01-30 07:07:34',0,0,0),(9,'11111','321','2020-01-30 07:07:36',0,0,0),(10,'111111','321','2020-01-30 07:07:38',0,0,0),(11,'1111111','321','2020-01-30 07:07:40',0,0,0),(12,'111','undefined','2020-01-30 07:19:09',0,0,0),(13,'222','undefined','2020-02-02 07:57:29',0,0,1),(14,'222','undefined','2020-02-02 07:57:29',0,0,1);
/*!40000 ALTER TABLE `team_create` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `template_task_relation`
--

DROP TABLE IF EXISTS `template_task_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `template_task_relation` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键自动递增',
  `creator` varchar(32) NOT NULL DEFAULT '' COMMENT '创建人',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updater` varchar(32) DEFAULT '' COMMENT '更新人',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  `task_name` varchar(64) NOT NULL COMMENT '任务名',
  `template` int(8) NOT NULL COMMENT '对应模板id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='模板任务关系表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `template_task_relation`
--

LOCK TABLES `template_task_relation` WRITE;
/*!40000 ALTER TABLE `template_task_relation` DISABLE KEYS */;
INSERT INTO `template_task_relation` VALUES (1,'member_name','2020-01-26 12:44:27','','2020-01-26 12:44:27','项目任务',1),(2,'member_name','2020-01-26 12:44:30','','2020-01-26 12:44:30','项目任务',1);
/*!40000 ALTER TABLE `template_task_relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'project_manage'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-04 15:45:35
