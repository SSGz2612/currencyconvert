import { useState, useEffect } from 'react';
import './App.css';
import Currency from './Components/Currency';
import axios from 'axios';

function App() {
  const [ val1, setVal1 ] = useState( 1 );
  const [ val2, setVal2 ] = useState( 1 );

  const [ coin1, setCoin1 ] = useState('EUR');
  const [ coin2, setCoin2 ] = useState('USD');

  /*Ukranian*/
  const [ ukr, setUkr ] = useState();

  const [ totalCoins, setTotalCoins ] = useState([]);
  
  useEffect(() => {
    axios.get( 'https://api.apilayer.com/fixer/latest?apikey=iUh3I3pLdboaqjOkr386wDz438E8UxoT').then(
    response => {
      setTotalCoins( response.data.rates );
      setUkr( response.data.rates.UAH );
    })}, []
  );

  useEffect( () => {
    if( !totalCoins ) {
      handleVal1Change( 1 );
    }
  }, []);

  function fix( n ) { return n.toFixed( 2 )};
  
  // for take the API change totalRates to totalCoins
  function handleVal1Change( val1 ) {
    setVal2( fix( val1 * totalCoins[ coin2 ] / totalCoins[ coin1 ]));
    setVal1( val1 );
  }
  function handleVal2Change( val2 ) {
    setVal1( fix( val2 * totalCoins[ coin1 ] / totalCoins[ coin2 ]));
    setVal2( val2 );
  }

  function handleCoin1Change( coin1 ) {
    setVal2( fix( val1 * totalCoins[ coin2 ] / totalCoins[ coin1 ]));
    setCoin1( coin1 );
  }
  function handleCoin2Change( coin2 ) {
    setVal1( fix( val2 * totalCoins[ coin1 ] / totalCoins[ coin2 ]));
    setCoin2( coin2 );
  }

  return (
    <div className='head'>
      <nav className='nav'></nav>

      <header className='header'>
        <div className='header_a'>Currency Converter</div>
        <div className='header_b'>
          1 EUR
          <div className='header_eu'></div>
          = { fix( ukr / totalCoins.EUR )} UAH
          <div className='header_uk'></div>
        </div>

        <div className='header_c'>
          1 USD
          <div className='header_us'></div>
          = { fix( ukr / totalCoins.USD )} UAH
          <div className='header_uk'></div>
        </div>
      </header>

      <section className='section'>
        <Currency
          onValChange={ handleVal1Change }
          onCoinsChange={ handleCoin1Change }
          val={ val1 } 
          coins={ coin1 }
          totalCoins={ Object.keys( totalCoins )}
          flag={ coin1 }
        />
        <Currency
          onValChange={ handleVal2Change }
          onCoinsChange={ handleCoin2Change }
          val={ val2 }
          coins={ coin2 }
          totalCoins={ Object.keys( totalCoins )}
          flag={ coin2 }
        />
      </section>
    </div>
  )
}

export default App;