# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('dlnubuy', '0002_auto_20150331_1433'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='likes',
            field=models.IntegerField(default=0, max_length=999),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='buy',
            name='buytime',
            field=models.DateTimeField(default=datetime.datetime(2015, 4, 5, 1, 48, 46, 730000, tzinfo=utc)),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='product',
            name='begintime',
            field=models.DateTimeField(default=datetime.datetime(2015, 4, 5, 1, 48, 46, 729000, tzinfo=utc)),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='product',
            name='pdimg',
            field=models.ImageField(default=b'static/images/warp/000001.jpg', upload_to=b''),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='product',
            name='pdimg2',
            field=models.ImageField(default=b'static/images/warp/000001.jpg', upload_to=b''),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='product',
            name='pdimg3',
            field=models.ImageField(default=b'static/images/warp/000001.jpg', upload_to=b''),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='users',
            name='registration_date',
            field=models.DateTimeField(default=datetime.datetime(2015, 4, 5, 1, 48, 46, 728000, tzinfo=utc)),
            preserve_default=True,
        ),
    ]
