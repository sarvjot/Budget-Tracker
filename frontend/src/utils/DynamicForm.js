import { Fragment, useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';

function DynamicForm() {
    let emptyObject = {
        username: '',
        key: '',
        is_member: 'false'
    };

    const {postTransactions} = useContext(AuthContext)
    const [formValues, setFormValues] = useState([{...emptyObject}])
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState("");

    const addValue = (e) => {
        e.preventDefault();
        setFormValues([...formValues, {...emptyObject}])
    }

    const removeValue = (index) => {
        let data = [...formValues];
        data.splice(index, 1)
        setFormValues(data)
    }

    const handleFormChange = (event, index) => {
        let data = [...formValues];
        data[index][event.target.name] = event.target.value;
        setFormValues(data);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let transaction = {
            amount: parseInt(amount),
            category, 
            friends: formValues
        }

        await postTransactions(transaction);

        setFormValues([{...emptyObject}]);
        setAmount(0);
        setCategory("");
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {
                    formValues.map((value, index) => {
                        return (
                            <Fragment key={index}>
                                <input
                                    name='username'
                                    placeholder='Userame'
                                    onChange={event => handleFormChange(event, index)}
                                    value={value.username}
                                    required
                                />
                                <input
                                    name='key' 
                                    placeholder='Friendship Key' 
                                    onChange={event => handleFormChange(event, index)}
                                    value={value.key}
                                    required
                                />
                                <label htmlFor={`${index}_yes`}>Is Member</label>
                                <select 
                                    name="is_member" 
                                    id={`${index}_yes`} 
                                    onChange={event => handleFormChange(event, index)}
                                    value={value.is_member}
                                >
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                                <button onClick={() => removeValue(index)}>Remove</button>
                            </Fragment>
                        )
                    })
                }
                <label htmlFor="amount">Amount</label> 
                <input id="amount" type="text" value={amount} onChange={(e) => {setAmount(e.target.value)}} />
                <input type="text" placeholder="Category" value={category} onChange={(e) => {setCategory(e.target.value)}} />
                <button type="button" onClick={addValue}>Add More</button>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default DynamicForm;
