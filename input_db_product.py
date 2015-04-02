#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Date    : 2015-04-02 10:35:37
# @Author  : jonnyF (fuhuixiang@jonnyf.com)
# @Link    : http://jonnyf.com


from sqlalchemy import Column, String, create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from dlnubuy import models


# 初始化数据库连接:
engine = create_engine('mysql+mysqlconnector://root:1991115fhx@localhost:3306/dlnubuy')

# 创建DBSession类型:
DBSession = sessionmaker(bind=engine)

# 创建session对象:
session = DBSession()

# user = session.query(models.Users).all()

# for i in user:
#     print i.username
