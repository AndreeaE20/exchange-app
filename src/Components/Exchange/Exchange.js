// PASUL 3 - importam css
import './Exchange.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

// PASUL 1
const Exchange = () => {
    const [coins, setCoins] = useState([]);
    const [from, setFrom] = useState({amount:0, currency:''});
    const [to, setTo] = useState({amount:0, currency:''});

    const setFromAmount = (newAmount) => {
        setFrom({amount:newAmount, currency:from.currency});
    }

    const setFromCurrency = (newCurrency) => {
        setFrom({amount:from.amount, currency:newCurrency});
    }
    const setToCurrency = (newCurrency) => {
        setTo({amount:to.amount, currency:newCurrency});
    }

    const exchange = () => {
        axios.get(`https://api.exchangerate.host/convert?from=${from.currency}&to=${to.currency}&amount=${from.amount}`).then(res => setTo({amount:res.data.result, currency: to.currency }))
    }


    useEffect(() =>{
        axios.get('https://api.exchangerate.host/symbols').then(res =>{
            let coinsArray = [];
            Object.values(res.data.symbols).forEach(symbol => {
                coinsArray.push(symbol.code);
            });
            setCoins(coinsArray);
        })
    }, [])


    return (
        <div className='exchange-container'>
            <div className='input-container'>
                <label> Input the money here ->  </label>
                <input type='number' placeholder='Amount...' value={from.amount} onChange={(e) => setFromAmount(e.target.value)} />
                <select onChange={(e) => setFromCurrency(e.target.value)}>
                {coins.map((coin, key) => (
                        <option key={key} value={coin}>{coin}</option>
                    ))}
                </select>
            </div>
            <div className='input-container'>
                <label>&nbsp; Cashout money here  &lt;-  </label>
                <input type='text' disabled value={to.amount} />
                <select onChange={(e) => setToCurrency(e.target.value)}>
                    {coins.map((coin, key) => (
                        <option key={key} value={coin}>{coin}</option>
                    ))}
                </select>
            </div>
            <button onClick={() => exchange()}>Exchange</button>
        </div>
    )
}

// PASUL 2
export default Exchange;