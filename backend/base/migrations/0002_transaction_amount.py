# Generated by Django 4.1.5 on 2023-01-04 11:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='transaction',
            name='amount',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
