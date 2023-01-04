let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcyODY4MjcxLCJpYXQiOjE2NzI4NjQ2NzEsImp0aSI6IjZjNzZhZWMxYzhlZDRlMTU4MDYzYTQ2MTUwOWM0MDUzIiwidXNlcl9pZCI6MX0.WFMOkuO2lTkgVdfb2ACsvlzimcr8J9H6z-lTSPENhjs"

let post = async () => {
	let response = await fetch('http://127.0.0.1:8000/api/transactions/new', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + String(token),
		}, 
		body: JSON.stringify({
			friends: [
				{
					'username': 'kabir_devta',
					'key': 'hamari_dosti_amar_rahe',
					'is_member': true
				},
				{
					'username': 'nakli_devta',
					'key': 'dosti_na_rahe_amar_mera_kya',
					'is_member': true
				},
				{
					'username': 'sarvjot',
					'key': 'reh_le_amar_bhai_mera_peecha_chor',
					'is_member': true
				},
				{
					'username': 'bruh',
					'key': 'bruh_bruh',
					'is_member': false 
				}
			],
			category: "naya_bakchodi",
			amount: 150,
		})
	})
}

let get = async () => {
	let response = await fetch('http://127.0.0.1:8000/api/transactions/', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + String(token),
		}
	})

	let transactions = await response.json()
	console.log(transactions)
}

let register = async () => {

	let response = await fetch('http://127.0.0.1:8000/api/register/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		}, 
		body: JSON.stringify({
			"username": "temp",
			"password": "temp"
		})

	})

	let res = await response.json()
	console.log(res)
}

let obtainToken = async () => {
	let response = await fetch('http://127.0.0.1:8000/api/token/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		}, 
		body: JSON.stringify({
			"username": "sarvjot",
			"password": "password"
		})

	})

	let res = await response.json()
	console.log(res)
}

let refreshToken = async () => {
	let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		}, 
		body: JSON.stringify({
			"refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY3NTQzMTYxMSwiaWF0IjoxNjcyODM5NjExLCJqdGkiOiJkMzM4ZTc1MzNlYmM0OWE2OTA3NzU3MmFkMzRmZDViOCIsInVzZXJfaWQiOjF9.kOE9fSsssEVv4HgUeK7IvG05BB2aRPtLnX434HyofvY"
		})

	})

	let res = await response.json()
	console.log(res)
}

refreshToken()
