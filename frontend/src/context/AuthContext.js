import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()
export default AuthContext

export const AuthProvider = ({children}) => {
    let authTokenInitializer = () => {
      let val = localStorage.getItem('authTokens'); 

      return val ? JSON.parse(val) : null
    }

    let [authTokens, setAuthTokens] = useState(authTokenInitializer)
    let [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    let updateUserData = async (data) => {
        let response = await fetch('http://127.0.0.1:8000/api/get-user-data/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(data.access),
            } 
        })

        let userData = await response.json()
        data = {...data, ...userData}

        setAuthTokens(data)
        localStorage.setItem('authTokens', JSON.stringify(data))
        navigate('/')
    }

    let registerUser = async (e) => {
        e.preventDefault()

        let response = await fetch('http://127.0.0.1:8000/api/register/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
        })

        if(response.status >= 200 && response.status < 300){
            let data = await response.json()

            updateUserData(data)
        }else{
            alert('Something went wrong!')
        }
    }

    let loginUser = async (e) => {
        e.preventDefault()

        let response = await fetch('http://127.0.0.1:8000/api/token/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
        })

        if(response.status === 200){
            let data = await response.json()

            updateUserData(data)
        }else{
            alert('Something went wrong!')
        }
    }


    let logoutUser = () => {
        setAuthTokens(null)
        localStorage.removeItem('authTokens')
        navigate('/')
    }

    let postTransactions = async (transaction) => {
        await fetch('http://127.0.0.1:8000/api/transactions/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access),
            }, 
            body: JSON.stringify(transaction)
        })
    }

    let updateToken = async ()=> {

        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':authTokens?.refresh})
        })

        let data = await response.json()
        
        if (response.status === 200){
            setAuthTokens((x) => {return {...x, ...data}})
            localStorage.setItem('authTokens', JSON.stringify({...authTokens, ...data}))
        }else{
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }
    }

    useEffect(()=> {

        if(loading){
            updateToken()
        }

        let nineMinutes = 1000 * 60 * 9

        let interval =  setInterval(()=> {
            if(authTokens){
                updateToken()
            }
        }, nineMinutes)

        return ()=> clearInterval(interval)

    }, [authTokens, loading])

    let contextData = {
        authTokens,
        loginUser,
        registerUser,
        logoutUser,
        postTransactions
    }

    return(
        <AuthContext.Provider value={contextData} >
            { loading ? null : children }         
        </AuthContext.Provider>
    )
}
