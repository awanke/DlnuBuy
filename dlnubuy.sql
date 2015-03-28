/*
Navicat MySQL Data Transfer

Source Server         : dlnubuy
Source Server Version : 50540
Source Host           : localhost:3306
Source Database       : dlnubuy

Target Server Type    : MYSQL
Target Server Version : 50540
File Encoding         : 65001

Date: 2015-03-25 16:20:07
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for auth_group
-- ----------------------------
DROP TABLE IF EXISTS `auth_group`;
CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of auth_group
-- ----------------------------

-- ----------------------------
-- Table structure for auth_group_permissions
-- ----------------------------
DROP TABLE IF EXISTS `auth_group_permissions`;
CREATE TABLE `auth_group_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `group_id` (`group_id`,`permission_id`),
  KEY `auth_group_permissions_0e939a4f` (`group_id`),
  KEY `auth_group_permissions_8373b171` (`permission_id`),
  CONSTRAINT `auth_group_permissions_group_id_58c48ba9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_group_permissi_permission_id_23962d04_fk_auth_permission_id` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of auth_group_permissions
-- ----------------------------

-- ----------------------------
-- Table structure for auth_permission
-- ----------------------------
DROP TABLE IF EXISTS `auth_permission`;
CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `content_type_id` (`content_type_id`,`codename`),
  KEY `auth_permission_417f1b1c` (`content_type_id`),
  CONSTRAINT `auth_permissi_content_type_id_51277a81_fk_django_content_type_id` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of auth_permission
-- ----------------------------
INSERT INTO `auth_permission` VALUES ('1', 'Can add permission', '1', 'add_permission');
INSERT INTO `auth_permission` VALUES ('2', 'Can change permission', '1', 'change_permission');
INSERT INTO `auth_permission` VALUES ('3', 'Can delete permission', '1', 'delete_permission');
INSERT INTO `auth_permission` VALUES ('4', 'Can add group', '2', 'add_group');
INSERT INTO `auth_permission` VALUES ('5', 'Can change group', '2', 'change_group');
INSERT INTO `auth_permission` VALUES ('6', 'Can delete group', '2', 'delete_group');
INSERT INTO `auth_permission` VALUES ('7', 'Can add user', '3', 'add_user');
INSERT INTO `auth_permission` VALUES ('8', 'Can change user', '3', 'change_user');
INSERT INTO `auth_permission` VALUES ('9', 'Can delete user', '3', 'delete_user');
INSERT INTO `auth_permission` VALUES ('10', 'Can add content type', '4', 'add_contenttype');
INSERT INTO `auth_permission` VALUES ('11', 'Can change content type', '4', 'change_contenttype');
INSERT INTO `auth_permission` VALUES ('12', 'Can delete content type', '4', 'delete_contenttype');
INSERT INTO `auth_permission` VALUES ('13', 'Can add session', '5', 'add_session');
INSERT INTO `auth_permission` VALUES ('14', 'Can change session', '5', 'change_session');
INSERT INTO `auth_permission` VALUES ('15', 'Can delete session', '5', 'delete_session');
INSERT INTO `auth_permission` VALUES ('16', 'Can add users', '6', 'add_users');
INSERT INTO `auth_permission` VALUES ('17', 'Can change users', '6', 'change_users');
INSERT INTO `auth_permission` VALUES ('18', 'Can delete users', '6', 'delete_users');
INSERT INTO `auth_permission` VALUES ('19', 'Can add product', '7', 'add_product');
INSERT INTO `auth_permission` VALUES ('20', 'Can change product', '7', 'change_product');
INSERT INTO `auth_permission` VALUES ('21', 'Can delete product', '7', 'delete_product');
INSERT INTO `auth_permission` VALUES ('22', 'Can add buy', '8', 'add_buy');
INSERT INTO `auth_permission` VALUES ('23', 'Can change buy', '8', 'change_buy');
INSERT INTO `auth_permission` VALUES ('24', 'Can delete buy', '8', 'delete_buy');
INSERT INTO `auth_permission` VALUES ('25', 'Can add classification', '9', 'add_classification');
INSERT INTO `auth_permission` VALUES ('26', 'Can change classification', '9', 'change_classification');
INSERT INTO `auth_permission` VALUES ('27', 'Can delete classification', '9', 'delete_classification');

-- ----------------------------
-- Table structure for auth_user
-- ----------------------------
DROP TABLE IF EXISTS `auth_user`;
CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime NOT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(30) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `email` varchar(75) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of auth_user
-- ----------------------------
INSERT INTO `auth_user` VALUES ('1', 'pbkdf2_sha256$15000$rBrq1HlebLqx$tWm5+oJ90+xXX0nlPANeMhbw3Uus+2gyAUpY2RpoO3Q=', '2015-03-24 09:34:05', '1', '123', '', '', '', '1', '1', '2015-03-24 09:34:05');

-- ----------------------------
-- Table structure for auth_user_groups
-- ----------------------------
DROP TABLE IF EXISTS `auth_user_groups`;
CREATE TABLE `auth_user_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`group_id`),
  KEY `auth_user_groups_e8701ad4` (`user_id`),
  KEY `auth_user_groups_0e939a4f` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_30a071c9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_24702650_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of auth_user_groups
-- ----------------------------

-- ----------------------------
-- Table structure for auth_user_user_permissions
-- ----------------------------
DROP TABLE IF EXISTS `auth_user_user_permissions`;
CREATE TABLE `auth_user_user_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`permission_id`),
  KEY `auth_user_user_permissions_e8701ad4` (`user_id`),
  KEY `auth_user_user_permissions_8373b171` (`permission_id`),
  CONSTRAINT `auth_user_user_permissions_user_id_7cd7acb6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `auth_user_user_perm_permission_id_3d7071f0_fk_auth_permission_id` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of auth_user_user_permissions
-- ----------------------------

-- ----------------------------
-- Table structure for django_content_type
-- ----------------------------
DROP TABLE IF EXISTS `django_content_type`;
CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_3ec8c61c_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of django_content_type
-- ----------------------------
INSERT INTO `django_content_type` VALUES ('1', 'permission', 'auth', 'permission');
INSERT INTO `django_content_type` VALUES ('2', 'group', 'auth', 'group');
INSERT INTO `django_content_type` VALUES ('3', 'user', 'auth', 'user');
INSERT INTO `django_content_type` VALUES ('4', 'content type', 'contenttypes', 'contenttype');
INSERT INTO `django_content_type` VALUES ('5', 'session', 'sessions', 'session');
INSERT INTO `django_content_type` VALUES ('6', 'users', 'dlnubuy', 'users');
INSERT INTO `django_content_type` VALUES ('7', 'product', 'dlnubuy', 'product');
INSERT INTO `django_content_type` VALUES ('8', 'buy', 'dlnubuy', 'buy');
INSERT INTO `django_content_type` VALUES ('9', 'classification', 'dlnubuy', 'classification');

-- ----------------------------
-- Table structure for django_migrations
-- ----------------------------
DROP TABLE IF EXISTS `django_migrations`;
CREATE TABLE `django_migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of django_migrations
-- ----------------------------
INSERT INTO `django_migrations` VALUES ('1', 'contenttypes', '0001_initial', '2015-03-24 09:33:53');
INSERT INTO `django_migrations` VALUES ('2', 'auth', '0001_initial', '2015-03-24 09:33:53');
INSERT INTO `django_migrations` VALUES ('3', 'sessions', '0001_initial', '2015-03-24 09:33:53');
INSERT INTO `django_migrations` VALUES ('4', 'dlnubuy', '0001_initial', '2015-03-24 09:34:25');

-- ----------------------------
-- Table structure for django_session
-- ----------------------------
DROP TABLE IF EXISTS `django_session`;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_de54fa62` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of django_session
-- ----------------------------

-- ----------------------------
-- Table structure for dlnubuy_buy
-- ----------------------------
DROP TABLE IF EXISTS `dlnubuy_buy`;
CREATE TABLE `dlnubuy_buy` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pdid` int(11) NOT NULL,
  `buytime` datetime NOT NULL,
  `transaction_status` varchar(10) NOT NULL,
  `buyid` int(11) NOT NULL,
  `esllid` int(11) NOT NULL,
  `buymoney` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dlnubuy_buy
-- ----------------------------

-- ----------------------------
-- Table structure for dlnubuy_classification
-- ----------------------------
DROP TABLE IF EXISTS `dlnubuy_classification`;
CREATE TABLE `dlnubuy_classification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `CFname` varchar(300) NOT NULL,
  `CFnumber` int(11) NOT NULL,
  `level` int(11) NOT NULL,
  `parent` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=170 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dlnubuy_classification
-- ----------------------------
INSERT INTO `dlnubuy_classification` VALUES ('1', '图书教辅', '100000', '1', '0');
INSERT INTO `dlnubuy_classification` VALUES ('2', '生活百货', '200000', '1', '0');
INSERT INTO `dlnubuy_classification` VALUES ('3', '遗弃猫狗', '300000', '1', '0');
INSERT INTO `dlnubuy_classification` VALUES ('4', '户外健身', '400000', '1', '0');
INSERT INTO `dlnubuy_classification` VALUES ('5', '工艺品', '500000', '1', '0');
INSERT INTO `dlnubuy_classification` VALUES ('6', '教辅类', '101000', '2', '100000');
INSERT INTO `dlnubuy_classification` VALUES ('7', '图书类', '102000', '2', '100000');
INSERT INTO `dlnubuy_classification` VALUES ('8', '英语专项', '101010', '3', '101000');
INSERT INTO `dlnubuy_classification` VALUES ('9', '阅读理解', '101011', '4', '101010');
INSERT INTO `dlnubuy_classification` VALUES ('10', '英语词汇', '101012', '4', '101010');
INSERT INTO `dlnubuy_classification` VALUES ('11', '英语语法', '101013', '4', '101010');
INSERT INTO `dlnubuy_classification` VALUES ('12', '口语/听力', '101014', '4', '101010');
INSERT INTO `dlnubuy_classification` VALUES ('13', '英语写作', '101015', '4', '101010');
INSERT INTO `dlnubuy_classification` VALUES ('14', '考研', '101020', '3', '101000');
INSERT INTO `dlnubuy_classification` VALUES ('15', '考研英语', '101021', '4', '101020');
INSERT INTO `dlnubuy_classification` VALUES ('16', '考研数学', '101022', '4', '101020');
INSERT INTO `dlnubuy_classification` VALUES ('17', '考研政治', '101023', '4', '101020');
INSERT INTO `dlnubuy_classification` VALUES ('18', '考研专业课', '101024', '4', '101020');
INSERT INTO `dlnubuy_classification` VALUES ('19', '外语考试', '101030', '3', '101000');
INSERT INTO `dlnubuy_classification` VALUES ('20', '日语考试', '101031', '4', '101030');
INSERT INTO `dlnubuy_classification` VALUES ('21', '四/六级考试', '101032', '4', '101030');
INSERT INTO `dlnubuy_classification` VALUES ('22', '托福考试', '101033', '4', '101030');
INSERT INTO `dlnubuy_classification` VALUES ('23', 'GRE考试', '101034', '4', '101030');
INSERT INTO `dlnubuy_classification` VALUES ('24', '公务员考试', '101040', '3', '101000');
INSERT INTO `dlnubuy_classification` VALUES ('25', '申论', '101041', '4', '101040');
INSERT INTO `dlnubuy_classification` VALUES ('26', '行测', '101042', '4', '101040');
INSERT INTO `dlnubuy_classification` VALUES ('27', '国考', '101043', '4', '101040');
INSERT INTO `dlnubuy_classification` VALUES ('28', '省考', '101044', '4', '101040');
INSERT INTO `dlnubuy_classification` VALUES ('29', '财税外贸类', '101050', '3', '101000');
INSERT INTO `dlnubuy_classification` VALUES ('30', '初级会计职称', '101051', '4', '101050');
INSERT INTO `dlnubuy_classification` VALUES ('31', '会计从业', '101052', '4', '101050');
INSERT INTO `dlnubuy_classification` VALUES ('32', '证券从业', '101053', '4', '101050');
INSERT INTO `dlnubuy_classification` VALUES ('33', '注册会计', '101054', '4', '101050');
INSERT INTO `dlnubuy_classification` VALUES ('34', '银行从业', '101055', '4', '101050');
INSERT INTO `dlnubuy_classification` VALUES ('35', '建筑工程类', '101060', '3', '101000');
INSERT INTO `dlnubuy_classification` VALUES ('36', '国二建造', '101061', '4', '101060');
INSERT INTO `dlnubuy_classification` VALUES ('37', '国一建造', '101062', '4', '101060');
INSERT INTO `dlnubuy_classification` VALUES ('38', '注册电气', '101063', '4', '101060');
INSERT INTO `dlnubuy_classification` VALUES ('39', '注册结构', '101064', '4', '101060');
INSERT INTO `dlnubuy_classification` VALUES ('40', '造价工程', '101065', '4', '101060');
INSERT INTO `dlnubuy_classification` VALUES ('41', '注册安全', '101066', '4', '101060');
INSERT INTO `dlnubuy_classification` VALUES ('42', '注册建筑', '101067', '4', '101060');
INSERT INTO `dlnubuy_classification` VALUES ('43', '教师资格', '101070', '3', '101000');
INSERT INTO `dlnubuy_classification` VALUES ('44', '幼教', '101071', '4', '101070');
INSERT INTO `dlnubuy_classification` VALUES ('45', '司法考试', '101072', '4', '101070');
INSERT INTO `dlnubuy_classification` VALUES ('46', '计算机等级考试', '101080', '3', '101000');
INSERT INTO `dlnubuy_classification` VALUES ('47', '计算机二级', '101081', '4', '101080');
INSERT INTO `dlnubuy_classification` VALUES ('48', '其他', '101082', '4', '101080');
INSERT INTO `dlnubuy_classification` VALUES ('49', '小说类', '102010', '3', '102000');
INSERT INTO `dlnubuy_classification` VALUES ('50', '历史小说', '102011', '4', '102010');
INSERT INTO `dlnubuy_classification` VALUES ('51', '社会小说', '102012', '4', '102010');
INSERT INTO `dlnubuy_classification` VALUES ('52', '官场小说', '102013', '4', '102010');
INSERT INTO `dlnubuy_classification` VALUES ('53', '都市小说', '102014', '4', '102010');
INSERT INTO `dlnubuy_classification` VALUES ('54', '侦探/悬疑/推理', '102015', '4', '102010');
INSERT INTO `dlnubuy_classification` VALUES ('55', '中国当代小说', '102016', '4', '102010');
INSERT INTO `dlnubuy_classification` VALUES ('56', '中国近代小说', '102017', '4', '102010');
INSERT INTO `dlnubuy_classification` VALUES ('57', '作品集', '102018', '4', '102010');
INSERT INTO `dlnubuy_classification` VALUES ('58', '文学类', '102020', '3', '102000');
INSERT INTO `dlnubuy_classification` VALUES ('59', '名家作品', '102021', '4', '102020');
INSERT INTO `dlnubuy_classification` VALUES ('60', '当代随笔', '102022', '4', '102020');
INSERT INTO `dlnubuy_classification` VALUES ('61', '古诗词', '102023', '4', '102020');
INSERT INTO `dlnubuy_classification` VALUES ('62', '纪实文学', '102024', '4', '102020');
INSERT INTO `dlnubuy_classification` VALUES ('63', '当代诗歌', '102025', '4', '102020');
INSERT INTO `dlnubuy_classification` VALUES ('64', '文集', '102026', '4', '102020');
INSERT INTO `dlnubuy_classification` VALUES ('65', '传记类', '102030', '3', '102000');
INSERT INTO `dlnubuy_classification` VALUES ('66', '财经人物', '102031', '4', '102030');
INSERT INTO `dlnubuy_classification` VALUES ('67', '领袖首脑', '102032', '4', '102030');
INSERT INTO `dlnubuy_classification` VALUES ('68', '军事人物', '102033', '4', '102030');
INSERT INTO `dlnubuy_classification` VALUES ('69', '政治人物', '102034', '4', '102030');
INSERT INTO `dlnubuy_classification` VALUES ('70', '历史人物', '102035', '4', '102030');
INSERT INTO `dlnubuy_classification` VALUES ('71', '历代帝王', '102036', '4', '102030');
INSERT INTO `dlnubuy_classification` VALUES ('72', '艺术类', '102040', '3', '102000');
INSERT INTO `dlnubuy_classification` VALUES ('73', '绘画', '102041', '4', '102040');
INSERT INTO `dlnubuy_classification` VALUES ('74', '摄影', '102042', '4', '102040');
INSERT INTO `dlnubuy_classification` VALUES ('75', '书法/纂刻', '102043', '4', '102040');
INSERT INTO `dlnubuy_classification` VALUES ('76', '音乐', '102044', '4', '102040');
INSERT INTO `dlnubuy_classification` VALUES ('77', '设计', '102045', '4', '102040');
INSERT INTO `dlnubuy_classification` VALUES ('78', '收藏', '102046', '4', '102040');
INSERT INTO `dlnubuy_classification` VALUES ('79', '艺术理论', '102047', '4', '102040');
INSERT INTO `dlnubuy_classification` VALUES ('80', '青春文学', '102050', '3', '102000');
INSERT INTO `dlnubuy_classification` VALUES ('81', '校园', '102051', '4', '102050');
INSERT INTO `dlnubuy_classification` VALUES ('82', '爱情/感情', '102052', '4', '102050');
INSERT INTO `dlnubuy_classification` VALUES ('83', '玄幻/新武侠', '102053', '4', '102050');
INSERT INTO `dlnubuy_classification` VALUES ('84', '漫画/动漫', '102060', '3', '102000');
INSERT INTO `dlnubuy_classification` VALUES ('85', '大陆漫画', '102061', '4', '102060');
INSERT INTO `dlnubuy_classification` VALUES ('86', '日韩漫画', '102062', '4', '102060');
INSERT INTO `dlnubuy_classification` VALUES ('87', '成功/励志', '102070', '3', '102000');
INSERT INTO `dlnubuy_classification` VALUES ('88', '人在职场', '102071', '4', '102070');
INSERT INTO `dlnubuy_classification` VALUES ('89', '成功激励', '102072', '4', '102070');
INSERT INTO `dlnubuy_classification` VALUES ('90', '心灵修养', '102073', '4', '102070');
INSERT INTO `dlnubuy_classification` VALUES ('91', '青少年励志', '102074', '4', '102070');
INSERT INTO `dlnubuy_classification` VALUES ('92', '人生哲学', '102075', '4', '102070');
INSERT INTO `dlnubuy_classification` VALUES ('93', '人际交往', '102076', '4', '102070');
INSERT INTO `dlnubuy_classification` VALUES ('94', '管理类', '102080', '3', '102000');
INSERT INTO `dlnubuy_classification` VALUES ('95', '市场/营销', '102081', '4', '102000');
INSERT INTO `dlnubuy_classification` VALUES ('96', '会计', '102082', '4', '102080');
INSERT INTO `dlnubuy_classification` VALUES ('97', '证券/投资', '102083', '4', '102080');
INSERT INTO `dlnubuy_classification` VALUES ('98', '建筑', '102090', '3', '102000');
INSERT INTO `dlnubuy_classification` VALUES ('99', '建筑史与文化', '102091', '4', '102090');
INSERT INTO `dlnubuy_classification` VALUES ('100', '建筑科学', '102092', '4', '102090');
INSERT INTO `dlnubuy_classification` VALUES ('101', '建筑外观设计', '102093', '4', '102090');
INSERT INTO `dlnubuy_classification` VALUES ('102', '室内设计', '102094', '4', '102090');
INSERT INTO `dlnubuy_classification` VALUES ('103', '计算机/网络', '102100', '3', '102000');
INSERT INTO `dlnubuy_classification` VALUES ('104', '程序设计', '102101', '4', '102100');
INSERT INTO `dlnubuy_classification` VALUES ('105', '数据库', '102102', '4', '102100');
INSERT INTO `dlnubuy_classification` VALUES ('106', '软件工程', '102103', '4', '102100');
INSERT INTO `dlnubuy_classification` VALUES ('107', '办公用书', '102104', '4', '102100');
INSERT INTO `dlnubuy_classification` VALUES ('108', '图形图像/多媒体', '102105', '4', '102100');
INSERT INTO `dlnubuy_classification` VALUES ('109', '工业技术', '102110', '3', '102000');
INSERT INTO `dlnubuy_classification` VALUES ('110', '电子通信', '102111', '4', '102110');
INSERT INTO `dlnubuy_classification` VALUES ('111', '电子技术', '102112', '4', '102110');
INSERT INTO `dlnubuy_classification` VALUES ('112', '机械仪表', '102113', '4', '102110');
INSERT INTO `dlnubuy_classification` VALUES ('113', '家具日用', '201000', '2', '200000');
INSERT INTO `dlnubuy_classification` VALUES ('114', '整理收纳', '201010', '3', '201000');
INSERT INTO `dlnubuy_classification` VALUES ('115', '整理箱收纳盒', '201011', '4', '201010');
INSERT INTO `dlnubuy_classification` VALUES ('116', '压缩袋防尘罩', '201012', '4', '201010');
INSERT INTO `dlnubuy_classification` VALUES ('117', '衣架烫衣板', '201013', '4', '201010');
INSERT INTO `dlnubuy_classification` VALUES ('118', '置物架', '201014', '4', '201010');
INSERT INTO `dlnubuy_classification` VALUES ('119', '缝纫用品', '201015', '4', '201010');
INSERT INTO `dlnubuy_classification` VALUES ('120', '清洁护理', '201020', '3', '201000');
INSERT INTO `dlnubuy_classification` VALUES ('121', '清洁工具', '201021', '4', '201020');
INSERT INTO `dlnubuy_classification` VALUES ('122', '暖宝宝', '201022', '4', '201020');
INSERT INTO `dlnubuy_classification` VALUES ('123', '收纳', '201023', '4', '201020');
INSERT INTO `dlnubuy_classification` VALUES ('124', '家具', '201030', '3', '201000');
INSERT INTO `dlnubuy_classification` VALUES ('125', '书柜衣架', '201031', '4', '201030');
INSERT INTO `dlnubuy_classification` VALUES ('126', '休息沙发', '201032', '4', '201030');
INSERT INTO `dlnubuy_classification` VALUES ('127', '椅子凳子', '201033', '4', '201030');
INSERT INTO `dlnubuy_classification` VALUES ('128', '猫', '301000', '2', '300000');
INSERT INTO `dlnubuy_classification` VALUES ('129', '狗', '302000', '2', '300000');
INSERT INTO `dlnubuy_classification` VALUES ('130', '其他', '303000', '2', '300000');
INSERT INTO `dlnubuy_classification` VALUES ('131', '小猫', '301010', '3', '301000');
INSERT INTO `dlnubuy_classification` VALUES ('132', '大猫', '301020', '3', '301000');
INSERT INTO `dlnubuy_classification` VALUES ('133', '公猫', '301011', '4', '301010');
INSERT INTO `dlnubuy_classification` VALUES ('134', '母猫', '301012', '4', '301010');
INSERT INTO `dlnubuy_classification` VALUES ('135', '公猫', '301021', '4', '301020');
INSERT INTO `dlnubuy_classification` VALUES ('136', '母猫', '301022', '4', '301020');
INSERT INTO `dlnubuy_classification` VALUES ('137', '大狗', '302010', '3', '302000');
INSERT INTO `dlnubuy_classification` VALUES ('138', '公狗', '302011', '4', '302010');
INSERT INTO `dlnubuy_classification` VALUES ('139', '母狗', '302012', '4', '302010');
INSERT INTO `dlnubuy_classification` VALUES ('140', '小狗', '302020', '3', '302020');
INSERT INTO `dlnubuy_classification` VALUES ('141', '公狗', '302021', '4', '302020');
INSERT INTO `dlnubuy_classification` VALUES ('142', '母狗', '302022', '4', '302020');
INSERT INTO `dlnubuy_classification` VALUES ('143', '兔子', '303010', '3', '303000');
INSERT INTO `dlnubuy_classification` VALUES ('144', '蜥蜴', '303020', '3', '303000');
INSERT INTO `dlnubuy_classification` VALUES ('145', '小兔子', '303011', '4', '303010');
INSERT INTO `dlnubuy_classification` VALUES ('146', '不能吃', '303021', '4', '303020');
INSERT INTO `dlnubuy_classification` VALUES ('147', '户外装备', '401000', '2', '400000');
INSERT INTO `dlnubuy_classification` VALUES ('148', '帐篷', '401010', '3', '401000');
INSERT INTO `dlnubuy_classification` VALUES ('149', '双人帐篷', '401011', '4', '401010');
INSERT INTO `dlnubuy_classification` VALUES ('150', '多人帐篷', '401012', '4', '401010');
INSERT INTO `dlnubuy_classification` VALUES ('151', '球类', '402000', '2', '400000');
INSERT INTO `dlnubuy_classification` VALUES ('152', '室内', '402010', '3', '402000');
INSERT INTO `dlnubuy_classification` VALUES ('153', '篮球', '402011', '4', '402010');
INSERT INTO `dlnubuy_classification` VALUES ('154', '足球', '402012', '4', '402010');
INSERT INTO `dlnubuy_classification` VALUES ('156', '排球', '402013', '4', '402010');
INSERT INTO `dlnubuy_classification` VALUES ('157', '乒乓球', '402014', '4', '402010');
INSERT INTO `dlnubuy_classification` VALUES ('158', '羽毛球', '402015', '4', '402010');
INSERT INTO `dlnubuy_classification` VALUES ('159', '自行车', '403000', '2', '400000');
INSERT INTO `dlnubuy_classification` VALUES ('160', '山地', '403010', '3', '403000');
INSERT INTO `dlnubuy_classification` VALUES ('161', '山地', '403011', '4', '403010');
INSERT INTO `dlnubuy_classification` VALUES ('162', '公路', '403020', '3', '403000');
INSERT INTO `dlnubuy_classification` VALUES ('163', '公路', '403021', '4', '403020');
INSERT INTO `dlnubuy_classification` VALUES ('164', '手工艺', '501000', '2', '500000');
INSERT INTO `dlnubuy_classification` VALUES ('165', '陶艺', '501010', '3', '501000');
INSERT INTO `dlnubuy_classification` VALUES ('166', '陶艺', '501011', '4', '501010');
INSERT INTO `dlnubuy_classification` VALUES ('167', '笔墨', '501020', '3', '501000');
INSERT INTO `dlnubuy_classification` VALUES ('168', '绘画', '501021', '4', '501020');
INSERT INTO `dlnubuy_classification` VALUES ('169', '书法', '501022', '4', '501020');

-- ----------------------------
-- Table structure for dlnubuy_product
-- ----------------------------
DROP TABLE IF EXISTS `dlnubuy_product`;
CREATE TABLE `dlnubuy_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pdname` varchar(200) NOT NULL,
  `money` int(11) NOT NULL,
  `begintime` datetime NOT NULL,
  `description` longtext NOT NULL,
  `requirement` longtext NOT NULL,
  `category` int(11) NOT NULL,
  `pdimg` varchar(100) NOT NULL,
  `pdimg2` varchar(100) NOT NULL,
  `pdimg3` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dlnubuy_product
-- ----------------------------

-- ----------------------------
-- Table structure for dlnubuy_users
-- ----------------------------
DROP TABLE IF EXISTS `dlnubuy_users`;
CREATE TABLE `dlnubuy_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `userphone` varchar(50) NOT NULL,
  `registration_date` datetime NOT NULL,
  `schoolAddress` varchar(200) NOT NULL,
  `userimg` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dlnubuy_users
-- ----------------------------
