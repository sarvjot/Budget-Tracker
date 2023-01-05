# Budget-Tracker

## Installation

```
git clone https://github.com/sarvjot/Budget-Tracker.git 
cd Budget-Tracker
```

### Backend

- make sure you have python and pip installed
- activate the python virtual environment tool of your choice

```
pip install -r requirements.txt
cd backend
python manage.py runserver
```

Backend will be hosted on http://localhost:8000/ by default

You may create a superuser to access django admin panel at: http://localhost:8000/admin

- To create a superuser, use manage.py like so: `python manage.py createsuperuser`
- Or, a superuser has already been created with following credentials: `username: admin | password: adminpassword`


### Frontend (Side-By-Side, In another terminal session)

- make sure you have node and npm installed
```
cd frontend
npm install 
npm start
```

Frontend will be hosted on http://localhost:3000/ by default

