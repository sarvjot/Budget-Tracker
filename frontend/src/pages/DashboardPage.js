import React, {useContext, useState, useEffect} from "react";
import AuthContext from '../context/AuthContext'

const DashboardPage = () => {
  let {authTokens} = useContext(AuthContext)
  let [transactions, setTransactions] = useState([])

  useEffect(() => {
    getTransactions()
  }, [])

  let getTransactions = async () => {
      let response = await fetch('http://127.0.0.1:8000/api/transactions/', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + String(authTokens.access),
          }
      })

      let trans = await response.json()
      setTransactions(trans)
  }

  let getTotalSpent = () => {
    let totalSpent = 0
    transactions.forEach((transaction) => {
        let eff_amount = transaction.amount / transaction.count_splitters; 
        totalSpent += parseFloat(eff_amount)
    })
    return totalSpent.toFixed(1);
  }
  
  return (
    <div>
      Hi!! {authTokens.username}
    FriendshipKey - {authTokens.key}
      {
        transactions.map((transaction) => {
          let eff_amount = transaction.amount / transaction.count_splitters; 
          eff_amount = eff_amount.toFixed(1)
          return <div key={transaction.id}>{transaction.category} - {eff_amount}</div>
        })
      }
      {
        <div>Total Spent - {getTotalSpent()}</div>
      }
    </div>
  )
}

export default DashboardPage;
