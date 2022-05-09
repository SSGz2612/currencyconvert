import '../Currency.css';

function Currency( props ) {
    return (
        <div className="currency">
            <input
                className="input"
                type="text"
                value={ props.val }
                onChange={ e => props.onValChange( e.target.value )}
            />
            <div className='country'><div className={`countryfl ${ props.flag }`}></div></div>

            <select
                className="select"
                value={ props.coins }
                onChange={ e => props.onCoinsChange( e.target.value )}
            >{
                props.totalCoins.map(( e, index ) => (
                    <option key={ index } value={ e }>{ e }</option>
                ))
            }</select>
        </div>
    )
}

export default Currency;