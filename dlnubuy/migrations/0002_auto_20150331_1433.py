# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('dlnubuy', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='userid',
            field=models.IntegerField(default=1, max_length=100),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='buy',
            name='buytime',
            field=models.DateTimeField(default=datetime.datetime(2015, 3, 31, 6, 33, 17, 271000, tzinfo=utc)),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='product',
            name='begintime',
            field=models.DateTimeField(default=datetime.datetime(2015, 3, 31, 6, 33, 17, 270000, tzinfo=utc)),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='users',
            name='registration_date',
            field=models.DateTimeField(default=datetime.datetime(2015, 3, 31, 6, 33, 17, 269000, tzinfo=utc)),
            preserve_default=True,
        ),
    ]
