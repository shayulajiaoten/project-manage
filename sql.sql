-- MySQL dump 10.13  Distrib 5.7.25, for Win64 (x86_64)
--
-- Host: localhost    Database: project_manage
-- ------------------------------------------------------
-- Server version	5.7.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
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
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project_member_relation` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键自动递增',
  `project_id` int(11) NOT NULL COMMENT '项目表id',
  `member_id` int(11) NOT NULL COMMENT '成员表id',
  `creator` varchar(32) NOT NULL DEFAULT '' COMMENT '创建人',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updater` varchar(100) DEFAULT '' COMMENT '更新人',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='项目成员关系表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_member_relation`
--

LOCK TABLES `project_member_relation` WRITE;
/*!40000 ALTER TABLE `project_member_relation` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_member_relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_task_relation`
--

DROP TABLE IF EXISTS `project_task_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project_task_relation` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键自动递增',
  `project_id` int(11) NOT NULL COMMENT '项目表id',
  `task_id` int(11) NOT NULL COMMENT '任务表id',
  `creator` varchar(32) NOT NULL DEFAULT '' COMMENT '创建人',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updater` varchar(32) DEFAULT '' COMMENT '更新人',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='项目任务关系表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_task_relation`
--

LOCK TABLES `project_task_relation` WRITE;
/*!40000 ALTER TABLE `project_task_relation` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_task_relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_template`
--

DROP TABLE IF EXISTS `project_template`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project_template` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键自动递增',
  `picture_path` varchar(256) NOT NULL DEFAULT '' COMMENT '模板图片路径',
  `template_name` varchar(64) NOT NULL DEFAULT '' COMMENT '模板名字',
  `description` varchar(256) DEFAULT '' COMMENT '描述',
  `creator` varchar(32) NOT NULL DEFAULT '' COMMENT '创建人',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updater` varchar(32) DEFAULT '' COMMENT '更新人',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='模板表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_template`
--

LOCK TABLES `project_template` WRITE;
/*!40000 ALTER TABLE `project_template` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_template` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_menu_relation`
--

DROP TABLE IF EXISTS `role_menu_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = utf8 */;
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `member_un` (`member_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='成员表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_member`
--

LOCK TABLES `system_member` WRITE;
/*!40000 ALTER TABLE `system_member` DISABLE KEYS */;
INSERT INTO `system_member` VALUES (1,'undefined',NULL,'undefined','','undefined',0,0,'','2020-01-13 12:06:02',NULL,'2020-01-13 12:06:02','undefined','undefined','啊啊'),(2,'member_name',NULL,'email','','undefined',0,0,'','2020-01-13 12:11:49',NULL,'2020-01-13 12:11:49','undefined','undefined','qq'),(3,'member_nam1e',NULL,'emai1l','','undefined',0,0,'','2020-01-13 12:16:30',NULL,'2020-01-13 12:16:30','undefined','undefined','啊啊');
/*!40000 ALTER TABLE `system_member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_menu`
--

DROP TABLE IF EXISTS `system_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `system_project` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键自动递增',
  `project_name` varchar(64) NOT NULL DEFAULT '' COMMENT '项目名称',
  `template_id` int(11) NOT NULL COMMENT '模板ID',
  `description` varchar(512) DEFAULT '' COMMENT '项目简介',
  `creator` varchar(32) NOT NULL DEFAULT '' COMMENT '创建人',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updater` varchar(32) DEFAULT '' COMMENT '更新人',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='项目表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_project`
--

LOCK TABLES `system_project` WRITE;
/*!40000 ALTER TABLE `system_project` DISABLE KEYS */;
/*!40000 ALTER TABLE `system_project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_role`
--

DROP TABLE IF EXISTS `system_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
-- Table structure for table `system_task`
--

DROP TABLE IF EXISTS `system_task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `system_task` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键自动递增',
  `task_name` varchar(128) DEFAULT '' COMMENT '任务名称',
  `sort` int(11) NOT NULL DEFAULT '0' COMMENT '排序，默认值',
  `creator` varchar(32) NOT NULL DEFAULT '' COMMENT '创建人',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updater` varchar(32) DEFAULT '' COMMENT '更新人',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统任务表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_task`
--

LOCK TABLES `system_task` WRITE;
/*!40000 ALTER TABLE `system_task` DISABLE KEYS */;
/*!40000 ALTER TABLE `system_task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team_create`
--

DROP TABLE IF EXISTS `team_create`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `team_create` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键自动递增',
  `team` varchar(32) NOT NULL COMMENT '团队名称',
  `creator` varchar(32) NOT NULL COMMENT '创建人',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `permission` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否允许创建团队',
  `resolve` tinyint(4) NOT NULL DEFAULT '0' COMMENT '该申请是否处理完成',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team_create`
--

LOCK TABLES `team_create` WRITE;
/*!40000 ALTER TABLE `team_create` DISABLE KEYS */;
INSERT INTO `team_create` VALUES (1,'123','321','2020-01-14 11:16:59',0,0),(2,'123','321','2020-01-14 11:35:08',0,0),(3,'123','321','2020-01-14 11:50:10',0,0);
/*!40000 ALTER TABLE `team_create` ENABLE KEYS */;
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

-- Dump completed on 2020-01-15 17:06:41
