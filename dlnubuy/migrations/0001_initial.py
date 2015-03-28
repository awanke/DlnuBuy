# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Buy',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True)),
                ('pdid', models.IntegerField()),
                ('buytime', models.DateTimeField(default=datetime.datetime(2015, 3, 24, 9, 34, 21, 115000, tzinfo=utc))),
                ('transaction_status', models.CharField(default=0, max_length=10)),
                ('buyid', models.IntegerField()),
                ('esllid', models.IntegerField()),
                ('buymoney', models.IntegerField()),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Classification',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True)),
                ('CFname', models.CharField(max_length=300)),
                ('CFnumber', models.IntegerField()),
                ('level', models.IntegerField()),
                ('parent', models.IntegerField()),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True)),
                ('pdname', models.CharField(max_length=200)),
                ('money', models.IntegerField(max_length=100)),
                ('begintime', models.DateTimeField(default=datetime.datetime(2015, 3, 24, 9, 34, 21, 113000, tzinfo=utc))),
                ('description', models.TextField()),
                ('requirement', models.TextField()),
                ('category', models.IntegerField()),
                ('pdimg', models.ImageField(upload_to=b'')),
                ('pdimg2', models.ImageField(upload_to=b'')),
                ('pdimg3', models.ImageField(upload_to=b'')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Users',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True)),
                ('username', models.CharField(max_length=50)),
                ('password', models.CharField(max_length=100)),
                ('userphone', models.CharField(max_length=50)),
                ('registration_date', models.DateTimeField(default=datetime.datetime(2015, 3, 24, 9, 34, 21, 111000, tzinfo=utc))),
                ('schoolAddress', models.CharField(default=b'\xe9\x87\x91\xe7\x9f\xb3\xe6\xbb\xa9\xe6\xa0\xa1\xe5\x8c\xba', max_length=200)),
                ('userimg', models.ImageField(default=b'static/images/users/user.jpg', upload_to=b'')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
